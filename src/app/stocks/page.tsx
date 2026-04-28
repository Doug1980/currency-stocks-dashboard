"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { CategoryCarousel } from "@/components/stocks/CategoryCarousel";
import { useStockQuote } from "@/hooks/useStockQuote";
import { CATEGORIES } from "@/lib/stocks";

const TOP_MOVERS_CATEGORY = {
  id: "topmovers" as const,
  name: "Top Movers do Dia",
  icon: "Trophy",
  color: "#B91C1C",
};

export default function StocksPage() {
  const { byCategory, topMovers, loading, error, lastUpdated, refresh } =
    useStockQuote();

  return (
    <main className="min-h-screen bg-[var(--color-bg-base)]">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors font-semibold"
          >
            <ArrowLeft size={18} />
            <span>Voltar</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[var(--color-text-primary)]">
              FX
            </span>
            <span className="text-2xl font-light text-[var(--color-brand)]">
              Dashboard
            </span>
          </div>

          <div className="w-20" />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
              Painel de Mercado
            </h1>
            <p className="text-[var(--color-text-muted)]">
              60 ativos em 5 categorias com cotação ao vivo
            </p>
          </div>

          <div className="flex items-center gap-3">
            {lastUpdated && !loading && (
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                <span
                  className="inline-block rounded-full"
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#10B981",
                    animation: "livePulse 2s infinite",
                  }}
                />
                <span>
                  Atualizado às{" "}
                  <span className="font-mono font-semibold">
                    {lastUpdated.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={refresh}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl hover:border-[var(--color-brand)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
              aria-label="Atualizar cotações"
            >
              <RefreshCw
                size={16}
                className={loading ? "animate-spin" : ""}
              />
              <span>Atualizar</span>
            </button>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-2xl mb-8"
          >
            <AlertCircle
              className="text-red-600 flex-shrink-0 mt-0.5"
              size={20}
            />
            <div>
              <h3 className="font-bold text-red-700 mb-1">
                Erro ao carregar cotações
              </h3>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </motion.div>
        )}

        {loading &&
          Object.values(byCategory).every((arr) => arr.length === 0) && (
            <div className="space-y-10">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse" />
                    <div>
                      <div className="h-6 bg-gray-200 rounded w-40 mb-2 animate-pulse" />
                      <div className="h-3 bg-gray-100 rounded w-20 animate-pulse" />
                    </div>
                  </div>
                  <div className="flex gap-4 overflow-hidden">
                    {[1, 2, 3, 4].map((j) => (
                      <div
                        key={j}
                        className="min-w-[260px] h-48 bg-white rounded-2xl shadow-md border border-gray-100 animate-pulse"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        {!loading &&
          CATEGORIES.filter((c) => c.id !== "topmovers").map((category) => (
            <CategoryCarousel
              key={category.id}
              category={category}
              quotes={
                byCategory[category.id as Exclude<typeof category.id, "topmovers">]
              }
            />
          ))}

        {!loading && (
          <CategoryCarousel
            category={TOP_MOVERS_CATEGORY}
            quotes={topMovers}
            showRanking
            emptyMessage="Nenhum ativo em alta hoje. Mercado em correção."
          />
        )}

        <p className="text-center text-xs text-[var(--color-text-muted)] mt-12">
          Dados fornecidos por Finnhub.io · Cotações com possível atraso de 15
          minutos para ações
          <br />
          Atualização automática a cada 30 segundos · Cripto opera 24/7
        </p>
      </div>
    </main>
  );
}