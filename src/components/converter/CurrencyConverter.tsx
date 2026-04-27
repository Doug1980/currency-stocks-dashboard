"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDownUp, Loader2 } from "lucide-react";
import { CurrencySelector } from "./CurrencySelector";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { getCurrencyByCode } from "@/lib/currencies";
import type { ConversionResult } from "@/types";

interface CurrencyConverterProps {
  /**
   * Conversão a ser pré-carregada (ex: ao clicar no histórico).
   * Quando muda, o conversor atualiza seus campos.
   */
  preset?: ConversionResult | null;
  /**
   * Callback quando uma conversão é confirmada.
   * Usado pelo histórico pra salvar.
   */
  onConvert?: (conversion: Omit<ConversionResult, "timestamp">) => void;
}

export function CurrencyConverter({
  preset,
  onConvert,
}: CurrencyConverterProps) {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BRL");
  const [amount, setAmount] = useState<number>(100);
  const [swapRotation, setSwapRotation] = useState(0);

  const { rate, loading, error, date } = useExchangeRate(fromCurrency, toCurrency);

  const fromInfo = getCurrencyByCode(fromCurrency);
  const toInfo = getCurrencyByCode(toCurrency);

  // Calcula resultado
  const result = rate !== null ? amount * rate : 0;

  // Aplica preset (ao clicar numa conversão do histórico)
  useEffect(() => {
    if (preset) {
      setFromCurrency(preset.from);
      setToCurrency(preset.to);
      setAmount(preset.amount);
    }
  }, [preset]);

  // Salva no histórico quando conversão estabiliza (debounce 800ms)
  useEffect(() => {
    if (!onConvert || rate === null || amount <= 0) return;

    const timer = setTimeout(() => {
      onConvert({
        from: fromCurrency,
        to: toCurrency,
        amount,
        result,
        rate,
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [fromCurrency, toCurrency, amount, rate, result, onConvert]);

  function handleSwap() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setSwapRotation((prev) => prev + 180);
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/[^\d.,]/g, "").replace(",", ".");
    const numericValue = parseFloat(value);
    setAmount(isNaN(numericValue) ? 0 : numericValue);
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
            Conversor de Moedas
          </h2>
          <p className="text-[var(--color-text-muted)]">
            Converta entre 20 moedas globais em tempo real
          </p>
        </div>

        {/* Você tem */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-3">
            <CurrencySelector
              label="Você tem"
              value={fromCurrency}
              onChange={setFromCurrency}
            />
            <div>
              <label className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">
                Valor
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] font-mono font-bold">
                  {fromInfo?.symbol}
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={amount.toLocaleString("pt-BR", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}
                  onChange={handleAmountChange}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-2xl font-bold font-mono text-[var(--color-text-primary)] focus:border-[var(--color-brand)] focus:outline-none transition-colors"
                  placeholder="0,00"
                />
              </div>
            </div>
          </div>

          {/* Botão Swap */}
          <div className="flex justify-center py-2">
            <motion.button
              type="button"
              onClick={handleSwap}
              animate={{ rotate: swapRotation }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 flex items-center justify-center bg-[var(--color-brand)] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Trocar moedas"
            >
              <ArrowDownUp size={20} />
            </motion.button>
          </div>

          {/* Você recebe */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-3">
            <CurrencySelector
              label="Você recebe"
              value={toCurrency}
              onChange={setToCurrency}
            />
            <div>
              <label className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">
                Total
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] font-mono font-bold">
                  {toInfo?.symbol}
                </span>
                <div className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-[var(--color-brand)]/30 rounded-xl text-2xl font-bold font-mono text-[var(--color-brand)] min-h-[60px] flex items-center">
                  {loading ? (
                    <Loader2
                      size={24}
                      className="animate-spin text-[var(--color-brand)]"
                    />
                  ) : error ? (
                    <span className="text-red-500 text-base">Erro</span>
                  ) : (
                    <AnimatedNumber value={result} decimals={2} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Taxa de câmbio */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
              Taxa de câmbio
            </span>
            <span className="font-mono font-bold text-[var(--color-text-primary)]">
              {loading ? (
                "..."
              ) : rate !== null ? (
                <>
                  1 {fromCurrency} ={" "}
                  <span className="text-[var(--color-brand)]">
                    {rate.toLocaleString("pt-BR", {
                      minimumFractionDigits: 4,
                      maximumFractionDigits: 4,
                    })}
                  </span>{" "}
                  {toCurrency}
                </>
              ) : (
                "—"
              )}
            </span>
          </div>
        </div>

        {/* Data de atualização */}
        {date && !loading && !error && (
          <div className="mt-2 flex items-center justify-end gap-1.5 text-xs text-[var(--color-text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-up)] animate-pulse" />
            <span>
              Atualizado em{" "}
              <span className="font-mono font-semibold">
                {new Date(date + "T00:00:00").toLocaleDateString("pt-BR")}
              </span>
            </span>
          </div>
        )}

        {/* Mensagem de status */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              <strong>Erro:</strong> {error}
            </p>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-[var(--color-text-muted)] mt-4">
        Taxas de referência. Valores podem variar conforme a instituição
        financeira.
      </p>
    </div>
  );
}