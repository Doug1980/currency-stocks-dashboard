import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar variant="dark" />
      <main className="min-h-[calc(100vh-72px)] flex items-center section-dark">
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
              Conversão de moedas, mercado internacional e ações da B3 com
              dados ao vivo das fontes oficiais.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/converter" className="btn btn-primary">
                Converter Moedas <ArrowRight size={18} />
              </Link>
              <Link href="/stocks" className="btn btn-secondary">
                <TrendingUp size={18} /> Mercado Internacional 🌎
              </Link>
              <Link href="/stocks-br" className="btn btn-secondary">
                <TrendingUp size={18} /> Mercado Nacional 🇧🇷
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}