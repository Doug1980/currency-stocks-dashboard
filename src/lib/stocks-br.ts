import type { Stock, StockCategory, CategoryId } from "@/types";

/**
 * Categorias do mercado nacional (B3).
 * Tipologia adaptada à realidade do mercado brasileiro.
 */
export const BR_CATEGORIES: StockCategory[] = [
  { id: "tech", name: "Energia & Mineração", icon: "Factory", color: "#16A34A" },
  { id: "financial", name: "Bancos & Financeiro", icon: "Landmark", color: "#0EA5E9" },
  { id: "consumer", name: "Varejo", icon: "ShoppingBag", color: "#EC4899" },
  { id: "crypto", name: "Telecom & Tecnologia", icon: "Cpu", color: "#7C3AED" },
  { id: "health", name: "Consumo & Bens", icon: "Wheat", color: "#D97706" },
];

/**
 * 60 ações brasileiras (B3) divididas em 5 categorias.
 *
 * Símbolos B3 oficiais (4 dígitos terminando em 3 ou 4 para ações,
 * ou 11 para units/ETFs).
 *
 * IMPORTANTE: estamos reutilizando os tipos CategoryId existentes
 * (crypto/tech/financial/consumer/health) com nomes adaptados ao
 * mercado BR. Isso permite reusar o componente CategoryCarousel.
 */
export const STOCKS_BR: Stock[] = [
  // 🛢️ Energia & Mineração (12) — usa categoryId "tech"
  { symbol: "PETR4", apiSymbol: "PETR4", name: "Petrobras", category: "tech" },
  { symbol: "PETR3", apiSymbol: "PETR3", name: "Petrobras ON", category: "tech" },
  { symbol: "VALE3", apiSymbol: "VALE3", name: "Vale", category: "tech" },
  { symbol: "PRIO3", apiSymbol: "PRIO3", name: "PetroRio", category: "tech" },
  { symbol: "CSNA3", apiSymbol: "CSNA3", name: "CSN", category: "tech" },
  { symbol: "USIM5", apiSymbol: "USIM5", name: "Usiminas", category: "tech" },
  { symbol: "GGBR4", apiSymbol: "GGBR4", name: "Gerdau", category: "tech" },
  { symbol: "GOAU4", apiSymbol: "GOAU4", name: "Metalúrgica Gerdau", category: "tech" },
  { symbol: "SUZB3", apiSymbol: "SUZB3", name: "Suzano", category: "tech" },
  { symbol: "KLBN11", apiSymbol: "KLBN11", name: "Klabin", category: "tech" },
  { symbol: "BRAP4", apiSymbol: "BRAP4", name: "Bradespar", category: "tech" },
  { symbol: "CMIG4", apiSymbol: "CMIG4", name: "Cemig", category: "tech" },

  // 🏦 Bancos & Financeiro (12) — usa categoryId "financial"
  { symbol: "ITUB4", apiSymbol: "ITUB4", name: "Itaú Unibanco", category: "financial" },
  { symbol: "BBDC4", apiSymbol: "BBDC4", name: "Bradesco", category: "financial" },
  { symbol: "BBAS3", apiSymbol: "BBAS3", name: "Banco do Brasil", category: "financial" },
  { symbol: "SANB11", apiSymbol: "SANB11", name: "Santander BR", category: "financial" },
  { symbol: "BPAC11", apiSymbol: "BPAC11", name: "BTG Pactual", category: "financial" },
  { symbol: "ITSA4", apiSymbol: "ITSA4", name: "Itaúsa", category: "financial" },
  { symbol: "BBSE3", apiSymbol: "BBSE3", name: "BB Seguridade", category: "financial" },
  { symbol: "B3SA3", apiSymbol: "B3SA3", name: "B3", category: "financial" },
  { symbol: "PSSA3", apiSymbol: "PSSA3", name: "Porto Seguro", category: "financial" },
  { symbol: "IRBR3", apiSymbol: "IRBR3", name: "IRB Brasil RE", category: "financial" },
  { symbol: "CIEL3", apiSymbol: "CIEL3", name: "Cielo", category: "financial" },
  { symbol: "BRSR6", apiSymbol: "BRSR6", name: "Banrisul", category: "financial" },

  // 🛒 Varejo (12) — usa categoryId "consumer"
  { symbol: "MGLU3", apiSymbol: "MGLU3", name: "Magazine Luiza", category: "consumer" },
  { symbol: "LREN3", apiSymbol: "LREN3", name: "Lojas Renner", category: "consumer" },
  { symbol: "AMER3", apiSymbol: "AMER3", name: "Americanas", category: "consumer" },
  { symbol: "VIIA3", apiSymbol: "VIIA3", name: "Via", category: "consumer" },
  { symbol: "ASAI3", apiSymbol: "ASAI3", name: "Assaí", category: "consumer" },
  { symbol: "PCAR3", apiSymbol: "PCAR3", name: "Grupo Pão de Açúcar", category: "consumer" },
  { symbol: "CRFB3", apiSymbol: "CRFB3", name: "Carrefour BR", category: "consumer" },
  { symbol: "SOMA3", apiSymbol: "SOMA3", name: "Grupo Soma", category: "consumer" },
  { symbol: "ARZZ3", apiSymbol: "ARZZ3", name: "Arezzo", category: "consumer" },
  { symbol: "GRND3", apiSymbol: "GRND3", name: "Grendene", category: "consumer" },
  { symbol: "CEAB3", apiSymbol: "CEAB3", name: "C&A Brasil", category: "consumer" },
  { symbol: "ALPA4", apiSymbol: "ALPA4", name: "Alpargatas", category: "consumer" },

  // 📡 Telecom & Tecnologia (12) — usa categoryId "crypto"
  { symbol: "VIVT3", apiSymbol: "VIVT3", name: "Telefônica Vivo", category: "crypto" },
  { symbol: "TIMS3", apiSymbol: "TIMS3", name: "TIM", category: "crypto" },
  { symbol: "OIBR3", apiSymbol: "OIBR3", name: "Oi", category: "crypto" },
  { symbol: "TOTS3", apiSymbol: "TOTS3", name: "TOTVS", category: "crypto" },
  { symbol: "LWSA3", apiSymbol: "LWSA3", name: "Locaweb", category: "crypto" },
  { symbol: "POSI3", apiSymbol: "POSI3", name: "Positivo", category: "crypto" },
  { symbol: "INTB3", apiSymbol: "INTB3", name: "Intelbras", category: "crypto" },
  { symbol: "MELI34", apiSymbol: "MELI34", name: "Mercado Livre BDR", category: "crypto" },
  { symbol: "BRIT3", apiSymbol: "BRIT3", name: "Brisanet", category: "crypto" },
  { symbol: "NINJ3", apiSymbol: "NINJ3", name: "Get Ninjas", category: "crypto" },
  { symbol: "ENJU3", apiSymbol: "ENJU3", name: "Enjoei", category: "crypto" },
  { symbol: "MOSI3", apiSymbol: "MOSI3", name: "Mosaico", category: "crypto" },

  // 🍺 Consumo & Bens (12) — usa categoryId "health"
  { symbol: "ABEV3", apiSymbol: "ABEV3", name: "Ambev", category: "health" },
  { symbol: "JBSS3", apiSymbol: "JBSS3", name: "JBS", category: "health" },
  { symbol: "BRFS3", apiSymbol: "BRFS3", name: "BRF", category: "health" },
  { symbol: "MRFG3", apiSymbol: "MRFG3", name: "Marfrig", category: "health" },
  { symbol: "BEEF3", apiSymbol: "BEEF3", name: "Minerva", category: "health" },
  { symbol: "NTCO3", apiSymbol: "NTCO3", name: "Natura", category: "health" },
  { symbol: "HYPE3", apiSymbol: "HYPE3", name: "Hypera", category: "health" },
  { symbol: "RADL3", apiSymbol: "RADL3", name: "RaiaDrogasil", category: "health" },
  { symbol: "PNVL3", apiSymbol: "PNVL3", name: "Panvel", category: "health" },
  { symbol: "SLCE3", apiSymbol: "SLCE3", name: "SLC Agrícola", category: "health" },
  { symbol: "AGRO3", apiSymbol: "AGRO3", name: "BrasilAgro", category: "health" },
  { symbol: "SMTO3", apiSymbol: "SMTO3", name: "São Martinho", category: "health" },
];

/**
 * Busca uma ação brasileira pelo símbolo.
 */
export function getBrStockBySymbol(symbol: string): Stock | undefined {
  return STOCKS_BR.find((s) => s.symbol === symbol);
}

/**
 * Busca categoria BR pelo ID.
 */
export function getBrCategoryById(id: CategoryId): StockCategory | undefined {
  return BR_CATEGORIES.find((c) => c.id === id);
}

/**
 * Filtra ações BR por categoria.
 */
export function getBrStocksByCategory(categoryId: CategoryId): Stock[] {
  return STOCKS_BR.filter((s) => s.category === categoryId);
}