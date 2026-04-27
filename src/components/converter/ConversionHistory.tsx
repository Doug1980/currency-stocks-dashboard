"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, Trash2, RefreshCw } from "lucide-react";
import type { ConversionResult } from "@/types";
import { getCurrencyByCode } from "@/lib/currencies";

interface ConversionHistoryProps {
  history: ConversionResult[];
  onSelect: (conversion: ConversionResult) => void;
  onClear: () => void;
  isHydrated: boolean;
}

/**
 * Formata um timestamp em texto relativo em português.
 * Ex: "agora", "há 2 minutos", "há 1 hora"
 */
function formatRelativeTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 10) return "agora";
  if (seconds < 60) return `há ${seconds}s`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `há ${minutes}min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours}h`;

  const days = Math.floor(hours / 24);
  return `há ${days}d`;
}

/**
 * Card lateral com histórico das últimas 5 conversões.
 * Persistido em localStorage via useConversionHistory.
 */
export function ConversionHistory({
  history,
  onSelect,
  onClear,
  isHydrated,
}: ConversionHistoryProps) {
  // Aguarda hidratação pra evitar mismatch SSR/Client
  if (!isHydrated) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
        <div className="h-6 bg-gray-100 rounded w-32 animate-pulse mb-4" />
        <div className="space-y-2">
          <div className="h-16 bg-gray-50 rounded-xl animate-pulse" />
          <div className="h-16 bg-gray-50 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-[var(--color-brand)]" />
          <h3 className="font-bold text-lg text-[var(--color-text-primary)]">
            Histórico
          </h3>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-brand)] flex items-center gap-1 transition-colors font-semibold uppercase tracking-wider"
            aria-label="Limpar histórico"
          >
            <Trash2 size={12} />
            Limpar
          </button>
        )}
      </div>

      {/* Lista de conversões */}
      {history.length === 0 ? (
        <div className="py-8 text-center">
          <Clock
            size={32}
            className="mx-auto mb-3 text-[var(--color-text-muted)] opacity-30"
          />
          <p className="text-sm text-[var(--color-text-muted)]">
            Nenhuma conversão ainda.
            <br />
            Faça sua primeira!
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {history.map((item) => {
              const fromInfo = getCurrencyByCode(item.from);
              const toInfo = getCurrencyByCode(item.to);

              return (
                <motion.button
                  key={item.timestamp}
                  type="button"
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => onSelect(item)}
                  className="w-full p-3 bg-gray-50 hover:bg-red-50 rounded-xl text-left transition-colors group"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{fromInfo?.flag}</span>
                      <span className="font-mono font-bold text-xs text-[var(--color-text-primary)]">
                        {item.from}
                      </span>
                      <RefreshCw
                        size={10}
                        className="text-[var(--color-text-muted)]"
                      />
                      <span className="text-base">{toInfo?.flag}</span>
                      <span className="font-mono font-bold text-xs text-[var(--color-text-primary)]">
                        {item.to}
                      </span>
                    </div>
                    <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
                      {formatRelativeTime(item.timestamp)}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-[var(--color-text-muted)] font-mono">
                      {fromInfo?.symbol}{" "}
                      {item.amount.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <span className="text-sm font-bold font-mono text-[var(--color-brand)] group-hover:scale-105 transition-transform">
                      {toInfo?.symbol}{" "}
                      {item.result.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}