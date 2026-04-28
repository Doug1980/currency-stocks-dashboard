/**
 * Cliente da API Finnhub (https://finnhub.io/).
 *
 * Free tier: 60 requests/minute.
 * Requer API key (FINNHUB_API_KEY no .env.local).
 */

const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

/**
 * Resposta bruta do endpoint /quote do Finnhub.
 *
 * Documentação: https://finnhub.io/docs/api/quote
 */
export interface FinnhubQuoteResponse {
  c: number; // current price
  d: number; // change (absolute)
  dp: number; // change percent
  h: number; // high price of the day
  l: number; // low price of the day
  o: number; // open price of the day
  pc: number; // previous close
  t: number; // timestamp (unix)
}

export interface StockQuoteData {
  symbol: string;
  current: number;
  change: number;
  percentChange: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  timestamp: number;
}

/**
 * Busca a cotação atual de uma ação.
 *
 * @param symbol Símbolo da ação (ex: "AAPL")
 * @returns Dados normalizados de cotação
 * @throws Erro se a API key não estiver configurada ou se houver falha na requisição
 */
export async function fetchStockQuote(symbol: string): Promise<StockQuoteData> {
  const apiKey = process.env.FINNHUB_API_KEY;

  if (!apiKey || apiKey === "placeholder_temporario") {
    throw new Error(
      "FINNHUB_API_KEY não configurada. Adicione sua chave em .env.local"
    );
  }

  const url = `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${apiKey}`;

  const response = await fetch(url, {
    // Cache de 60 segundos no servidor (cotações mudam constantemente)
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("API key do Finnhub inválida");
    }
    if (response.status === 429) {
      throw new Error("Limite de requisições do Finnhub atingido");
    }
    throw new Error(
      `Finnhub API error: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as FinnhubQuoteResponse;

  // Finnhub retorna 0 em todos os campos quando o símbolo é inválido
  if (data.c === 0 && data.pc === 0) {
    throw new Error(`Cotação não disponível para o símbolo: ${symbol}`);
  }

  return {
    symbol,
    current: data.c,
    change: data.d,
    percentChange: data.dp,
    high: data.h,
    low: data.l,
    open: data.o,
    previousClose: data.pc,
    timestamp: data.t * 1000, // Finnhub retorna em segundos, convertemos pra ms
  };
}