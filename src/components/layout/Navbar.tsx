"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight, Globe, Flag } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_LINKS: NavLink[] = [
  {
    href: "/converter",
    label: "Conversor",
    icon: <ArrowLeftRight size={16} />,
  },
  {
    href: "/stocks",
    label: "Internacional",
    icon: <Globe size={16} />,
  },
  {
    href: "/stocks-br",
    label: "Nacional",
    icon: <Flag size={16} />,
  },
];

interface NavbarProps {
  /** Se true, o navbar tem fundo claro com borda. Se false, transparente sobre fundo escuro. */
  variant?: "light" | "dark";
}

/**
 * Navbar sticky com navegação direta entre as páginas do app.
 *
 * - Logo "FX Finance" clicável volta pra home
 * - 3 links: Conversor, Internacional 🌎, Nacional 🇧🇷
 * - Link ativo recebe estilo destacado
 * - 2 variantes: light (padrão) e dark (sobre seções escuras)
 */
export function Navbar({ variant = "light" }: NavbarProps) {
  const pathname = usePathname();

  const isLight = variant === "light";

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md border-b ${
        isLight
          ? "bg-white/80 border-gray-100"
          : "bg-black/30 border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0 group"
          aria-label="Ir para home"
        >
          <span
            className={`text-2xl font-bold tracking-tight transition-colors ${
              isLight
                ? "text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)]"
                : "text-white"
            }`}
          >
            FX
          </span>
          <span
            className={`text-2xl font-light ${
              isLight ? "text-[var(--color-brand)]" : "text-[var(--color-brand-light)]"
            }`}
          >
            Finance
          </span>
        </Link>

        {/* Navegação */}
        <nav className="flex items-center gap-1 md:gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? isLight
                      ? "bg-[var(--color-brand)] text-white shadow-md"
                      : "bg-white text-[var(--color-brand)]"
                    : isLight
                    ? "text-[var(--color-text-secondary)] hover:bg-gray-100"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.icon}
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}