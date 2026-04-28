import { NextRequest, NextResponse } from "next/server";
import { fetchBrazilianStocks } from "@/lib/api/brapi";
import { STOCKS_BR, getBrStocksByCategory } from "@/lib/stocks-br";
import type { CategoryId, StockQuote } from "@/types";

/**
 * Route Handler para cotações de ações brasileiras (B3).
 *
 * Funciona como BFF (Backend for Frontend):
 * - Esconde o token da brapi
 * - Cacheia respostas (120s)
 * - Suporta filtro por categoria
 *
 * @example GET /api/stocks-br                 → todas as 60 ações BR
 * @example GET /api/stocks-br?category=financial → só bancos
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category")?.toLowerCase() as
    | CategoryId
    | undefined;

  try {
    // Determina lista a buscar (categoria ou todas)
    const stocksToFetch = category
      ? getBrStocksByCategory(category)
      : STOCKS_BR;

    if (category && stocksToFetch.length === 0) {
      return NextResponse.json(
        { error: `Categoria não suportada: ${category}` },
        { status: 400 }
      );
    }

    // Fetch em batch (cliente brapi já gerencia batches de 20)
    const symbols = stocksToFetch.map((s) => s.apiSymbol);
    const brData = await fetchBrazilianStocks(symbols);

    // Cria mapa pra lookup O(1) ao montar quotes
    const dataMap = new Map(brData.map((d) => [d.symbol, d]));

    // Combina lista de stocks (com category) com dados da brapi
    const quotes: Array<StockQuote | { symbol: string; name: string; category: CategoryId; error: string }> =
      stocksToFetch.map((stock) => {
        const data = dataMap.get(stock.symbol);

        if (!data) {
          return {
            symbol: stock.symbol,
            name: stock.name,
            category: stock.category,
            error: "Cotação não disponível",
          };
        }

        return {
          symbol: stock.symbol,
          name: stock.name,
          category: stock.category,
          current: data.current,
          change: data.change,
          percentChange: data.percentChange,
          high: data.high,
          low: data.low,
          open: data.open,
          previousClose: data.previousClose,
          timestamp: data.timestamp,
        } satisfies StockQuote;
      });

    return NextResponse.json(
      { quotes },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=120, stale-while-revalidate=240",
        },
      }
    );
  } catch (error) {
    console.error("[/api/stocks-br] Erro:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao buscar cotações brasileiras",
      },
      { status: 500 }
    );
  }
}