export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent-up)] animate-pulse" />
          <span className="text-sm text-[var(--color-text-secondary)]">
            Setup concluído
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="text-gradient">FX</span>{" "}
          <span className="text-gradient-accent">Dashboard</span>
        </h1>

        <p className="text-lg text-[var(--color-text-secondary)] max-w-lg mx-auto">
          Conversor de moedas e painel de ações em tempo real.
          Construído com Next.js, TypeScript e Tailwind CSS.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <div className="px-4 py-2 rounded-lg glass glass-hover">
            <span className="text-sm font-mono text-[var(--color-text-muted)]">
              Etapa 1/6 ✓
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}