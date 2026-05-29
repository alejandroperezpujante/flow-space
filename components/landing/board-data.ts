export interface CardData {
  id: string
  title: string
  labels?: { text: string; variant: "primary" | "destructive" | "muted" | "accent" }[]
  due?: string
  assignee?: string
  highlight?: boolean
}

export interface LaneData {
  id: string
  name: string
  cards: CardData[]
}

export const LANES: LaneData[] = [
  {
    id: "inbox",
    name: "Inbox",
    cards: [
      { id: "c1", title: "Review design system tokens", labels: [{ text: "design", variant: "primary" }], assignee: "AP" },
      { id: "c2", title: "Set up a deployment pipeline", labels: [{ text: "devops", variant: "muted" }], due: "Jun 1" },
      { id: "c3", title: "Write API documentation", labels: [{ text: "docs", variant: "accent" }] },
    ],
  },
  {
    id: "today",
    name: "Today",
    cards: [
      { id: "c4", title: "Fix keyboard navigation bug", labels: [{ text: "bug", variant: "destructive" }], assignee: "AP" },
      { id: "c5", title: "Code review: auth PR #42", labels: [{ text: "review", variant: "muted" }] },
    ],
  },
  {
    id: "this-week",
    name: "This Week",
    cards: [
      { id: "c6", title: "Implement search feature", labels: [{ text: "feature", variant: "primary" }], due: "Jun 4" },
      { id: "c7", title: "Add dark mode toggle", labels: [{ text: "feature", variant: "primary" }] },
      { id: "c8", title: "Performance audit", labels: [{ text: "perf", variant: "accent" }] },
    ],
  },
  {
    id: "doing",
    name: "Doing",
    cards: [
      { id: "c9", title: "Board drag & drop", labels: [{ text: "feature", variant: "primary" }], assignee: "AP", highlight: true },
      { id: "c10", title: "Landing page", labels: [{ text: "marketing", variant: "accent" }] },
    ],
  },
  {
    id: "done",
    name: "Done",
    cards: [
      { id: "c11", title: "Initial project setup", labels: [{ text: "setup", variant: "muted" }] },
      { id: "c12", title: "Markdown card editor", labels: [{ text: "feature", variant: "primary" }] },
    ],
  },
]

export const labelStyles = {
  primary: "bg-primary/12 text-primary",
  destructive: "bg-destructive/12 text-destructive",
  muted: "bg-muted text-muted-foreground",
  accent: "bg-accent text-accent-foreground",
}
