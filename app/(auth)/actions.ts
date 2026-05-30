"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import type { FormState } from "./form-state";

const schema = z.object({
    email: z.email(),
});

export async function signInWithMagicLink(
    _prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    const parsed = schema.safeParse({ email: formData.get("email") });
    if (!parsed.success) {
        const msg = parsed.error.issues[0]?.message ?? "Invalid email.";
        return { status: "error", error: msg };
    }

    const { email } = parsed.data;

    try {
        await auth.api.signInMagicLink({
            body: { email, callbackURL: "/dashboard" },
            headers: await headers(),
        });
    } catch (e) {
        if (e instanceof APIError) {
            return { status: "error", error: e.message };
        }
        throw e;
    }

    return { status: "sent", email };
}
