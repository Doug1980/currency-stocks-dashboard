import { NextRequest, NextResponse } from "next/server";
import { fetchStockQuote, fetchCompanyLogo } from "@/lib/api/finnhub";
import {
  STOCKS,
  getStockBySymbol,
  getStocksByCategory,
} from "@/lib/stocks";
import type { CategoryId, StockQuote } from "@/types";

/**
 * Route Handler para cotações de ativos.
 *
 * Funciona como BFF (Backend for Frontend):
 * - Esconde a API key do Finnhub
 * - Cacheia respostas (120s)
 * - Combina /quote + /stock/profile2 em paralelo (logo + dados)
 * - Suporta múltiplos modos:
 *   1. Por símbolo: ?symbol=AAPL
 *   2. Por categoria: ?category=crypto
 *   3. Todos os ativos: sem parâmetros
 *
 * @example GET /api/stocks?symbol=AAPL         → 1 ativo com logo
 * @example GET /api/stocks?category=tech       → ativos da categoria
 * @example GET /api/stocks                     → todos os 60 ativos
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol")?.toUpperCase();
  const category = searchParams.get("category")?.toLowerCase() as
    | CategoryId
    | undefined;

  try {
    // Modo 1: ativo específico por símbolo
    if (symbol) {
      const stock = getStockBySymbol(symbol);
      if (!stock) {
        return NextResponse.json(
          { error: `Símbolo não suportado: ${symbol}` },
          { status: 400 }
        );
      }

      // Fetch paralelo: cotação + logo da empresa (se não tiver hardcoded)
      const [quote, logo] = await Promise.all([
        fetchStockQuote(stock.apiSymbol, stock.symbol),
        // Se já temos URL hardcoded (cripto), pula request da Finnhub
        stock.logoUrl
          ? Promise.resolve(stock.logoUrl)
          : fetchCompanyLogo(stock.apiSymbol),
      ]);

      return NextResponse.json(
        {
          ...quote,
          name: stock.name,
          category: stock.category,
          logoUrl: logo ?? undefined,
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=120, stale-while-revalidate=240",
          },
        }
      );
    }

    // Modo 2 e 3: lista de ativos (categoria ou todos)
    const stocksToFetch = category ? getStocksByCategory(category) : STOCKS;

    if (category && stocksToFetch.length === 0) {
      return NextResponse.json(
        { error: `Categoria não suportada: ${category}` },
        { status: 400 }
      );
    }

    // Fetch paralelo de quotes E logos para todos os ativos.
    // Promise.all dispara TUDO simultaneamente — tempo total = mais lento, não soma.
    const results = await Promise.allSettled(
       stocksToFetch.map(async (stock) => {
        const [quote, logo] = await Promise.all([
          fetchStockQuote(stock.apiSymbol, stock.symbol),
          // Se já temos URL hardcoded (cripto), pula request da Finnhub
          stock.logoUrl
            ? Promise.resolve(stock.logoUrl)
            : fetchCompanyLogo(stock.apiSymbol),
        ]);
        return { quote, logo };
      })
    );

    const quotes = results.map((result, index) => {
      const stock = stocksToFetch[index];

      if (result.status === "fulfilled") {
        const { quote, logo } = result.value;
        return {
          ...quote,
          name: stock.name,
          category: stock.category,
          logoUrl: logo ?? undefined,
        } satisfies StockQuote;
      }

      // Se um ativo falhar, retorna placeholder com erro
      return {
        symbol: stock.symbol,
        name: stock.name,
        category: stock.category,
        error: result.reason?.message ?? "Erro ao buscar cotação",
      };
    });

    return NextResponse.json(
      { quotes },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
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