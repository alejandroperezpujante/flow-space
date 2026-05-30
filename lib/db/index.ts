import "server-only"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

// Lazy init: neon() throws immediately if DATABASE_URL is unset, and Next.js
// evaluates top-level module code at build time. Deferring to first call keeps
// `next build` safe when env vars haven't been provisioned yet (e.g. CI).
//
// NOTE: do NOT wrap _db in a Proxy — auth adapters (e.g. NextAuth) introspect
// the db object directly and Proxy traps silently break those checks.
function createDb() {
  const sql = neon(process.env.DATABASE_URL!)
  return drizzle(sql, { schema })
}

let _db: ReturnType<typeof createDb> | null = null

export function getDb() {
  if (!_db) _db = createDb()
  return _db
}
