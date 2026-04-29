"use client";

import { useState, useCallback, useEffect } from "react";

type Status = "idle" | "loading" | "success";

interface UseRefreshStatusResult {
  status: Status;
  trigger: () => void;
}

const SUCCESS_DURATION = 1500; // 1.5s mostrando "Atualizado!"

/**
 * Hook que gerencia estados visuais de um botão refresh.
 *
 * Fluxo:
 * - idle → click → loading → (request termina) → success → (1.5s) → idle
 *
 * @param isLoading - flag externo (do hook de fetch). Quando vira false, dispara success.
 */
export function useRefreshStatus(isLoading: boolean): UseRefreshStatusResult {
  const [status, setStatus] = useState<Status>("idle");
  const [wasTriggered, setWasTriggered] = useState(false);

  // Quando o usuário clica no botão
  const trigger = useCallback(() => {
    setWasTriggered(true);
    setStatus("loading");
  }, []);

  // Detecta quando o loading externo termina (request voltou)
  useEffect(() => {
    if (wasTriggered && !isLoading && status === "loading") {
      setStatus("success");
      setWasTriggered(false);

      // Volta pra idle após 1.5s
      const timer = setTimeout(() => {
        setStatus("idle");
      }, SUCCESS_DURATION);

      return () => clearTimeout(timer);
    }
  }, [isLoading, wasTriggered, status]);

  return { status, trigger };
}