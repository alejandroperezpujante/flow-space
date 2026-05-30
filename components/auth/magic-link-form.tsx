"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { signInWithMagicLink } from "@/app/(auth)/actions";
import { initialState, type FormState } from "@/app/(auth)/form-state";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Sending…" : "Send magic link"}
        </Button>
    );
}

interface InnerProps {
    onReset: () => void;
}

function MagicLinkFormInner({ onReset }: InnerProps) {
    const [state, formAction] = useActionState<FormState, FormData>(
        signInWithMagicLink,
        initialState,
    );

    async function handleGoogle() {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        });
    }

    if (state.status === "sent") {
        return (
            <Card className="w-full max-w-sm text-center">
                <CardHeader>
                    <CardTitle>Check your email</CardTitle>
                    <CardDescription>
                        We sent a sign-in link to <strong>{state.email}</strong>. Open it to continue.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="justify-center">
                    <Button variant="ghost" onClick={onReset}>
                        Use a different email
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Sign in to FlowSpace</CardTitle>
                <CardDescription>
                    Enter your email — we&apos;ll send a magic link. New here? It creates your account.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form action={formAction} className="space-y-3">
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    {state.status === "error" && (
                        <p className="text-sm text-destructive" aria-live="polite">
                            {state.error}
                        </p>
                    )}
                    <SubmitButton />
                </form>

                <div className="flex items-center gap-2">
                    <Separator className="flex-1" />
                    <span className="text-muted-foreground text-xs">or</span>
                    <Separator className="flex-1" />
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogle}
                >
                    Continue with Google
                </Button>
            </CardContent>
        </Card>
    );
}

export function MagicLinkForm() {
    const [attemptKey, setAttemptKey] = useState(0);
    return (
        <MagicLinkFormInner
            key={attemptKey}
            onReset={() => setAttemptKey((k) => k + 1)}
        />
    );
}
