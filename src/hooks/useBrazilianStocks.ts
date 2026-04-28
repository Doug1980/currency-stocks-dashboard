"use client";

import { useState, useEffect, useMemo } from "react";
import type { StockQuote, CategoryId } from "@/types";

type RealCategoryId = Exclude<CategoryId, "topmovers">;

interface UseBrazilianStocksResult {
  quotes: StockQuote[];
  byCategory: Record<RealCategoryId, StockQuote[]>;
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

const POLLING_INTERVAL = 90_000;

const EMPTY_BY_CATEGORY: Record<RealCategoryId, StockQuote[]> = {
  crypto: [],
  tech: [],
  financial: [],
  consumer: [],
  health: [],
};

export function useBrazilianStocks(): UseBrazilianStocksResult {
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
        const response = await fetch("/api/stocks-br", {
          signal: controller.signal,
        });

        const data = (await response.json()) as ApiResponse | ApiError;

        if (!response.ok) {
          const errorMessage =
            "error" in data ? data.error : "Erro ao buscar cotações";
          throw new Error(errorMessage);
        }

        if ("quotes" in data) {
          const validQuotes = data.quotes.filter(
            (q): q is StockQuote =>
              !q.error &&
              typeof q.current === "number" &&
              typeof q.change === "number" &&
              typeof q.percentChange === "number" &&
              typeof q.high === "number" &&
              typeof q.low === "number" &&
              typeof q.open === "number"
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

  const byCategory = useMemo(() => {
    if (quotes.length === 0) return EMPTY_BY_CATEGORY;

    const grouped: Record<RealCategoryId, StockQuote[]> = {
      crypto: [],
      tech: [],
      financial: [],
      consumer: [],
      health: [],
    };

    for (const quote of quotes) {
      if (quote.category !== "topmovers") {
        grouped[quote.category]?.push(quote);
      }
    }

    return grouped;
  }, [quotes]);

  const topMovers = useMemo(() => {
    return [...quotes]
      .filter((q) => q.percentChange > 0)
      .sort((a, b) => b.percentChange - a.percentChange)
      .slice(0, 12);
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