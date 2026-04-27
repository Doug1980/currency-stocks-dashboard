"use client";

import { useState, useEffect } from "react";
import type { ConversionResult } from "@/types";

const STORAGE_KEY = "fx-dashboard-history";
const MAX_HISTORY_ITEMS = 5;

interface UseConversionHistoryResult {
  history: ConversionResult[];
  addConversion: (conversion: Omit<ConversionResult, "timestamp">) => void;
  clearHistory: () => void;
  isHydrated: boolean;
}

/**
 * Hook que gerencia o histórico de conversões em localStorage.
 *
 * - Mantém apenas as últimas 5 conversões
 * - Persiste entre sessões (sobrevive a F5/reload)
 * - SSR-safe (usa flag isHydrated pra evitar mismatch de hidratação)
 */
export function useConversionHistory(): UseConversionHistoryResult {
  const [history, setHistory] = useState<ConversionResult[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Carrega do localStorage ao montar (apenas no client)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ConversionResult[];
        setHistory(parsed);
      }
    } catch (err) {
      console.warn("Erro ao carregar histórico:", err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persiste no localStorage sempre que o histórico muda
  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (err) {
      console.warn("Erro ao salvar histórico:", err);
    }
  }, [history, isHydrated]);

  function addConversion(
    conversion: Omit<ConversionResult, "timestamp">
  ): void {
    const newEntry: ConversionResult = {
      ...conversion,
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      // Evita duplicatas consecutivas idênticas
      const isDuplicate =
        prev[0]?.from === newEntry.from &&
        prev[0]?.to === newEntry.to &&
        prev[0]?.amount === newEntry.amount;

      if (isDuplicate) return prev;

      // Mantém apenas as últimas N conversões
      return [newEntry, ...prev].slice(0, MAX_HISTORY_ITEMS);
    });
  }

  function clearHistory(): void {
    setHistory([]);
  }

  return { history, addConversion, clearHistory, isHydrated };
}