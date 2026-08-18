import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-ec-orange/20 bg-ec-ink text-ec-paper">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <p className="flex items-center gap-2 font-display text-lg font-bold">
              <Zap className="size-5 fill-ec-orange text-ec-orange" aria-hidden />
              Agri<span className="text-ec-orange">Éclair</span>
            </p>
            <p className="mt-2 text-sm text-ec-paper/70">
              Les cartes drone traduites en conseils simples pour votre champ.
              Projet réalisé par l'Équipe Orange dans le cadre de
              l'ElectroChallenge 2026 — Vision Bénin 2060 « Alafia ».
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-ec-orange">
              Accueil
            </Link>
            <Link href="/carte" className="hover:text-ec-orange">
              Carte interactive
            </Link>
            <Link href="/pour-le-jury" className="hover:text-ec-orange">
              Cartes sources et méthode
            </Link>
          </nav>
        </div>
        <p className="mt-8 border-t border-ec-paper/10 pt-4 text-xs text-ec-paper/50">
          Vol drone du 13/08/2026 — parcelle « essaie », Bénin. Les cartes
          décrivent l'état de la parcelle à cette date : la carte guide, le
          terrain décide.
        </p>
      </div>
    </footer>
  );
}