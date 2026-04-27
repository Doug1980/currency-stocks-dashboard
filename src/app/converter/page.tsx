"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CurrencyConverter } from "@/components/converter/CurrencyConverter";
import { ConversionHistory } from "@/components/converter/ConversionHistory";
import { useConversionHistory } from "@/hooks/useConversionHistory";
import type { ConversionResult } from "@/types";

export default function ConverterPage() {
  const { history, addConversion, clearHistory, isHydrated } =
    useConversionHistory();
  const [preset, setPreset] = useState<ConversionResult | null>(null);

  function handleSelectFromHistory(conversion: ConversionResult) {
    // Cria nova referência pra forçar re-render mesmo se for igual ao anterior
    setPreset({ ...conversion, timestamp: Date.now() });

    // Scroll suave pro topo no mobile
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-base)]">
      {/* Header */}
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

      {/* Conteúdo */}
      <div className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            {/* Coluna principal: conversor */}
            <div>
              <CurrencyConverter
                preset={preset}
                onConvert={addConversion}
              />
            </div>

            {/* Coluna lateral: histórico */}
            <aside>
              <div className="lg:sticky lg:top-24">
                <ConversionHistory
                  history={history}
                  onSelect={handleSelectFromHistory}
                  onClear={clearHistory}
                  isHydrated={isHydrated}
                />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}