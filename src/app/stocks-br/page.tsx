"use client";

import { motion } from "framer-motion";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { CategoryCarousel } from "@/components/stocks/CategoryCarousel";
import { useBrazilianStocks } from "@/hooks/useBrazilianStocks";
import { BR_CATEGORIES } from "@/lib/stocks-br";

const TOP_MOVERS_BR_CATEGORY = {
  id: "topmovers" as const,
  name: "Top Movers do Dia 🇧🇷",
  icon: "Trophy",
  color: "#16A34A",
};

export default function StocksBrPage() {
  const { byCategory, topMovers, loading, error, lastUpdated, refresh } =
    useBrazilianStocks();

  return (
    <main className="min-h-screen bg-[var(--color-bg-base)] has-orbs bg-orbs-br">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🇧🇷</span>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
                Mercado Nacional
              </h1>
            </div>
            <p className="text-[var(--color-text-muted)]">
              60 ações da B3 em 5 setores + Top Movers em Reais (BRL)
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
                    backgroundColor: "#16A34A",
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
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
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
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
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
          BR_CATEGORIES.filter((c) => c.id !== "topmovers").map((category) => (
            <CategoryCarousel
              key={category.id}
              category={category}
              quotes={
                byCategory[
                  category.id as Exclude<typeof category.id, "topmovers">
                ]
              }
              currency="BRL"
            />
          ))}

       {!loading && (
          <CategoryCarousel
            category={TOP_MOVERS_BR_CATEGORY}
            quotes={topMovers}
            showRanking
            emptyMessage="Nenhum ativo brasileiro em alta hoje. Mercado em correção."
            currency="BRL"
          />
        )}

        <p className="text-center text-xs text-[var(--color-text-muted)] mt-12">
          Dados fornecidos por brapi.dev · Cotações da B3 com possível atraso de
          15 minutos
          <br />
          Atualização automática a cada 90 segundos · Preços em Reais (BRL)
        </p>
      </div>
    </main>
  );
}