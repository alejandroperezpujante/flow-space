import { Section } from "@/components/landing/section"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  LayoutGrid,
  GripVertical,
  Columns3,
  Keyboard,
  FileText,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: LayoutGrid,
    title: "Rich cards",
    description:
      "Every card carries a title, a full Markdown body, an optional due date, colour labels, and an assignee. No filler fields.",
    accent: "bg-primary/8 text-primary",
  },
  {
    icon: GripVertical,
    title: "Drag-and-drop",
    description:
      "Move cards across lanes or reorder within a lane with a grab-and-drop. Optimistic updates keep the UI instant.",
    accent: "bg-chart-2/15 text-chart-2",
  },
  {
    icon: Columns3,
    title: "Your lanes, your rules",
    description:
      "Defaults: Inbox, Today, This Week, Doing, Done. Rename, add, delete, or reorder any lane at any time.",
    accent: "bg-accent text-accent-foreground",
  },
  {
    icon: Keyboard,
    title: "Keyboard-first",
    description:
      "Press n for a new card, / to search, g i to jump to Inbox, j/k to navigate, Enter to open, Esc to close.",
    accent: "bg-primary/8 text-primary",
  },
  {
    icon: FileText,
    title: "Markdown + paste images",
    description:
      "Card bodies render full Markdown with a live preview toggle. Paste screenshots directly from your clipboard.",
    accent: "bg-chart-2/15 text-chart-2",
  },
  {
    icon: Search,
    title: "Instant search",
    description:
      "A single search bar scans every card title and body across all lanes. Press / anywhere to open it.",
    accent: "bg-accent text-accent-foreground",
  },
]

export function FeatureGrid() {
  return (
    <Section
      id="features"
      eyebrow="Features"
      heading="Everything you actually need."
      description="No sprints, no burndowns, no dashboards. Just a board you'll open every day."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} className="group transition-all hover:-translate-y-0.5 hover:shadow-md">
            <CardHeader>
              <div className={cn("mb-3 inline-flex size-9 items-center justify-center rounded-lg", f.accent)}>
                <f.icon className="size-4.5" />
              </div>
              <CardTitle>{f.title}</CardTitle>
              <CardDescription>{f.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Section>
  )
}
