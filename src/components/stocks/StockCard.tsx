"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import type { StockQuote } from "@/types";

interface StockCardProps {
  quote: StockQuote;
  index?: number;
}

/**
 * Card de cotação de ação com preço atual, variação e cor dinâmica.
 *
 * - Verde quando ação está em alta (change >= 0)
 * - Vermelho quando está em queda (change < 0)
 * - Animação de entrada em cascata via index
 */
export function StockCard({ quote, index = 0 }: StockCardProps) {
  const isPositive = quote.change >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 p-6 transition-all hover:-translate-y-1"
    >
      {/* Header: símbolo e nome */}
      <div className="flex items-start justify-between mb-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-2xl text-[var(--color-text-primary)] tracking-tight">
            {quote.symbol}
          </h3>
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
            {quote.percentChange.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Preço principal */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            US$
          </span>
          <span
            className={`text-3xl font-bold font-mono ${
              isPositive ? "text-green-700" : "text-red-700"
            }`}
          >
            <AnimatedNumber value={quote.current} decimals={2} />
          </span>
        </div>
        <div className="text-sm font-mono text-[var(--color-text-muted)] mt-1">
          {isPositive ? "+" : ""}
          {quote.change.toFixed(2)} hoje
        </div>
      </div>

      {/* Stats: high/low/open */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-xs">
        <div>
          <div className="text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
            Abertura
          </div>
          <div className="font-mono font-semibold text-[var(--color-text-primary)]">
            {quote.open.toFixed(2)}
          </div>
        </div>

        <div>
          <div className="text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
            Máxima
          </div>
          <div className="font-mono font-semibold text-green-700">
            {quote.high.toFixed(2)}
          </div>
        </div>

        <div>
          <div className="text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
            Mínima
          </div>
          <div className="font-mono font-semibold text-red-700">
            {quote.low.toFixed(2)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}