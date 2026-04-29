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
  /** Conversão a ser pré-carregada (ex: ao clicar no histórico). */
  preset?: ConversionResult | null;
  /** Callback quando uma conversão é confirmada. */
  onConvert?: (conversion: Omit<ConversionResult, "timestamp">) => void;
}

/**
 * Formata um número pro padrão brasileiro com vírgula.
 * Ex: 100.5 → "100,50" / 1234.56 → "1.234,56"
 */
function formatBR(value: number): string {
  if (value === 0) return "";
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Converte string do usuário pra número.
 * Aceita "100", "100.50", "100,50", "1.234,56".
 */
function parseUserInput(input: string): number {
  if (!input) return 0;

  // Remove tudo exceto dígitos, ponto e vírgula
  const cleaned = input.replace(/[^\d.,]/g, "");

  // Se tem múltiplos separadores (ex: "1.234,56"), trata como BR
  const lastComma = cleaned.lastIndexOf(",");
  const lastDot = cleaned.lastIndexOf(".");

  let normalized: string;

  if (lastComma > lastDot) {
    // Vírgula é o decimal (formato BR): remove pontos, troca vírgula por ponto
    normalized = cleaned.replace(/\./g, "").replace(",", ".");
  } else if (lastDot > lastComma) {
    // Ponto é o decimal (formato US): remove vírgulas
    normalized = cleaned.replace(/,/g, "");
  } else {
    // Sem decimal — só dígitos
    normalized = cleaned;
  }

  const num = parseFloat(normalized);
  return isNaN(num) ? 0 : num;
}

export function CurrencyConverter({
  preset,
  onConvert,
}: CurrencyConverterProps) {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BRL");

  // Estado dual: input visual (string) + valor numérico (cálculo)
  const [amountInput, setAmountInput] = useState("100,00");
  const [amount, setAmount] = useState<number>(100);

  const [swapRotation, setSwapRotation] = useState(0);

  const { rate, loading, error, date } = useExchangeRate(
    fromCurrency,
    toCurrency
  );

  const fromInfo = getCurrencyByCode(fromCurrency);
  const toInfo = getCurrencyByCode(toCurrency);

  const result = rate !== null ? amount * rate : 0;

  // Aplica preset (ao clicar numa conversão do histórico)
  useEffect(() => {
    if (preset) {
      setFromCurrency(preset.from);
      setToCurrency(preset.to);
      setAmount(preset.amount);
      setAmountInput(formatBR(preset.amount));
    }
  }, [preset]);

  // Salva no histórico (debounce 800ms)
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

  /**
   * Durante a digitação: preserva exatamente o que o usuário escreve
   * (sem reformatação) pra não interromper o fluxo.
   */
  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;

    // Filtra: só aceita dígitos, ponto e vírgula
    const filtered = raw.replace(/[^\d.,]/g, "");

    setAmountInput(filtered);
    setAmount(parseUserInput(filtered));
  }

  /**
   * Ao perder foco: formata o valor pro padrão BR (com vírgula e 2 casas).
   * Ex: "100.5" → "100,50" / "1234,5" → "1.234,50"
   */
  function handleAmountBlur() {
    const num = parseUserInput(amountInput);
    setAmountInput(num > 0 ? formatBR(num) : "");
    setAmount(num);
  }

  /**
   * Ao focar: seleciona tudo pra facilitar substituição
   */
  function handleAmountFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.target.select();
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

        {/* Moeda atual */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-3">
            <CurrencySelector
              label="Moeda atual"
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
                  value={amountInput}
                  onChange={handleAmountChange}
                  onBlur={handleAmountBlur}
                  onFocus={handleAmountFocus}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-2xl font-bold font-mono text-[var(--color-text-primary)] focus:border-[var(--color-brand)] focus:outline-none transition-colors"
                  placeholder="0,00"
                  aria-label="Valor a converter"
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

          {/* Conversão da moeda */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-3">
            <CurrencySelector
              label="Conversão da moeda"
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
          <div className="mt-3 flex items-center justify-end gap-2 text-xs text-[var(--color-text-muted)]">
            <span
              className="inline-block rounded-full"
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#10B981",
                boxShadow: "0 0 0 0 rgba(16, 185, 129, 0.7)",
                animation: "livePulse 2s infinite",
              }}
            />
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