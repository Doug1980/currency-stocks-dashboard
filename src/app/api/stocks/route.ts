import { NextRequest, NextResponse } from "next/server";
import { fetchStockQuote } from "@/lib/api/finnhub";
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
 * - Cacheia respostas (60s)
 * - Suporta múltiplos modos:
 *   1. Por símbolo: ?symbol=AAPL
 *   2. Por categoria: ?category=crypto
 *   3. Todos os ativos: sem parâmetros
 *
 * @example GET /api/stocks?symbol=BTC          → 1 ativo
 * @example GET /api/stocks?category=crypto     → ativos da categoria
 * @example GET /api/stocks                     → todos os 18 ativos
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

      const quote = await fetchStockQuote(stock.apiSymbol, stock.symbol);

      return NextResponse.json(
        { ...quote, name: stock.name, category: stock.category },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
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

    const results = await Promise.allSettled(
      stocksToFetch.map((stock) =>
        fetchStockQuote(stock.apiSymbol, stock.symbol)
      )
    );

    const quotes = results.map((result, index) => {
      const stock = stocksToFetch[index];
      if (result.status === "fulfilled") {
        return {
          ...result.value,
          name: stock.name,
          category: stock.category,
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