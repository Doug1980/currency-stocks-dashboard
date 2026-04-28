"use client";

import { useState } from "react";
import Image from "next/image";

interface CurrencyFlagProps {
  countryCode: string;
  emoji: string;
  size?: 16 | 20 | 24 | 32 | 40 | 48;
  alt?: string;
  className?: string;
}

export function CurrencyFlag({
  countryCode,
  emoji,
  size = 24,
  alt,
  className = "",
}: CurrencyFlagProps) {
  const [hasError, setHasError] = useState(false);

  const width = size;
  const height = Math.round((size * 3) / 4);
  const flagcdnSize = `${width}x${height}`;

  if (hasError) {
    return (
      <span
        className={`inline-block leading-none ${className}`}
        style={{ fontSize: `${size}px` }}
        role="img"
        aria-label={alt}
      >
        {emoji}
      </span>
    );
  }

  return (
    <Image
      src={`https://flagcdn.com/${flagcdnSize}/${countryCode}.png`}
      alt={alt ?? `Bandeira ${countryCode.toUpperCase()}`}
      width={width}
      height={height}
      className={`inline-block rounded-sm ${className}`}
      onError={() => setHasError(true)}
      unoptimized
    />
  );
}