import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { LogoutButton } from "@/components/logout-button";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }

    const { user } = session;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
            <div className="flex flex-col items-center gap-3 text-center">
                {user.image && (
                    <Image
                        src={user.image}
                        alt={user.name}
                        width={64}
                        height={64}
                        className="rounded-full"
                    />
                )}
                <div>
                    <p className="text-lg font-semibold">{user.name}</p>
                    <p className="text-muted-foreground text-sm">{user.email}</p>
                </div>
            </div>
            <LogoutButton />
        </main>
    );
}
