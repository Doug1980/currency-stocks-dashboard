"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Bitcoin,
  Cpu,
  Landmark,
  ShoppingBag,
  HeartPulse,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { StockCard } from "./StockCard";
import type { StockQuote, StockCategory } from "@/types";

/**
 * Mapa de nome do ícone (string) para componente Lucide.
 * Usado nas categorias definidas em CATEGORIES.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  Bitcoin,
  Cpu,
  Landmark,
  ShoppingBag,
  HeartPulse,
  Trophy,
};

interface CategoryCarouselProps {
  /** Categoria a ser exibida (define ícone, nome, cor) */
  category: StockCategory | null;
  /** Cotações a serem renderizadas */
  quotes: StockQuote[];
  /** Modo Top Movers — ativa ranking nos cards */
  showRanking?: boolean;
  /** Mensagem custom para estado vazio */
  emptyMessage?: string;
}

/**
 * Carrossel horizontal de cards de cotação.
 *
 * - Scroll horizontal suave com setas de navegação
 * - Suporte nativo a swipe touch (mobile)
 * - Setas desabilitam quando chegam aos limites
 * - Header com ícone colorido + nome + contador
 */
export function CategoryCarousel({
  category,
  quotes,
  showRanking = false,
  emptyMessage = "Nenhum ativo disponível",
}: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Atualiza estado das setas baseado na posição do scroll
  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - 5
    );
  }

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [quotes]);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = 280; // approx. card + gap
    const offset = direction === "left" ? -cardWidth * 2 : cardWidth * 2;

    el.scrollBy({ left: offset, behavior: "smooth" });
  }

  if (!category) return null;

  const Icon = ICON_MAP[category.icon] ?? Trophy;
  const isEmpty = quotes.length === 0;

  return (
    <section className="mb-10">
      {/* Header da categoria */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Ícone colorido */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
            style={{ backgroundColor: category.color }}
          >
            <Icon size={20} />
          </div>

          {/* Nome + contador */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] leading-tight">
              {category.name}
            </h2>
            <p className="text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-wider">
              {quotes.length} {quotes.length === 1 ? "ativo" : "ativos"}
            </p>
          </div>
        </div>

        {/* Setas de navegação */}
        {!isEmpty && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label={`Rolar ${category.name} para esquerda`}
              className="w-10 h-10 flex items-center justify-center bg-white border-2 border-gray-200 rounded-full hover:border-[var(--color-brand)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label={`Rolar ${category.name} para direita`}
              className="w-10 h-10 flex items-center justify-center bg-white border-2 border-gray-200 rounded-full hover:border-[var(--color-brand)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Estado vazio */}
      {isEmpty ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center"
        >
          <p className="text-sm text-[var(--color-text-muted)]">
            {emptyMessage}
          </p>
        </motion.div>
      ) : (
        /* Container do scroll horizontal */
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scroll-smooth snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {quotes.map((quote, index) => (
            <div
              key={quote.symbol}
              className="snap-start flex-shrink-0"
            >
              <StockCard
                quote={quote}
                index={index}
                rank={showRanking ? index + 1 : undefined}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}