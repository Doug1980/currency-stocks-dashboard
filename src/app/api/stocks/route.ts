import { NextRequest, NextResponse } from "next/server";
import { fetchStockQuote, type StockQuoteData } from "@/lib/api/finnhub";
import { STOCKS, getStockBySymbol } from "@/lib/stocks";

/**
 * Route Handler para cotações de ações.
 *
 * Funciona como BFF (Backend for Frontend):
 * - Esconde a API key do Finnhub
 * - Cacheia respostas (60s)
 * - Suporta 2 modos: 1 ação ou todas as 8 ações
 *
 * @example GET /api/stocks?symbol=AAPL  → 1 ação
 * @example GET /api/stocks              → todas as 8 ações
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol")?.toUpperCase();

  try {
    // Modo 1: ação específica
    if (symbol) {
      const stock = getStockBySymbol(symbol);
      if (!stock) {
        return NextResponse.json(
          { error: `Símbolo não suportado: ${symbol}` },
          { status: 400 }
        );
      }

      const quote = await fetchStockQuote(symbol);

      return NextResponse.json(
        { ...quote, name: stock.name },
        {
          headers: {
            "Cache-Control":
              "public, s-maxage=60, stale-while-revalidate=120",
          },
        }
      );
    }

    // Modo 2: todas as ações em paralelo (Promise.all)
    const results = await Promise.allSettled(
      STOCKS.map((stock) => fetchStockQuote(stock.symbol))
    );

    const quotes = results
      .map((result, index) => {
        const stock = STOCKS[index];
        if (result.status === "fulfilled") {
          return { ...result.value, name: stock.name };
        }
        // Se uma ação falhar, retorna null pra essa, não derruba todas
        return {
          symbol: stock.symbol,
          name: stock.name,
          error: result.reason?.message ?? "Erro ao buscar cotação",
        };
      });

    return NextResponse.json(
      { quotes },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("[/api/stocks] Erro:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao buscar cotações",
      },
      { status: 500 }
    );
  }
}