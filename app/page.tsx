import { Nav } from "@/components/landing/nav"
import { Hero } from "@/components/landing/hero"
import { FeatureGrid } from "@/components/landing/feature-grid"
import { ShortcutShowcaseSection } from "@/components/landing/shortcut-showcase-section"
import { Section } from "@/components/landing/section"
import { MarkdownPreview } from "@/components/landing/markdown-preview"
import { CardDetailMock } from "@/components/landing/card-detail-mock"
import { LaneManager } from "@/components/landing/lane-manager"
import { HistoryTimeline } from "@/components/landing/history-timeline"
import { OptimisticStrip } from "@/components/landing/optimistic-strip"
import { SearchMock } from "@/components/landing/search-mock"
import { CtaFooter } from "@/components/landing/cta-footer"

export default function V2() {
  return (
    <div className="flex flex-col min-h-full bg-background">
      <Nav />
      <main>
        <Hero />

        <FeatureGrid />

        <ShortcutShowcaseSection />

        <Section
          id="markdown"
          eyebrow="Markdown"
          heading="Write naturally, read beautifully."
          description="Cards support full Markdown. Toggle between source and rendered view. Paste an image from your clipboard and it embeds inline."
        >
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            <CardDetailMock />
            <MarkdownPreview />
          </div>
        </Section>

        <Section
          id="lanes"
          eyebrow="Customise"
          heading="Your lanes, your way."
          description="Rename, reorder, add, or delete lanes any time. The five defaults are a starting point, not a mandate."
          className="bg-sidebar/20"
        >
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            <div className="space-y-4">
              <LaneManager />
              <p className="text-sm text-muted-foreground px-1">
                Hover any lane to reveal the drag handle, rename, and delete controls. Nothing is permanent — lanes
                can be renamed or removed whenever your workflow changes.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Default lanes
              </p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { name: "Inbox", desc: "Everything unprocessed lands here first." },
                  { name: "Today", desc: "What you commit to finishing today." },
                  { name: "This Week", desc: "On your radar for the next few days." },
                  { name: "Doing", desc: "In active progress right now." },
                  { name: "Done", desc: "Shipped. Archived automatically after 30 days." },
                ].map((lane) => (
                  <div key={lane.name} className="flex items-baseline gap-3">
                    <span className="w-20 shrink-0 text-xs font-semibold text-foreground">{lane.name}</span>
                    <span className="text-xs text-muted-foreground">{lane.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="history"
          eyebrow="History & sync"
          heading="Every move, recorded. Every update, instant."
          description="Cards carry a full audit trail — created, moved, edited — so nothing is ever lost. Optimistic updates mean the board feels local even when you're on a shaky connection."
        >
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            <HistoryTimeline />
            <div className="space-y-4">
              <OptimisticStrip />
              <SearchMock />
            </div>
          </div>
        </Section>
      </main>

      <CtaFooter />
    </div>
  )
}
