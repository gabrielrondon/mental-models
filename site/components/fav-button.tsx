"use client";

import { Heart } from "lucide-react";
import clsx from "clsx";
import { useModels } from "@/lib/store";

export function FavButton({ id, size = 16, className, label = false }: { id: string; size?: number; className?: string; label?: boolean }) {
  const { isFav, toggleFav } = useModels();
  const on = isFav(id);
  return (
    <button type="button" onClick={(e) => { e.stopPropagation(); toggleFav(id); }} aria-pressed={on}
      aria-label={on ? "Remove from my latticework" : "Add to my latticework"} title={on ? "In my latticework" : "Add to my latticework"}
      className={clsx("fav", on && "is-on", label && "btn btn-sm", className)}>
      <Heart size={size} className="fav-icon" />
      {label && (on ? "In my latticework" : "Add to my latticework")}
    </button>
  );
}
