import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center section-dark">
      <div className="section-content">
        <div className="max-w-3xl mx-auto text-center animate-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--color-up)] animate-pulse" />
            <span className="text-sm font-medium uppercase tracking-wider text-white">
              Cotações em tempo real
            </span>
          </div>

          <h1 className="heading-xl mb-6 text-white">FX Dashboard</h1>

          <p className="text-xl md:text-2xl font-light mb-12 opacity-90 text-white max-w-2xl mx-auto">
            Conversão de moedas e cotações de ações globais com dados
            atualizados direto das fontes oficiais.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/converter" className="btn btn-primary">
              Converter Moedas <ArrowRight size={18} />
            </Link>
            <Link href="/stocks" className="btn btn-secondary">
              <TrendingUp size={18} /> Ver Ações
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}