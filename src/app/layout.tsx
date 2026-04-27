import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

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
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
