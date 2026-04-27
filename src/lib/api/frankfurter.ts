/**
 * Cliente da API Frankfurter (https://www.frankfurter.dev/).
 *
 * API pública e gratuita do Banco Central Europeu.
 * - Sem necessidade de API key
 * - Atualizada diariamente (16h CET)
 * - Sem rate limit agressivo
 */

const FRANKFURTER_BASE_URL = "https://api.frankfurter.dev/v1";

export interface FrankfurterLatestResponse {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface ExchangeRateData {
  from: string;
  to: string;
  rate: number;
  date: string;
}

/**
 * Busca a taxa de câmbio mais recente entre duas moedas.
 *
 * @param from Moeda de origem (ex: "USD")
 * @param to Moeda de destino (ex: "BRL")
 * @returns Dados normalizados de câmbio
 */
export async function fetchExchangeRate(
  from: string,
  to: string
): Promise<ExchangeRateData> {
  // Caso especial: mesma moeda
  if (from === to) {
    return {
      from,
      to,
      rate: 1,
      date: new Date().toISOString().split("T")[0],
    };
  }

  const url = `${FRANKFURTER_BASE_URL}/latest?base=${from}&symbols=${to}`;

  const response = await fetch(url, {
    // Cache de 5 minutos no servidor (taxa do BCE atualiza 1x/dia)
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(
      `Frankfurter API error: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as FrankfurterLatestResponse;

  if (!data.rates || !data.rates[to]) {
    throw new Error(`Taxa não disponível para ${from} → ${to}`);
  }

  return {
    from: data.base,
    to,
    rate: data.rates[to],
    date: data.date,
  };
}