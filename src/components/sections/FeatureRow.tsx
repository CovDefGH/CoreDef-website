import Image from "next/image";
import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

type FeatureRowProps = {
  heading: string;
  body: string;
  bullets?: string[];
  image: { src: string; alt: string };
  /** Which side the image sits on at md+. Alternate down a page for rhythm. */
  imageSide?: "left" | "right";
};

// Use-case block: image + explanatory copy, alternating sides. This is the
// "use case with a picture" pattern (simple, professional — no fancy panels).
export function FeatureRow({
  heading,
  body,
  bullets,
  image,
  imageSide = "right",
}: FeatureRowProps) {
  return (
    <Reveal
      as="section"
      className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
    >
      <div className={imageSide === "left" ? "md:order-2" : undefined}>
        <h2 className="text-ink text-2xl font-bold md:text-3xl">{heading}</h2>
        <p className="text-ink-muted mt-4 text-justify leading-relaxed">{body}</p>
        {bullets && bullets.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {bullets.map((b) => (
              <li key={b} className="text-ink-muted flex gap-2.5 text-sm">
                <Check
                  aria-hidden
                  size={16}
                  className="text-primary mt-0.5 shrink-0"
                />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div
        className={`border-line relative aspect-[4/3] overflow-hidden border ${
          imageSide === "left" ? "md:order-1" : ""
        }`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </Reveal>
  );
}
