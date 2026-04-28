import type { Stock, StockCategory, CategoryId } from "@/types";

/**
 * 5 categorias do painel + Top Movers (dinâmico, não está aqui).
 * Ordem define exibição (Cripto primeiro).
 */
export const CATEGORIES: StockCategory[] = [
  { id: "crypto", name: "Criptomoedas", icon: "Bitcoin", color: "#F7931A" },
  { id: "tech", name: "Tecnologia", icon: "Cpu", color: "#5B5BF7" },
  { id: "financial", name: "Financeiro", icon: "Landmark", color: "#0EA5E9" },
  { id: "consumer", name: "Consumo", icon: "ShoppingBag", color: "#EC4899" },
  { id: "health", name: "Saúde", icon: "HeartPulse", color: "#10B981" },
];

/**
 * 60 ativos distribuídos em 5 categorias (12 cada).
 *
 * Símbolos validados para o free tier do Finnhub.io.
 * Cripto via Binance (prefixo BINANCE:).
 */
export const STOCKS: Stock[] = [
  // ₿ Criptomoedas (12)
  { symbol: "BTC", apiSymbol: "BINANCE:BTCUSDT", name: "Bitcoin", category: "crypto" },
  { symbol: "ETH", apiSymbol: "BINANCE:ETHUSDT", name: "Ethereum", category: "crypto" },
  { symbol: "SOL", apiSymbol: "BINANCE:SOLUSDT", name: "Solana", category: "crypto" },
  { symbol: "XRP", apiSymbol: "BINANCE:XRPUSDT", name: "Ripple", category: "crypto" },
  { symbol: "BNB", apiSymbol: "BINANCE:BNBUSDT", name: "Binance Coin", category: "crypto" },
  { symbol: "ADA", apiSymbol: "BINANCE:ADAUSDT", name: "Cardano", category: "crypto" },
  { symbol: "DOGE", apiSymbol: "BINANCE:DOGEUSDT", name: "Dogecoin", category: "crypto" },
  { symbol: "AVAX", apiSymbol: "BINANCE:AVAXUSDT", name: "Avalanche", category: "crypto" },
  { symbol: "DOT", apiSymbol: "BINANCE:DOTUSDT", name: "Polkadot", category: "crypto" },
  { symbol: "LINK", apiSymbol: "BINANCE:LINKUSDT", name: "Chainlink", category: "crypto" },
  { symbol: "LTC", apiSymbol: "BINANCE:LTCUSDT", name: "Litecoin", category: "crypto" },
  { symbol: "POL", apiSymbol: "BINANCE:POLUSDT", name: "Polygon", category: "crypto" },

  // 📈 Tecnologia (12)
  { symbol: "AAPL", apiSymbol: "AAPL", name: "Apple Inc.", category: "tech" },
  { symbol: "MSFT", apiSymbol: "MSFT", name: "Microsoft", category: "tech" },
  { symbol: "GOOGL", apiSymbol: "GOOGL", name: "Alphabet (Google)", category: "tech" },
  { symbol: "NVDA", apiSymbol: "NVDA", name: "NVIDIA", category: "tech" },
  { symbol: "META", apiSymbol: "META", name: "Meta Platforms", category: "tech" },
  { symbol: "AMZN", apiSymbol: "AMZN", name: "Amazon", category: "tech" },
  { symbol: "TSLA", apiSymbol: "TSLA", name: "Tesla", category: "tech" },
  { symbol: "AMD", apiSymbol: "AMD", name: "AMD", category: "tech" },
  { symbol: "ORCL", apiSymbol: "ORCL", name: "Oracle", category: "tech" },
  { symbol: "CRM", apiSymbol: "CRM", name: "Salesforce", category: "tech" },
  { symbol: "ADBE", apiSymbol: "ADBE", name: "Adobe", category: "tech" },
  { symbol: "INTC", apiSymbol: "INTC", name: "Intel", category: "tech" },

  // 💰 Financeiro (12)
  { symbol: "JPM", apiSymbol: "JPM", name: "JPMorgan Chase", category: "financial" },
  { symbol: "V", apiSymbol: "V", name: "Visa", category: "financial" },
  { symbol: "MA", apiSymbol: "MA", name: "Mastercard", category: "financial" },
  { symbol: "BAC", apiSymbol: "BAC", name: "Bank of America", category: "financial" },
  { symbol: "GS", apiSymbol: "GS", name: "Goldman Sachs", category: "financial" },
  { symbol: "MS", apiSymbol: "MS", name: "Morgan Stanley", category: "financial" },
  { symbol: "WFC", apiSymbol: "WFC", name: "Wells Fargo", category: "financial" },
  { symbol: "AXP", apiSymbol: "AXP", name: "American Express", category: "financial" },
  { symbol: "C", apiSymbol: "C", name: "Citigroup", category: "financial" },
  { symbol: "BLK", apiSymbol: "BLK", name: "BlackRock", category: "financial" },
  { symbol: "SCHW", apiSymbol: "SCHW", name: "Charles Schwab", category: "financial" },
  { symbol: "COF", apiSymbol: "COF", name: "Capital One", category: "financial" },

  // 🛒 Consumo (12)
  { symbol: "WMT", apiSymbol: "WMT", name: "Walmart", category: "consumer" },
  { symbol: "KO", apiSymbol: "KO", name: "Coca-Cola", category: "consumer" },
  { symbol: "PEP", apiSymbol: "PEP", name: "PepsiCo", category: "consumer" },
  { symbol: "MCD", apiSymbol: "MCD", name: "McDonald's", category: "consumer" },
  { symbol: "NKE", apiSymbol: "NKE", name: "Nike", category: "consumer" },
  { symbol: "SBUX", apiSymbol: "SBUX", name: "Starbucks", category: "consumer" },
  { symbol: "DIS", apiSymbol: "DIS", name: "Disney", category: "consumer" },
  { symbol: "COST", apiSymbol: "COST", name: "Costco", category: "consumer" },
  { symbol: "HD", apiSymbol: "HD", name: "Home Depot", category: "consumer" },
  { symbol: "LOW", apiSymbol: "LOW", name: "Lowe's", category: "consumer" },
  { symbol: "TGT", apiSymbol: "TGT", name: "Target", category: "consumer" },
  { symbol: "PG", apiSymbol: "PG", name: "Procter & Gamble", category: "consumer" },

  // 🏥 Saúde (12)
  { symbol: "JNJ", apiSymbol: "JNJ", name: "Johnson & Johnson", category: "health" },
  { symbol: "PFE", apiSymbol: "PFE", name: "Pfizer", category: "health" },
  { symbol: "UNH", apiSymbol: "UNH", name: "UnitedHealth", category: "health" },
  { symbol: "LLY", apiSymbol: "LLY", name: "Eli Lilly", category: "health" },
  { symbol: "ABBV", apiSymbol: "ABBV", name: "AbbVie", category: "health" },
  { symbol: "MRK", apiSymbol: "MRK", name: "Merck", category: "health" },
  { symbol: "TMO", apiSymbol: "TMO", name: "Thermo Fisher", category: "health" },
  { symbol: "ABT", apiSymbol: "ABT", name: "Abbott", category: "health" },
  { symbol: "BMY", apiSymbol: "BMY", name: "Bristol-Myers Squibb", category: "health" },
  { symbol: "AMGN", apiSymbol: "AMGN", name: "Amgen", category: "health" },
  { symbol: "GILD", apiSymbol: "GILD", name: "Gilead Sciences", category: "health" },
  { symbol: "CVS", apiSymbol: "CVS", name: "CVS Health", category: "health" },
];

/**
 * Busca um ativo pelo símbolo de exibição.
 */
export function getStockBySymbol(symbol: string): Stock | undefined {
  return STOCKS.find((s) => s.symbol === symbol);
}

/**
 * Busca categoria pelo ID.
 */
export function getCategoryById(id: CategoryId): StockCategory | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

/**
 * Filtra ativos por categoria.
 */
export function getStocksByCategory(categoryId: CategoryId): Stock[] {
  return STOCKS.filter((s) => s.category === categoryId);
}