import Link from "next/link";
import { ArrowRight, DollarSign } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center section-dark">
      <div className="section-content w-full">
        <div className="flex items-center justify-between gap-12">

          {/* Texto à esquerda */}
          <div className="max-w-3xl animate-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <DollarSign size={20} className="text-[var(--color-up)] animate-pulse" />
              <span className="text-sm font-medium uppercase tracking-wider text-white">
                Cotações em tempo real
              </span>
            </div>

            <h1 className="heading-xl mb-6 text-white">FX Finance</h1>

            <p className="text-xl md:text-2xl font-light mb-12 opacity-90 text-white max-w-2xl">
              Conversão de moedas, mercado internacional e ações da B3 com
              dados ao vivo das fontes oficiais.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/converter" className="btn btn-primary">
                Comece agora <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Logo à direita */}
          <div className="hidden md:flex items-center justify-center flex-shrink-0">
            <img
              src="/finace_logo.svg"
              alt="Finance Logo"
              className="w-[400px] h-[400px] object-contain"
            />
          </div>

        </div>
      </div>
    </main>
  );
}