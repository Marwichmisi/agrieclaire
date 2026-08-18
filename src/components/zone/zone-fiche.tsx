"use client";

import { Wheat, Sprout, Lightbulb, ExternalLink } from "lucide-react";

import type { ZoneFiche } from "@/lib/zone-data";
import { formatHa } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AudioButton } from "@/components/audio/audio-button";
import type { ZoneClick } from "@/components/map/agri-map";

interface ZoneFicheProps {
  fiche: ZoneFiche;
  zone?: ZoneClick | null;
}

export function ZoneFiche({ fiche, zone }: ZoneFicheProps) {
  return (
    <article
      id={`fiche-${fiche.id}`}
      className="rounded-2xl border bg-card shadow-sm"
      style={{ borderTop: `6px solid ${fiche.couleur}` }}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 p-5 pb-3">
        <div>
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <Badge
              variant={
                fiche.id === "exces-eau"
                  ? "water"
                  : fiche.id === "stress-hydrique"
                    ? "dry"
                    : fiche.id === "vigueur-moyenne"
                      ? "mid"
                      : "strong"
              }
            >
              {fiche.statut}
            </Badge>
            {zone && (
              <span className="text-xs font-semibold text-muted-foreground">
                Zone n°{zone.fid} · {formatHa(zone.surfaceHa)}
              </span>
            )}
          </div>
          <h3 className="font-display text-2xl font-bold">{fiche.nomCourt}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {fiche.nomTechnique}
          </p>
        </div>
        <AudioButton file={fiche.audioFile} />
      </header>

      <div className="space-y-4 px-5 pb-5">
        <p className="text-sm leading-relaxed text-foreground/90">
          {fiche.explication}
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-ec-mid-soft/60 p-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-ec-mid">
              <Wheat className="size-4" aria-hidden />
              {fiche.mais.titre}
            </p>
            <ul className="space-y-1.5 text-sm leading-snug text-foreground/90">
              {fiche.mais.points.map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ec-mid" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-ec-dry-soft/70 p-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-ec-dry">
              <Sprout className="size-4" aria-hidden />
              {fiche.manioc.titre}
            </p>
            <ul className="space-y-1.5 text-sm leading-snug text-foreground/90">
              {fiche.manioc.points.map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ec-dry" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {fiche.alternative && (
          <div className="flex gap-3 rounded-xl border border-ec-orange/25 bg-ec-orange-soft/60 p-4">
            <Lightbulb
              className="mt-0.5 size-5 shrink-0 text-ec-orange"
              aria-hidden
            />
            <div className="text-sm">
              <p className="font-bold text-ec-orange-dark">
                Pour la prochaine saison : {fiche.alternative.culture}
              </p>
              <p className="mt-1 leading-snug text-foreground/90">
                {fiche.alternative.raison}
              </p>
            </div>
          </div>
        )}

        <details className="group">
          <summary className="cursor-pointer text-xs font-semibold text-muted-foreground hover:text-foreground">
            Sources utilisées pour ce conseil
          </summary>
          <ul className="mt-2 space-y-1">
            {fiche.sources.map((s) =>
              s.url && s.url !== "#" ? (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground underline-offset-2 hover:text-ec-orange-dark hover:underline"
                  >
                    <ExternalLink className="size-3" aria-hidden />
                    {s.label}
                  </a>
                </li>
              ) : (
                <li key={s.label} className="text-xs text-muted-foreground">
                  {s.label}
                </li>
              )
            )}
          </ul>
        </details>
      </div>
    </article>
  );
}