"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { StockCard } from "@/components/stocks/StockCard";
import { useStockQuote } from "@/hooks/useStockQuote";

export default function StocksPage() {
  const { quotes, loading, error, lastUpdated, refresh } = useStockQuote();

  return (
    <main className="min-h-screen bg-[var(--color-bg-base)]">
      {/* Header sticky */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
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

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Título e controles */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
              Painel de Ações
            </h1>
            <p className="text-[var(--color-text-muted)]">
              Cotações em tempo real das 8 maiores empresas de tecnologia
            </p>
          </div>

          {/* Status + botão refresh */}
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

        {/* Estado de erro */}
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

        {/* Estado de loading inicial (sem dados ainda) */}
        {loading && quotes.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 animate-pulse"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="h-7 bg-gray-200 rounded w-20 mb-2" />
                    <div className="h-4 bg-gray-100 rounded w-32" />
                  </div>
                  <div className="h-7 bg-gray-200 rounded w-16" />
                </div>
                <div className="h-9 bg-gray-200 rounded mb-4" />
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                  <div className="h-8 bg-gray-100 rounded" />
                  <div className="h-8 bg-gray-100 rounded" />
                  <div className="h-8 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid de cards */}
        {quotes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {quotes.map((quote, index) => (
              <StockCard key={quote.symbol} quote={quote} index={index} />
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-xs text-[var(--color-text-muted)] mt-8">
          Dados fornecidos por Finnhub.io. Cotações com possível atraso de 15
          minutos.
          <br />
          Atualização automática a cada 30 segundos.
        </p>
      </div>
    </main>
  );
}