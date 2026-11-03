import Image from "next/image";
import { ImageOff } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { caseStudyCategories, caseStudyPage } from "@/content/caseStudies";
import type { CaseStudy } from "@/lib/types";
import { CaseStudyArt } from "../CaseStudyArt";

/**
 * Screenshots or a live demo. Until the demo is complete, a labelled concept preview or an
 * honest placeholder.
 */
export function CaseStudyMedia({ study }: { study: CaseStudy }) {
  const copy = caseStudyPage.media;
  const screenshots = study.screenshots ?? [];

  return (
    <div className="pt-12 md:pt-16">
      <Container>
        {screenshots.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-2">
            {screenshots.map((shot, index) => (
              <li key={shot.src} className={index === 0 ? "md:col-span-2" : undefined}>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={1600}
                  height={1000}
                  sizes="(min-width: 768px) 80vw, 100vw"
                  className="w-full rounded-2xl border border-copper-500/25"
                />
              </li>
            ))}
          </ul>
        ) : study.preview ? (
          <figure className="overflow-hidden rounded-2xl border border-copper-500/25">
            <Image
              src={study.preview.src}
              alt={study.preview.alt}
              width={1600}
              height={1000}
              sizes="(min-width: 1280px) 75rem, 100vw"
              className="w-full"
            />
            <figcaption className="flex flex-col gap-3 border-t border-copper-500/20 bg-ink-900 px-6 py-4 text-sm text-titanium-500 sm:flex-row sm:items-center">
              <Badge tone="copper" className="self-start sm:self-auto">
                {copy.preview}
              </Badge>
              {copy.previewNote} {copy.pending}
            </figcaption>
          </figure>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-copper-500/25">
            <CaseStudyArt icon={caseStudyCategories[study.category].icon} className="h-56 sm:h-72" />
            <p className="flex items-center gap-3 border-t border-copper-500/20 bg-ink-900 px-6 py-4 text-sm text-titanium-500">
              <ImageOff aria-hidden className="size-4 shrink-0 text-copper-400" />
              {copy.pending}
            </p>
          </div>
        )}
        {study.demoUrl && (
          <ButtonLink href={study.demoUrl} variant="outline" className="mt-6">
            {copy.demo}
          </ButtonLink>
        )}
      </Container>
    </div>
  );
}
