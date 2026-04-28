"use client";

import { useState, useEffect, useMemo } from "react";
import type { StockQuote, CategoryId } from "@/types";

interface UseStockQuoteResult {
  /** Todas as cotações (todas as categorias) */
  quotes: StockQuote[];
  /** Cotações agrupadas por categoria, na ordem definida em CATEGORIES */
  byCategory: Record<CategoryId, StockQuote[]>;
  /** Top 5 ativos com maior variação positiva no dia */
  topMovers: StockQuote[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => void;
}

interface ApiResponse {
  quotes: Array<StockQuote & { error?: string }>;
}

interface ApiError {
  error: string;
}

const POLLING_INTERVAL = 30_000; // 30 segundos

const EMPTY_BY_CATEGORY: Record<CategoryId, StockQuote[]> = {
  crypto: [],
  tech: [],
  financial: [],
  consumer: [],
  health: [],
};

/**
 * Hook que busca cotações de todos os ativos com polling automático.
 *
 * Retorna 3 visões dos mesmos dados:
 * - `quotes`: array linear (todas as cotações)
 * - `byCategory`: dicionário agrupado por categoria
 * - `topMovers`: top 5 com maior variação positiva (Top Movers)
 *
 * Internamente:
 * - Faz fetch inicial ao montar
 * - Polling de 30s
 * - Cancela requests pendentes (AbortController)
 */
export function useStockQuote(): UseStockQuoteResult {
  const [quotes, setQuotes] = useState<StockQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchQuotes() {
      try {
        setError(null);
        const response = await fetch("/api/stocks", {
          signal: controller.signal,
        });

        const data = (await response.json()) as ApiResponse | ApiError;

        if (!response.ok) {
          const errorMessage =
            "error" in data ? data.error : "Erro ao buscar cotações";
          throw new Error(errorMessage);
        }

        if ("quotes" in data) {
          // Filtra apenas cotações válidas (sem erro individual)
          const validQuotes = data.quotes.filter(
            (q): q is StockQuote =>
              !q.error && typeof q.current === "number"
          );
          setQuotes(validQuotes);
          setLastUpdated(new Date());
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    }

    fetchQuotes();
    const interval = setInterval(fetchQuotes, POLLING_INTERVAL);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [refreshKey]);

  // Memoização: agrupa por categoria apenas quando quotes mudar
  const byCategory = useMemo(() => {
    if (quotes.length === 0) return EMPTY_BY_CATEGORY;

    const grouped: Record<CategoryId, StockQuote[]> = {
      crypto: [],
      tech: [],
      financial: [],
      consumer: [],
      health: [],
    };

    for (const quote of quotes) {
      grouped[quote.category]?.push(quote);
    }

    return grouped;
  }, [quotes]);

  // Top Movers: 5 ativos com maior variação positiva
  const topMovers = useMemo(() => {
    return [...quotes]
      .filter((q) => q.percentChange > 0)
      .sort((a, b) => b.percentChange - a.percentChange)
      .slice(0, 5);
  }, [quotes]);

  function refresh() {
    setRefreshKey((prev) => prev + 1);
  }

  return {
    quotes,
    byCategory,
    topMovers,
    loading,
    error,
    lastUpdated,
    refresh,
  };
}