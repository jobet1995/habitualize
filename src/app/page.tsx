import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Icons } from "@/components/icons";

export default function OnboardingPage() {
  const onboardingImage = PlaceHolderImages.find(
    (img) => img.id === "onboarding-calendar",
  );

  return (
    <main className="flex h-svh w-full flex-col">
      <div className="relative h-3/5 w-full">
        {onboardingImage && (
          <Image
            src={onboardingImage.imageUrl}
            alt={onboardingImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={onboardingImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center space-y-6 bg-background p-8 text-center">
        <div className="flex items-center gap-2">
          <Icons.Logo className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground">
            Habitualize
          </h1>
        </div>
        <p className="max-w-md text-lg text-muted-foreground">
          Build Better Habits, One Day at a Time.
        </p>
        <div className="w-full max-w-sm space-y-4 pt-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="w-full">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
