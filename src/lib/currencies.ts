import type { Currency } from "@/types";

/**
 * Lista das 20 moedas mais relevantes globalmente.
 * As bandeiras são emojis Unicode (cross-platform, sem dependência externa).
 */
export const CURRENCIES: Currency[] = [
  { code: "USD", name: "Dólar Americano", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "BRL", name: "Real Brasileiro", symbol: "R$", flag: "🇧🇷" },
  { code: "GBP", name: "Libra Esterlina", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Iene Japonês", symbol: "¥", flag: "🇯🇵" },
  { code: "CNY", name: "Yuan Chinês", symbol: "¥", flag: "🇨🇳" },
  { code: "CHF", name: "Franco Suíço", symbol: "Fr", flag: "🇨🇭" },
  { code: "CAD", name: "Dólar Canadense", symbol: "C$", flag: "🇨🇦" },
  { code: "AUD", name: "Dólar Australiano", symbol: "A$", flag: "🇦🇺" },
  { code: "NZD", name: "Dólar Neozelandês", symbol: "NZ$", flag: "🇳🇿" },
  { code: "SEK", name: "Coroa Sueca", symbol: "kr", flag: "🇸🇪" },
  { code: "NOK", name: "Coroa Norueguesa", symbol: "kr", flag: "🇳🇴" },
  { code: "DKK", name: "Coroa Dinamarquesa", symbol: "kr", flag: "🇩🇰" },
  { code: "MXN", name: "Peso Mexicano", symbol: "$", flag: "🇲🇽" },
  { code: "INR", name: "Rupia Indiana", symbol: "₹", flag: "🇮🇳" },
  { code: "KRW", name: "Won Sul-Coreano", symbol: "₩", flag: "🇰🇷" },
  { code: "SGD", name: "Dólar de Singapura", symbol: "S$", flag: "🇸🇬" },
  { code: "HKD", name: "Dólar de Hong Kong", symbol: "HK$", flag: "🇭🇰" },
  { code: "ZAR", name: "Rand Sul-Africano", symbol: "R", flag: "🇿🇦" },
  { code: "TRY", name: "Lira Turca", symbol: "₺", flag: "🇹🇷" },
];

/**
 * Busca uma moeda pelo código (ex: "USD").
 */
export function getCurrencyByCode(code: string): Currency | undefined {
  return CURRENCIES.find((c) => c.code === code);
}

/**
 * Filtra moedas por termo de busca (código ou nome).
 */
export function filterCurrencies(query: string): Currency[] {
  if (!query.trim()) return CURRENCIES;

  const normalized = query.toLowerCase().trim();
  return CURRENCIES.filter(
    (c) =>
      c.code.toLowerCase().includes(normalized) ||
      c.name.toLowerCase().includes(normalized)
  );
}