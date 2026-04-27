import { NextRequest, NextResponse } from "next/server";
import { fetchExchangeRate } from "@/lib/api/frankfurter";

/**
 * Route Handler para conversão de moedas.
 *
 * Funciona como BFF (Backend for Frontend):
 * - Esconde a API externa do cliente
 * - Cacheia respostas (5 minutos)
 * - Padroniza formato de erro
 *
 * @example GET /api/exchange?from=USD&to=BRL
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from")?.toUpperCase();
  const to = searchParams.get("to")?.toUpperCase();

  // Validação dos parâmetros
  if (!from || !to) {
    return NextResponse.json(
      { error: "Parâmetros 'from' e 'to' são obrigatórios" },
      { status: 400 }
    );
  }

  if (from.length !== 3 || to.length !== 3) {
    return NextResponse.json(
      { error: "Códigos de moeda devem ter 3 caracteres (ex: USD, BRL)" },
      { status: 400 }
    );
  }

  try {
    const data = await fetchExchangeRate(from, to);

    return NextResponse.json(data, {
      headers: {
        // Cache no CDN da Vercel (5 min) com revalidação stale-while-revalidate
        "Cache-Control":
          "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("[/api/exchange] Erro:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao buscar taxa de câmbio",
      },
      { status: 500 }
    );
  }
}