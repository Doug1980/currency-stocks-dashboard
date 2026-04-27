import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FX Dashboard | Conversor de Moedas & Ações",
  description:
    "Conversor de moedas em tempo real e painel de ações com dados de mercado atualizados. Construído com Next.js, TypeScript e Tailwind CSS.",
  keywords: ["conversor de moedas", "ações", "câmbio", "bolsa", "fintech"],
  authors: [{ name: "Douglas Salazar" }],
  openGraph: {
    title: "FX Dashboard",
    description: "Conversor de moedas e painel de ações em tempo real",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}