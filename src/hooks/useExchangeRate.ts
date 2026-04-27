import { useState, useEffect } from "react";

/**
 * Mock de taxas de câmbio relativas ao USD.
 * Valores aproximados de referência (atualizados em 2026).
 *
 * Na Etapa 3, esse mock será substituído pela API Frankfurter.
 */
const MOCK_RATES_USD: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  BRL: 5.48,
  GBP: 0.79,
  JPY: 149.5,
  CNY: 7.24,
  CHF: 0.88,
  CAD: 1.36,
  AUD: 1.52,
  NZD: 1.65,
  SEK: 10.4,
  NOK: 10.6,
  DKK: 6.85,
  MXN: 17.2,
  INR: 83.1,
  KRW: 1335.0,
  SGD: 1.34,
  HKD: 7.81,
  ZAR: 18.7,
  TRY: 32.4,
};

interface UseExchangeRateResult {
  rate: number | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook que retorna a taxa de câmbio entre duas moedas.
 *
 * @param from Código da moeda de origem (ex: "USD")
 * @param to Código da moeda de destino (ex: "BRL")
 * @returns { rate, loading, error }
 *
 * @example
 * const { rate, loading } = useExchangeRate("USD", "BRL");
 * // rate = 5.48 (USD para BRL)
 */
export function useExchangeRate(
  from: string,
  to: string
): UseExchangeRateResult {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!from || !to) return;

    setLoading(true);
    setError(null);

    // Simula latência de rede (300ms) — UX realista
    const timer = setTimeout(() => {
      try {
        const fromRate = MOCK_RATES_USD[from];
        const toRate = MOCK_RATES_USD[to];

        if (fromRate === undefined || toRate === undefined) {
          throw new Error(`Moeda não suportada: ${from} ou ${to}`);
        }

        // Conversão via USD como base: (1/from) * to
        const calculatedRate = toRate / fromRate;
        setRate(calculatedRate);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setRate(null);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [from, to]);

  return { rate, loading, error };
}