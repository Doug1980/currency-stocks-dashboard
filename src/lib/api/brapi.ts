/**
 * Cliente da API brapi.dev (https://brapi.dev/).
 *
 * API gratuita de cotações da B3 (bolsa brasileira).
 * Free tier: 15.000 requests/mês.
 *
 * Requer BRAPI_API_TOKEN no .env.local.
 */

const BRAPI_BASE_URL = "https://brapi.dev/api";

export interface BrapiQuoteResult {
  symbol: string;
  shortName: string;
  longName: string;
  currency: string;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketOpen: number;
  regularMarketPreviousClose: number;
  regularMarketTime: string;
  regularMarketVolume?: number;
  marketCap?: number;
  logourl?: string;
}

export interface BrapiQuoteResponse {
  results: BrapiQuoteResult[];
  requestedAt: string;
  took: number;
}

export interface BrazilianStockData {
  symbol: string;
  longName: string;
  current: number;
  change: number;
  percentChange: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  timestamp: number;
  logoUrl?: string;
}

/**
 * Busca cotação de um único batch de até 20 ações.
 * Retorna [] em caso de falha (resilient).
 */
async function fetchBatch(
  symbols: string[],
  token: string
): Promise<BrapiQuoteResult[]> {
  const symbolsParam = symbols.join(",");
  const url = `${BRAPI_BASE_URL}/quote/${symbolsParam}?token=${token}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 120 },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("[brapi] Batch falhou:", {
        symbols,
        status: response.status,
        body: errorBody.substring(0, 300),
      });

      // Se é erro de auth, propaga (não é problema de símbolo)
      if (response.status === 401 || response.status === 403) {
        throw new Error("Token brapi inválido ou expirado");
      }

      // Pra outros erros (incluindo 400 com símbolo inválido), retorna vazio
      // Resilência: deixa outros batches funcionarem
      return [];
    }

    const data = (await response.json()) as BrapiQuoteResponse;
    return data.results;
  } catch (error) {
    if (error instanceof Error && error.message.includes("Token brapi")) {
      throw error; // re-lança erros de auth
    }
    console.error("[brapi] Erro ao buscar batch:", symbols, error);
    return [];
  }
}

/**
 * Busca cotação de uma ou mais ações brasileiras.
 *
 * Estratégia:
 * - Divide em batches de 20 (limite da brapi)
 * - Cada batch falha de forma isolada (não derruba os outros)
 * - Se um batch tem 1 símbolo inválido, tenta cada símbolo individualmente
 *
 * @param symbols Array de símbolos B3 (ex: ["PETR4", "VALE3"])
 * @returns Array de dados normalizados
 */
export async function fetchBrazilianStocks(
  symbols: string[]
): Promise<BrazilianStockData[]> {
  const token = process.env.BRAPI_API_TOKEN;

  if (!token) {
    throw new Error(
      "BRAPI_API_TOKEN não configurada. Adicione seu token em .env.local"
    );
  }

  if (symbols.length === 0) {
    return [];
  }

  // Divide em batches de 20
  const batchSize = 20;
  const batches: string[][] = [];
  for (let i = 0; i < symbols.length; i += batchSize) {
    batches.push(symbols.slice(i, i + batchSize));
  }

  // Fetch paralelo dos batches
  const batchResults = await Promise.all(
    batches.map((batch) => fetchBatch(batch, token))
  );

  // Se algum batch retornou vazio, tenta cada símbolo individualmente como fallback
  const results: BrapiQuoteResult[] = [];
  for (let i = 0; i < batches.length; i++) {
    const batchResult = batchResults[i];

    if (batchResult.length === 0 && batches[i].length > 1) {
      // Batch falhou — tenta um por um pra identificar qual símbolo quebra
      console.warn(
        `[brapi] Batch ${i + 1} falhou, tentando individualmente...`
      );
      const individualResults = await Promise.all(
        batches[i].map((sym) => fetchBatch([sym], token))
      );
      results.push(...individualResults.flat());
    } else {
      results.push(...batchResult);
    }
  }

  // Adapter: normaliza formato brapi → BrazilianStockData
  return results.map((quote) => ({
    symbol: quote.symbol,
    longName: quote.longName ?? quote.shortName ?? quote.symbol,
    current: quote.regularMarketPrice ?? 0,
    change: quote.regularMarketChange ?? 0,
    percentChange: quote.regularMarketChangePercent ?? 0,
    high: quote.regularMarketDayHigh ?? 0,
    low: quote.regularMarketDayLow ?? 0,
    open: quote.regularMarketOpen ?? 0,
    previousClose: quote.regularMarketPreviousClose ?? 0,
    timestamp: new Date(quote.regularMarketTime).getTime(),
    logoUrl: quote.logourl,
  }));
}