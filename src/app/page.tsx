import { ArrowRight, TrendingUp } from "lucide-react";
import { CurrencyConverter } from "@/components/converter/CurrencyConverter";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="section section-dark">
        <div className="section-content flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="animate-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--color-up)] animate-pulse" />
              <span className="text-sm font-medium uppercase tracking-wider">
                Em desenvolvimento
              </span>
            </div>

            <h1 className="heading-xl mb-4">FX Dashboard</h1>
            <p className="text-xl md:text-2xl font-light mb-8 opacity-90">
              Conversor de moedas e painel de ações em tempo real
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#converter" className="btn btn-primary">
                Começar agora <ArrowRight size={18} />
              </a>
            </div>
          </div>

          <div className="animate-right hidden md:block">
            <div className="relative">
              <div className="card-glass w-80 p-8">
                <div className="text-sm uppercase tracking-wider opacity-70 mb-2">
                  USD para BRL
                </div>
                <div className="data-number text-5xl mb-4">5.4827</div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp size={16} className="data-up" />
                  <span className="data-up data-number">+0.42%</span>
                  <span className="opacity-60">hoje</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONVERSOR */}
      <section id="converter" className="section section-light">
        <div className="section-content">
          <CurrencyConverter />
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-8"
        style={{ backgroundColor: "var(--color-brand-dark)" }}
      >
        <div className="section-content text-center text-white/80 text-sm">
          © 2026 Douglas Salazar · FX Dashboard
        </div>
      </footer>
    </main>
  );
}