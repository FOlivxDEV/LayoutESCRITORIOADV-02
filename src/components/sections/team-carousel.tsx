"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { team } from "@/content/data";

export function TeamCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="team-carousel">
      <div className="team-track mt-10" ref={trackRef}>
        {team.map((professional) => (
          <article className="card overflow-hidden" key={professional.slug}>
            <div className="relative aspect-[4/5]">
              <Image
                src={professional.image}
                alt={`Retrato fictício de ${professional.name}`}
                fill
                sizes="(min-width:1024px) 25vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-2xl text-[#0a2038]">{professional.name}</h3>
              <p className="font-semibold text-[#8a6e38]">{professional.role}</p>
              <p className="mt-3 text-sm">{professional.area}</p>
              <p className="mt-1 text-xs text-slate-500">{professional.oab}</p>
              <Link className="mt-4 inline-block font-bold" href={`/equipe/${professional.slug}`}>
                Ver perfil →
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className="team-controls" aria-label="Navegação da equipe">
        <button type="button" onClick={() => move(-1)} aria-label="Profissional anterior">
          <ChevronLeft />
        </button>
        <button type="button" onClick={() => move(1)} aria-label="Próximo profissional">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
