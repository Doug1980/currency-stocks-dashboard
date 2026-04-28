import type { Currency } from "@/types";

/**
 * Lista de 20 moedas globais suportadas pelo conversor.
 *
 * @property code - Código ISO 4217 da moeda (ex: USD, BRL)
 * @property name - Nome legível em português
 * @property symbol - Símbolo monetário (ex: $, R$)
 * @property flag - Emoji de bandeira (fallback)
 * @property countryCode - Código ISO 3166-1 alpha-2 minúsculo (para flagcdn.com)
 */
export const CURRENCIES: Currency[] = [
  { code: "USD", name: "Dólar Americano", symbol: "$", flag: "🇺🇸", countryCode: "us" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", countryCode: "eu" },
  { code: "BRL", name: "Real Brasileiro", symbol: "R$", flag: "🇧🇷", countryCode: "br" },
  { code: "GBP", name: "Libra Esterlina", symbol: "£", flag: "🇬🇧", countryCode: "gb" },
  { code: "JPY", name: "Iene Japonês", symbol: "¥", flag: "🇯🇵", countryCode: "jp" },
  { code: "CNY", name: "Yuan Chinês", symbol: "¥", flag: "🇨🇳", countryCode: "cn" },
  { code: "CHF", name: "Franco Suíço", symbol: "Fr", flag: "🇨🇭", countryCode: "ch" },
  { code: "CAD", name: "Dólar Canadense", symbol: "C$", flag: "🇨🇦", countryCode: "ca" },
  { code: "AUD", name: "Dólar Australiano", symbol: "A$", flag: "🇦🇺", countryCode: "au" },
  { code: "NZD", name: "Dólar Neozelandês", symbol: "NZ$", flag: "🇳🇿", countryCode: "nz" },
  { code: "SEK", name: "Coroa Sueca", symbol: "kr", flag: "🇸🇪", countryCode: "se" },
  { code: "NOK", name: "Coroa Norueguesa", symbol: "kr", flag: "🇳🇴", countryCode: "no" },
  { code: "DKK", name: "Coroa Dinamarquesa", symbol: "kr", flag: "🇩🇰", countryCode: "dk" },
  { code: "MXN", name: "Peso Mexicano", symbol: "$", flag: "🇲🇽", countryCode: "mx" },
  { code: "INR", name: "Rúpia Indiana", symbol: "₹", flag: "🇮🇳", countryCode: "in" },
  { code: "KRW", name: "Won Sul-Coreano", symbol: "₩", flag: "🇰🇷", countryCode: "kr" },
  { code: "SGD", name: "Dólar de Singapura", symbol: "S$", flag: "🇸🇬", countryCode: "sg" },
  { code: "HKD", name: "Dólar de Hong Kong", symbol: "HK$", flag: "🇭🇰", countryCode: "hk" },
  { code: "ZAR", name: "Rand Sul-Africano", symbol: "R", flag: "🇿🇦", countryCode: "za" },
  { code: "TRY", name: "Lira Turca", symbol: "₺", flag: "🇹🇷", countryCode: "tr" },
];

/**
 * Busca uma moeda pelo código ISO.
 */
export function getCurrencyByCode(code: string): Currency | undefined {
  return CURRENCIES.find((c) => c.code === code);
}

/**
 * Filtra moedas por busca textual (código ou nome).
 */
export function filterCurrencies(query: string): Currency[] {
  const q = query.toLowerCase().trim();
  if (!q) return CURRENCIES;

  return CURRENCIES.filter(
    (c) =>
      c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
  );
}