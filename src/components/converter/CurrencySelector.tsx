"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import {
  CURRENCIES,
  filterCurrencies,
  getCurrencyByCode,
} from "@/lib/currencies";
import type { Currency } from "@/types";
import { CurrencyFlag } from "@/components/currency/CurrencyFlag";

interface CurrencySelectorProps {
  value: string;
  onChange: (code: string) => void;
  label?: string;
  disabled?: boolean;
}

/**
 * Dropdown de seleção de moeda com bandeira, código, nome e busca.
 * Anima abertura/fechamento com Framer Motion.
 */
export function CurrencySelector({
  value,
  onChange,
  label,
  disabled = false,
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selected = getCurrencyByCode(value);
  const filtered = filterCurrencies(search);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Foca no input de busca ao abrir
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  function handleSelect(currency: Currency) {
    onChange(currency.code);
    setIsOpen(false);
    setSearch("");
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-[var(--color-brand)] focus:border-[var(--color-brand)] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
         <div className="flex items-center gap-3">
          {selected && (
            <CurrencyFlag
              countryCode={selected.countryCode}
              emoji={selected.flag}
              size={32}
              alt={`Bandeira ${selected.code}`}
            />
          )}
          <div className="text-left">
            <div className="font-bold text-[var(--color-text-primary)]">
              {selected?.code}
            </div>
            <div className="text-xs text-[var(--color-text-muted)]">
              {selected?.name}
            </div>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-[var(--color-text-muted)] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-full bg-white border-2 border-gray-200 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar moeda..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]/20 focus:bg-white"
                />
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">
                  Nenhuma moeda encontrada
                </div>
              ) : (
                filtered.map((currency) => {
                  const isActive = currency.code === value;
                  return (
                    <button
                      key={currency.code}
                      type="button"
                      onClick={() => handleSelect(currency)}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left ${
                        isActive ? "bg-red-50" : ""
                      }`}
                    >
                      <CurrencyFlag
                        countryCode={currency.countryCode}
                        emoji={currency.flag}
                        size={32}
                        alt={`Bandeira ${currency.code}`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-[var(--color-text-primary)]">
                          {currency.code}
                        </div>
                        <div className="text-xs text-[var(--color-text-muted)] truncate">
                          {currency.name}
                        </div>
                      </div>
                      {isActive && (
                        <span className="text-[var(--color-brand)] text-xs font-bold">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}