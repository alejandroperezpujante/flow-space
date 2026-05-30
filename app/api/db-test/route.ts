import { getDb } from "@/lib/db"
import { post } from "@/lib/db/schema"
import { NextResponse } from "next/server"

export async function GET() {
    const db = getDb()
    await db.insert(post).values({ content: "hello from neon" })
    const rows = await db.select().from(post)
    return NextResponse.json(rows)
}