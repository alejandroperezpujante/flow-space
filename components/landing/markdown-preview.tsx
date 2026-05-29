"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const SOURCE = `## Board drag and drop

Implement drag-and-drop for Kanban cards using the Pointer Events API.

### Acceptance criteria

- [ ] Cards draggable within a lane (reorder)
- [ ] Cards draggable across lanes
- [x] Optimistic UI — card moves instantly, reconciles on ack
- [ ] Drag handle visible on hover only

### Notes

Avoid heavy DnD libraries; the built-in \`pointerdown\` / \`pointermove\` / \`pointerup\` cycle is enough for this use case.

Attach \`touch-action: none\` to draggable elements so mobile scroll doesn't interfere.
`

const PREVIEW_HTML = (
  <div className="prose prose-sm max-w-none text-foreground [&_h2]:font-heading [&_h2]:text-base [&_h2]:font-semibold [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground/80 [&_p]:text-sm [&_p]:text-muted-foreground [&_code]:font-mono [&_code]:text-xs [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_ul]:space-y-1">
    <h2>Board drag &amp; drop</h2>
    <p>Implement drag-and-drop for Kanban cards using the Pointer Events API.</p>
    <h3>Acceptance criteria</h3>
    <ul className="space-y-1 text-sm text-foreground/80 list-none pl-0">
      {[
        { done: false, text: "Cards draggable within a lane (reorder)" },
        { done: false, text: "Cards draggable across lanes" },
        { done: true, text: "Optimistic UI — card moves instantly, reconciles on ack" },
        { done: false, text: "Drag handle visible on hover only" },
      ].map((item) => (
        <li key={item.text} className="flex items-start gap-2">
          <span
            className={
              item.done
                ? "mt-0.5 size-3.5 shrink-0 rounded border-2 border-primary bg-primary/20 flex items-center justify-center"
                : "mt-0.5 size-3.5 shrink-0 rounded border-2 border-border"
            }
          >
            {item.done && <span className="text-[8px] leading-none text-primary">✓</span>}
          </span>
          <span className={item.done ? "line-through text-muted-foreground" : ""}>{item.text}</span>
        </li>
      ))}
    </ul>
    <h3>Notes</h3>
    <p>
      Avoid heavy DnD libraries; the built-in <code>pointerdown</code> / <code>pointermove</code> /{" "}
      <code>pointerup</code> cycle is enough.
    </p>
    <p>
      Attach <code>touch-action: none</code> to draggable elements so mobile scroll doesn&apos;t interfere.
    </p>
  </div>
)

export function MarkdownPreview() {
  return (
    <Tabs defaultValue="preview" className="w-full">
      <TabsList variant="line" className="mb-4">
        <TabsTrigger value="source">Source</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="source">
        <pre className="rounded-xl bg-muted/60 p-4 text-xs leading-relaxed text-foreground/80 font-mono overflow-x-auto whitespace-pre-wrap">
          {SOURCE}
        </pre>
      </TabsContent>
      <TabsContent value="preview">
        <div className="rounded-xl bg-card border border-border p-5 ring-1 ring-foreground/6">
          {PREVIEW_HTML}
        </div>
      </TabsContent>
    </Tabs>
  )
}
