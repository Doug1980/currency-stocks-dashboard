import type { Stock, StockCategory, CategoryId } from "@/types";

/**
 * Definição das 5 categorias do painel.
 * Ordem da lista define ordem de exibição no painel (Cripto primeiro).
 */
export const CATEGORIES: StockCategory[] = [
  { id: "crypto", name: "Criptomoedas", icon: "Bitcoin", color: "#F7931A" },
  { id: "tech", name: "Tecnologia", icon: "Cpu", color: "#5B5BF7" },
  { id: "financial", name: "Financeiro", icon: "Landmark", color: "#0EA5E9" },
  { id: "consumer", name: "Consumo", icon: "ShoppingBag", color: "#EC4899" },
  { id: "health", name: "Saúde", icon: "HeartPulse", color: "#10B981" },
];

/**
 * Lista completa de 18 ativos distribuídos em 5 categorias.
 *
 * - apiSymbol: formato esperado pela Finnhub
 *   - Ações: símbolo direto (AAPL, MSFT...)
 *   - Cripto: prefixo BINANCE: (BINANCE:BTCUSDT...)
 */
export const STOCKS: Stock[] = [
  // ₿ Criptomoedas (4)
  { symbol: "BTC", apiSymbol: "BINANCE:BTCUSDT", name: "Bitcoin", category: "crypto" },
  { symbol: "ETH", apiSymbol: "BINANCE:ETHUSDT", name: "Ethereum", category: "crypto" },
  { symbol: "SOL", apiSymbol: "BINANCE:SOLUSDT", name: "Solana", category: "crypto" },
  { symbol: "XRP", apiSymbol: "BINANCE:XRPUSDT", name: "Ripple", category: "crypto" },

  // 📈 Tecnologia (5)
  { symbol: "AAPL", apiSymbol: "AAPL", name: "Apple Inc.", category: "tech" },
  { symbol: "MSFT", apiSymbol: "MSFT", name: "Microsoft", category: "tech" },
  { symbol: "GOOGL", apiSymbol: "GOOGL", name: "Alphabet (Google)", category: "tech" },
  { symbol: "NVDA", apiSymbol: "NVDA", name: "NVIDIA", category: "tech" },
  { symbol: "META", apiSymbol: "META", name: "Meta Platforms", category: "tech" },

  // 💰 Financeiro (3)
  { symbol: "JPM", apiSymbol: "JPM", name: "JPMorgan Chase", category: "financial" },
  { symbol: "V", apiSymbol: "V", name: "Visa", category: "financial" },
  { symbol: "MA", apiSymbol: "MA", name: "Mastercard", category: "financial" },

  // 🛒 Consumo (4)
  { symbol: "AMZN", apiSymbol: "AMZN", name: "Amazon", category: "consumer" },
  { symbol: "TSLA", apiSymbol: "TSLA", name: "Tesla", category: "consumer" },
  { symbol: "KO", apiSymbol: "KO", name: "Coca-Cola", category: "consumer" },
  { symbol: "WMT", apiSymbol: "WMT", name: "Walmart", category: "consumer" },

  // 🏥 Saúde (2)
  { symbol: "JNJ", apiSymbol: "JNJ", name: "Johnson & Johnson", category: "health" },
  { symbol: "PFE", apiSymbol: "PFE", name: "Pfizer", category: "health" },
];

/**
 * Busca uma ação pelo símbolo de exibição.
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