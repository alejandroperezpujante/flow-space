import { MagicLinkForm } from "@/components/auth/magic-link-form";

export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <MagicLinkForm />
        </div>
    );
}
