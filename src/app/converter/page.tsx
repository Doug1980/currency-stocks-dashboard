"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CurrencyConverter } from "@/components/converter/CurrencyConverter";

export default function ConverterPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-base)]">
      {/* Header simples */}
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

          <div className="w-20" /> {/* spacer pra balancear */}
        </div>
      </header>

      {/* Conteúdo */}
      <div className="py-16 px-6">
        <CurrencyConverter />
      </div>
    </main>
  );
}