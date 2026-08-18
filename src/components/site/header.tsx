"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";

import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/carte", label: "Ma parcelle" },
  { href: "/pour-le-jury", label: "Pour le jury" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-[1100] border-b border-ec-orange/20 bg-ec-paper/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-ec-orange text-white shadow-sm">
            <Zap className="size-5 fill-white" aria-hidden />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Agri<span className="text-ec-orange">Éclair</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-semibold transition-colors",
                  active
                    ? "bg-ec-orange text-white"
                    : "text-foreground/80 hover:bg-ec-orange-soft hover:text-ec-orange-dark"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}