import { useState, useEffect } from "react";

interface UseExchangeRateResult {
  rate: number | null;
  loading: boolean;
  error: string | null;
  date: string | null;
}

interface ExchangeApiResponse {
  from: string;
  to: string;
  rate: number;
  date: string;
}

interface ExchangeApiError {
  error: string;
}

/**
 * Hook que retorna a taxa de câmbio entre duas moedas.
 *
 * Consome o endpoint /api/exchange (BFF do projeto).
 * Cancela requisições anteriores quando os parâmetros mudam.
 *
 * @param from Código da moeda de origem (ex: "USD")
 * @param to Código da moeda de destino (ex: "BRL")
 * @returns { rate, loading, error, date }
 *
 * @example
 * const { rate, loading } = useExchangeRate("USD", "BRL");
 */
export function useExchangeRate(
  from: string,
  to: string
): UseExchangeRateResult {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    if (!from || !to) return;

    const controller = new AbortController();

    async function fetchRate() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/exchange?from=${from}&to=${to}`,
          { signal: controller.signal }
        );

        const data = (await response.json()) as
          | ExchangeApiResponse
          | ExchangeApiError;

        if (!response.ok) {
          const errorMessage =
            "error" in data ? data.error : "Erro ao buscar taxa";
          throw new Error(errorMessage);
        }

        if ("rate" in data) {
          setRate(data.rate);
          setDate(data.date);
        }
      } catch (err) {
        // Ignora erros de cancelamento (são esperados)
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setRate(null);
        setDate(null);
      } finally {
        setLoading(false);
      }
    }

    fetchRate();

    // Cleanup: cancela request se componente desmontar ou params mudarem
    return () => controller.abort();
  }, [from, to]);

  return { rate, loading, error, date };
}