export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export interface ExchangeRate {
  base: string;
  target: string;
  rate: number;
  date: string;
}

export interface ConversionResult {
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
  timestamp: number;
}

export type CategoryId = "crypto" | "tech" | "financial" | "consumer" | "health";

export interface StockCategory {
  id: CategoryId;
  name: string;
  icon: string;
  color: string;
}

export interface Stock {
  symbol: string;       // Símbolo de exibição (ex: "BTC", "AAPL")
  apiSymbol: string;    // Símbolo na API Finnhub (ex: "BINANCE:BTCUSDT", "AAPL")
  name: string;
  category: CategoryId;
}

export interface StockQuote {
  symbol: string;
  name: string;
  category: CategoryId;
  current: number;
  change: number;
  percentChange: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  timestamp: number;
}