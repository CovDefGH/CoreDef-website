import { CTALink } from "@/components/ui/CTALink";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-14rem)] flex-col items-center justify-center px-4 py-20 text-center md:py-32">
      <div className="relative">
        <h1 className="font-display text-[clamp(6rem,15vw,12rem)] font-bold leading-none tracking-tighter text-ink/5 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Signal Lost
          </h2>
        </div>
      </div>
      
      <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted md:text-lg">
        The node you are looking for has been moved, deleted, or never existed in this sector.
      </p>
      
      <div className="mt-10">
        <CTALink href="/">Return to Mission Control</CTALink>
      </div>
    </div>
  );
}
