import { ArrowRight, TrendingUp, Wallet, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <main>
      <section className="section section-dark">
        <div className="section-content flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="animate-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--color-up)] animate-pulse" />
              <span className="text-sm font-medium uppercase tracking-wider">Em desenvolvimento</span>
            </div>
            <h1 className="heading-xl mb-4">FX Dashboard</h1>
            <p className="text-xl md:text-2xl font-light mb-8 opacity-90">Conversor de moedas e painel de ações em tempo real</p>
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-primary">Começar agora <ArrowRight size={18} /></button>
              <button className="btn btn-secondary">Ver no GitHub</button>
            </div>
          </div>
          <div className="animate-right hidden md:block">
            <div className="relative">
              <div className="card-glass w-80 p-8">
                <div className="text-sm uppercase tracking-wider opacity-70 mb-2">USD para BRL</div>
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

      <section className="section section-light">
        <div className="section-content text-center">
          <h2 className="heading-lg">Sobre o projeto</h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            FX Dashboard é uma aplicação completa de conversão de moedas e acompanhamento de ações em tempo real.
            Construído com Next.js 15, TypeScript e Tailwind CSS, integra APIs públicas do Banco Central Europeu
            (Frankfurter) e Finnhub para entregar dados confiáveis e atualizados em uma interface elegante e responsiva.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="card-light">
              <Wallet className="mx-auto mb-4 text-[var(--color-brand)]" size={40} />
              <h3 className="font-bold text-xl mb-2">20 Moedas</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Conversão entre as principais moedas globais</p>
            </div>
            <div className="card-light">
              <BarChart3 className="mx-auto mb-4 text-[var(--color-brand)]" size={40} />
              <h3 className="font-bold text-xl mb-2">Ações ao Vivo</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Cotações de empresas globais com atualização automática</p>
            </div>
            <div className="card-light">
              <TrendingUp className="mx-auto mb-4 text-[var(--color-brand)]" size={40} />
              <h3 className="font-bold text-xl mb-2">Tempo Real</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Dados atualizados direto das APIs oficiais</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-brand">
        <div className="section-content text-center">
          <h2 className="heading-lg">Roadmap do Projeto</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-12">Construção iterativa em 6 etapas, cada uma documentada e versionada</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-glass">
              <div className="text-sm uppercase tracking-wider opacity-70 mb-2">Etapa 1</div>
              <h3 className="font-bold text-xl mb-2">Setup Inicial</h3>
              <p className="text-sm opacity-80">Next.js 15, TypeScript, Tailwind v4 e identidade visual</p>
            </div>
            <div className="card-glass">
              <div className="text-sm uppercase tracking-wider opacity-70 mb-2">Etapa 2</div>
              <h3 className="font-bold text-xl mb-2">Conversor de Moedas</h3>
              <p className="text-sm opacity-80">20 moedas, swap animado e histórico local</p>
            </div>
            <div className="card-glass">
              <div className="text-sm uppercase tracking-wider opacity-70 mb-2">Etapa 3</div>
              <h3 className="font-bold text-xl mb-2">API Routes (BFF)</h3>
              <p className="text-sm opacity-80">Backend for Frontend com Frankfurter e Finnhub</p>
            </div>
            <div className="card-glass">
              <div className="text-sm uppercase tracking-wider opacity-70 mb-2">Etapa 4</div>
              <h3 className="font-bold text-xl mb-2">Painel de Ações</h3>
              <p className="text-sm opacity-80">Cards interativos com polling em tempo real</p>
            </div>
            <div className="card-glass">
              <div className="text-sm uppercase tracking-wider opacity-70 mb-2">Etapa 5</div>
              <h3 className="font-bold text-xl mb-2">Polimento</h3>
              <p className="text-sm opacity-80">Skeletons, error states e responsividade total</p>
            </div>
            <div className="card-glass">
              <div className="text-sm uppercase tracking-wider opacity-70 mb-2">Etapa 6</div>
              <h3 className="font-bold text-xl mb-2">Deploy</h3>
              <p className="text-sm opacity-80">Publicação na Vercel com CI/CD automático</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8" style={{ backgroundColor: "var(--color-brand-dark)" }}>
        <div className="section-content flex flex-col md:flex-row items-center justify-between gap-4 text-white/80 text-sm">
          <span>© 2026 Douglas Salazar · FX Dashboard</span>
          <div className="flex gap-6">
            <a href="https://github.com/Doug1980/currency-stocks-dashboard" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-80 transition-opacity">
              GitHub
            </a>
            <a href="#" className="hover:opacity-100 opacity-80 transition-opacity">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}