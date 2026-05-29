import type { ReactNode } from "react";
import { cn } from "@/lib/utils"

interface SectionProps {
  id?: string
  eyebrow?: string
  heading: string
  description?: string
  className?: string
  children?: ReactNode
  centered?: boolean
}

export function Section({ id, eyebrow, heading, description, className, children, centered }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 px-6", className)}>
      <div className={cn("mx-auto max-w-5xl", centered && "text-center")}>
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
        )}
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground mb-4">{heading}</h2>
        {description && (
          <p className={cn("text-muted-foreground text-lg mb-10 max-w-2xl", centered && "mx-auto")}>
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
