import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { hero } from "@/content/home";
import { getService } from "@/content/services";
import type { Service } from "@/lib/types";
import { HeroVisual } from "./HeroVisual";
import { QuickCards } from "./QuickCards";

const quickServices = hero.quickServices
  .map((slug) => getService(slug))
  .filter((service): service is Service => Boolean(service));

// Supporting text animates with CSS so it paints before hydration. The headline is the
// LCP element, so it stays visible from the first paint instead of fading in.
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <Container className="grid gap-12 pt-10 pb-20 sm:pt-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-x-8 lg:gap-y-14 lg:pt-16 lg:pb-28">
        <div className="relative z-10 lg:col-start-1 lg:row-start-1">
          <Eyebrow accent={hero.eyebrowAccent} className="motion-safe:animate-fade-up">
            {hero.eyebrow}
          </Eyebrow>
          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.5rem,5.6vw,4.75rem)] font-extrabold leading-[1.04] tracking-[-0.03em]"
          >
            <span className="text-gradient-titanium">{hero.title[0]}</span>
            <br />
            <span className="text-gradient-copper">{hero.title[1]}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-titanium-500 motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
            {hero.intro}
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="outline" size="lg">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
          <ButtonLink
            href={hero.textCta.href}
            variant="link"
            className="mt-6 motion-safe:animate-fade-up motion-safe:[animation-delay:320ms]"
          >
            {hero.textCta.label}
          </ButtonLink>
        </div>

        {/* From xl the cards sit under the text and the founder stands the full height of both
            rows, as in the reference; below xl three cards need the full width. */}
        <HeroVisual className="lg:col-start-2 lg:row-start-1 lg:min-h-[30rem] xl:row-span-2" />

        <QuickCards
          services={quickServices}
          className="lg:col-span-2 lg:row-start-2 xl:col-span-1 xl:col-start-1 motion-safe:animate-fade-up motion-safe:[animation-delay:400ms]"
        />
      </Container>
    </section>
  );
}
