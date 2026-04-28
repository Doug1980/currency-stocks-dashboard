import type { Stock } from "@/types";

/**
 * Lista das 8 ações americanas mais relevantes.
 * Símbolos compatíveis com Finnhub.io (free tier).
 */
export const STOCKS: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "GOOGL", name: "Alphabet (Google)" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "AMZN", name: "Amazon" },
  { symbol: "TSLA", name: "Tesla" },
  { symbol: "NVDA", name: "NVIDIA" },
  { symbol: "META", name: "Meta Platforms" },
  { symbol: "NFLX", name: "Netflix" },
];

/**
 * Busca uma ação pelo símbolo.
 */
export function getStockBySymbol(symbol: string): Stock | undefined {
  return STOCKS.find((s) => s.symbol === symbol);
}