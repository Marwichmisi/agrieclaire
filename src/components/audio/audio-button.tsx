"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AudioButtonProps {
  /** Nom du fichier audio, ex. "zone-exces-eau.mp3" */
  file: string;
  label?: string;
  className?: string;
}

export function AudioButton({
  file,
  label = "Écouter le conseil",
  className,
}: AudioButtonProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<"checking" | "ready" | "missing">(
    "checking"
  );
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const url = `/audio/${file}`;
    fetch(url, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        if (res.ok) {
          setStatus("ready");
          const audio = new Audio(url);
          audio.preload = "none";
          audio.onended = () => setPlaying(false);
          audio.onerror = () => {
            setStatus("missing");
            setPlaying(false);
          };
          audioRef.current = audio;
        } else {
          setStatus("missing");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("missing");
      });
    return () => {
      cancelled = true;
      audioRef.current?.pause();
    };
  }, [file]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || status !== "ready") return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      void audio.play().catch(() => setStatus("missing"));
      setPlaying(true);
    }
  };

  if (status === "missing") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground",
          className
        )}
        title="Le message vocal n'est pas encore enregistré"
      >
        <VolumeX className="size-4" />
        Message vocal à venir
      </span>
    );
  }

  return (
    <Button
      type="button"
      variant={playing ? "default" : "outline"}
      size="lg"
      className={cn("gap-2", className)}
      onClick={toggle}
      disabled={status === "checking"}
      aria-label={label}
    >
      {status === "checking" ? (
        <Loader2 className="size-4 animate-spin" />
      ) : playing ? (
        <Volume2 className="size-4 animate-pulse" />
      ) : (
        <Volume2 className="size-4" />
      )}
      {playing ? "Arrêter l'écoute" : label}
    </Button>
  );
}