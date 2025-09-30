import { Icons } from "@/components/icons";
import Link from "next/link";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-svh w-full items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <Link href="/" aria-label="Home">
            <Icons.Logo className="h-10 w-10 text-primary" />
          </Link>
          <h1 className="font-headline text-3xl font-bold">Habitualize</h1>
        </div>
        {children}
      </div>
    </main>
  );
}
