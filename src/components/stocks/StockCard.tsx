"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Flame } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import type { StockQuote } from "@/types";

interface StockCardProps {
  quote: StockQuote;
  index?: number;
  rank?: number;
  /** Moeda exibida nos preços. USD por padrão. */
  currency?: "USD" | "BRL";
}

/**
 * Card de cotação. Renderiza ações e criptomoedas.
 *
 * - Cripto recebe gradient dourado (cor do Bitcoin)
 * - Verde quando positivo, vermelho quando negativo
 * - Badge "Em alta" se variação > 3%
 * - Animação de entrada em cascade via index
 * - Suporta ranking (rank prop) pro carrossel Top Movers
 */
export function StockCard({
  quote,
  index = 0,
  rank,
  currency = "USD",
}: StockCardProps) {
  const currencyLabel = currency === "BRL" ? "R$" : "US$";
  // Defesas: se algum campo numérico vier null/undefined, usa 0 como fallback
  const change = quote.change ?? 0;
  const percentChange = quote.percentChange ?? 0;
  const current = quote.current ?? 0;
  const open = quote.open ?? 0;
  const high = quote.high ?? 0;
  const low = quote.low ?? 0;

  const isPositive = change >= 0;
  const isCrypto = quote.category === "crypto";
  const isHot = percentChange > 3;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className={`
        relative bg-white rounded-2xl shadow-md hover:shadow-xl
        border border-gray-100 p-6 transition-shadow
        min-w-[260px]
        ${isCrypto ? "bg-gradient-to-br from-amber-50 to-white border-amber-200" : ""}
      `}
    >
      {/* Badge de ranking (Top Movers) */}
      {rank !== undefined && (
        <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-[var(--color-brand)] text-white font-bold text-sm flex items-center justify-center shadow-md ring-2 ring-white">
          {rank}
        </div>
      )}

      {/* Badge "Em alta" */}
      {isHot && (
        <div className="absolute -top-2 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500 text-white text-xs font-bold shadow-md">
          <Flame size={12} />
          <span>Em alta</span>
        </div>
      )}

      {/* Header: símbolo e nome */}
      <div className="flex items-start justify-between mb-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-2xl text-[var(--color-text-primary)] tracking-tight">
              {quote.symbol}
            </h3>
            {isCrypto && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-bold uppercase tracking-wider">
                24/7
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--color-text-muted)] truncate">
            {quote.name}
          </p>
        </div>

        {/* Badge variação */}
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-bold ${
            isPositive
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          <TrendIcon size={14} />
          <span className="font-mono">
            {isPositive ? "+" : ""}
            {percentChange.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Preço principal */}
      <div className="mb-4">
         <div className="flex items-baseline gap-2">
          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            {currencyLabel}
          </span>
          <span
            className={`text-3xl font-bold font-mono ${
              isPositive ? "text-green-700" : "text-red-700"
            }`}
          >
            <AnimatedNumber value={current} decimals={2} />
          </span>
        </div>
        <div className="text-sm font-mono text-[var(--color-text-muted)] mt-1">
          {isPositive ? "+" : ""}
          {change.toFixed(2)} hoje
        </div>
      </div>

      {/* Stats: open/high/low */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-xs">
        <div>
          <div className="text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
            Abertura
          </div>
          <div className="font-mono font-semibold text-[var(--color-text-primary)]">
            {open.toFixed(2)}
          </div>
        </div>

        <div>
          <div className="text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
            Máxima
          </div>
          <div className="font-mono font-semibold text-green-700">
            {high.toFixed(2)}
          </div>
        </div>

        <div>
          <div className="text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
            Mínima
          </div>
          <div className="font-mono font-semibold text-red-700">
            {low.toFixed(2)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}