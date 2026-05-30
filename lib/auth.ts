import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { getDb } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
    // Secret + base URL resolved from BETTER_AUTH_SECRET / BETTER_AUTH_URL env vars.
    // No need to set them here as long as the env vars are present.

    database: drizzleAdapter(getDb(), {
        provider: "pg",
        schema,
    }),

    trustedOrigins: [process.env.BETTER_AUTH_URL!],

    // Session: 7-day expiry, refresh every 24 h, cookie cache to cut DB round-trips.
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5, // 5-minute client-side cache
        },
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },

    plugins: [
        magicLink({
            sendMagicLink: async ({ email, url }) => {
                // TODO: replace with a real email provider (e.g. Resend):
                //   await resend.emails.send({ from: "...", to: email, subject: "Sign in", html: `<a href="${url}">Sign in</a>` })
                console.log(`[magic-link] ${email}: ${url}`);
            },
        }),
    ],
});
