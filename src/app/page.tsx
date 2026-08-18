import Link from "next/link";
import {
  MapPin,
  ScanLine,
  ClipboardList,
  ArrowRight,
  Drone,
} from "lucide-react";

import { ZONE_FICHES } from "@/lib/zone-data";
import { ZoneFiche } from "@/components/zone/zone-fiche";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden
          style={{
            background:
              "radial-gradient(900px 400px at 85% 20%, #ffe4d1 0%, transparent 60%), radial-gradient(700px 300px at 10% 90%, #fff3e6 0%, transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <Badge className="mb-4 bg-ec-orange text-white">
            ElectroChallenge 2026 · Équipe Orange
          </Badge>
          <h1 className="font-display text-4xl font-bold leading-tight text-balance sm:text-5xl">
            Votre champ vu du ciel,{" "}
            <span className="text-ec-orange">expliqué simplement</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">
            Un drone survole votre parcelle, des cartes sont produites… et
            vous, vous recevez des conseils clairs : où votre maïs manque
            d'eau, où votre manioc risque de pourrir, où réduire l'engrais.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/carte">
                Voir la carte de ma parcelle
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pour-le-jury">
                Les cartes sources (jury)
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Parcelle « essaie » · vol du 13/08/2026 · 2,09 ha en maïs +
            manioc
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-4xl">
          <img
            src="/maps/apercu-parcelle.jpg"
            alt="Aperçu de la carte interactive : orthomosaïque de la parcelle avec ses zones colorées"
            className="w-full rounded-2xl border-4 border-white shadow-xl"
            loading="eager"
          />
          <div className="absolute -bottom-4 left-6 rounded-xl border bg-white p-3 shadow-lg">
            <p className="flex items-center gap-2 text-sm font-bold text-ec-ink">
              <MapPin className="size-4 text-ec-orange" aria-hidden />
              16 zones analysées
            </p>
            <p className="text-xs text-muted-foreground">
              4 situations différentes sur la parcelle
            </p>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-10">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          Comment ça marche&nbsp;?
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Drone,
              title: "1. Un drone photographie",
              text: "Un vol de quelques minutes couvre toute la parcelle : chaque point du champ est photographié au centimètre près.",
            },
            {
              icon: ScanLine,
              title: "2. Les cartes sont analysées",
              text: "Vigueur de la végétation, relief et points d'eau sont croisés pour découper la parcelle en zones homogènes.",
            },
            {
              icon: ClipboardList,
              title: "3. Vous recevez des conseils",
              text: "Chaque zone reçoit un conseil d'action simple, distinct pour le maïs et pour le manioc, avec un message vocal.",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border bg-card p-5 shadow-sm"
            >
              <s.icon className="size-8 text-ec-orange" aria-hidden />
              <h3 className="mt-3 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Les zones */}
      <section className="py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Les 4 situations de votre parcelle
            </h2>
            <p className="mt-2 max-w-2xl text-foreground/80">
              L'analyse a découpé la parcelle en 16 zones, regroupées en 4
              situations. Chaque situation a son conseil — écoutez-le sur
              votre téléphone, directement au champ.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/carte">
              Les voir sur la carte <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="mt-6 space-y-6">
          {ZONE_FICHES.map((fiche) => (
            <ZoneFiche key={fiche.id} fiche={fiche} />
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="my-12 rounded-3xl bg-ec-ink px-6 py-12 text-center text-ec-paper">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          Vous êtes sur le terrain&nbsp;?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-ec-paper/80">
          Ouvrez la carte, touchez une zone colorée : le conseil correspondant
          s'affiche, avec le message vocal à écouter. Aucune carte papier à
          déchiffrer.
        </p>
        <Button asChild size="lg" className="mt-6 bg-ec-orange hover:bg-ec-orange-dark">
          <Link href="/carte">
            Ouvrir la carte interactive <ArrowRight aria-hidden />
          </Link>
        </Button>
      </section>
    </div>
  );
}