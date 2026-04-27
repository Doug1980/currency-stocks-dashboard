"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
}

/**
 * Componente que anima a contagem de um número.
 * Vai do valor anterior até o novo valor com easing suave.
 */
export function AnimatedNumber({
  value,
  decimals = 2,
  duration = 1,
  className = "",
}: AnimatedNumberProps) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 80,
    damping: 18,
    duration: duration * 1000,
  });

  const display = useTransform(spring, (current) =>
    current.toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );

  const [rendered, setRendered] = useState("0");

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    return display.on("change", (latest) => setRendered(latest));
  }, [display]);

  return <motion.span className={className}>{rendered}</motion.span>;
}
