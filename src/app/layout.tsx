import type { Metadata, Viewport } from "next";
import "@fontsource-variable/sora";
import "@fontsource-variable/inter";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AgriÉclair — Votre parcelle vue du ciel, expliquée simplement",
    template: "%s · AgriÉclair",
  },
  description:
    "AgriÉclair traduit les cartes drone (vigueur, relief, zonage) en conseils simples, culture par culture, pour les agriculteurs. Projet Équipe Orange — ElectroChallenge 2026.",
  keywords: [
    "AgriÉclair",
    "agriculture de précision",
    "drone",
    "Bénin",
    "maïs",
    "manioc",
    "carte de zonage",
    "ElectroChallenge 2026",
  ],
  authors: [{ name: "Équipe Orange — ElectroChallenge 2026" }],
  openGraph: {
    title: "AgriÉclair — Votre parcelle vue du ciel, expliquée simplement",
    description:
      "La carte de zonage de votre parcelle, interprétée en conseils d'action simples pour le maïs et le manioc.",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: "#ff6b00",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}