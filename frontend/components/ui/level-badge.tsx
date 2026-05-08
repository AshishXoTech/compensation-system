import { cn } from "@/lib/utils";
import { LEVEL_CONFIG } from "@/lib/constants";
import type { Level } from "@/types";

interface LevelBadgeProps {
  level: Level;
  showLabel?: boolean;
  className?: string;
}

export function LevelBadge({
  level,
  showLabel = false,
  className,
}: LevelBadgeProps) {
  const config = LEVEL_CONFIG[level];

  if (!config) {
    return (
      <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
        {level}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold",
        config.bgColor,
        config.color,
        config.borderColor,
        className
      )}
    >
      {showLabel ? config.label : level}
    </span>
  );
}
