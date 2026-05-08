import { SearchX, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
}

export function EmptyState({
  title = "No results found",
  description = "We couldn't find anything matching your current criteria.",
  className,
  icon: Icon = SearchX,
  children,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-border/60 rounded-xl bg-muted/10",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-6 shadow-sm border border-border/50">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">{description}</p>
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}
