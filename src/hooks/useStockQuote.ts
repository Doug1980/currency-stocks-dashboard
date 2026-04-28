import { useState, useEffect } from "react";
import type { StockQuote } from "@/types";

interface UseStockQuoteResult {
  quotes: StockQuote[];
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

/**
 * Hook que busca cotações de todas as 8 ações com polling automático.
 *
 * - Faz fetch inicial ao montar
 * - Atualiza automaticamente a cada 30 segundos
 * - Cancela requests pendentes ao desmontar (AbortController)
 * - Expõe função `refresh` pra atualização manual
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
          // Filtra ações que não falharam individualmente
          const validQuotes = data.quotes.filter(
            (q): q is StockQuote => !q.error && typeof q.current === "number"
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

    // Fetch inicial
    fetchQuotes();

    // Polling: refaz a cada 30s
    const interval = setInterval(fetchQuotes, POLLING_INTERVAL);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [refreshKey]);

  function refresh() {
    setRefreshKey((prev) => prev + 1);
  }

  return { quotes, loading, error, lastUpdated, refresh };
}