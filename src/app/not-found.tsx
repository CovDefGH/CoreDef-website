import { CTALink } from "@/components/ui/CTALink";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-14rem)] flex-col items-center justify-center px-4 py-20 text-center md:py-32">
      <div className="relative">
        <h1 className="font-display text-ink/5 text-[clamp(6rem,15vw,12rem)] leading-none font-bold tracking-tighter select-none">
          404
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="font-display text-ink text-2xl font-bold tracking-tight md:text-3xl">
            Page not found
          </h2>
        </div>
      </div>

      <p className="text-ink-muted mt-6 max-w-md text-base leading-relaxed md:text-lg">
        The page you are looking for does not exist or has been moved.
      </p>

      <div className="mt-10">
        <CTALink href="/">Go to Homepage</CTALink>
      </div>
    </div>
  );
}
