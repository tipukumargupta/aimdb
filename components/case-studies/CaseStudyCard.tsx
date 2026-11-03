import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { caseStudyCategories, caseStudyPage, caseStudyStatus } from "@/content/caseStudies";
import type { CaseStudy } from "@/lib/types";
import { CaseStudyArt } from "./CaseStudyArt";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const category = caseStudyCategories[study.category];
  // The first screenshot is the card's cover. Until there is one, a labelled concept preview
  // stands in, then the category art.
  const screenshot = study.screenshots?.[0];
  const cover = screenshot ?? study.preview;

  return (
    <Link href={`/case-studies/${study.slug}`} className="group block h-full rounded-xl">
      <Card interactive padded={false} className="flex h-full flex-col overflow-hidden">
        {cover ? (
          <div className="relative aspect-16/10 overflow-hidden border-b border-copper-500/20 bg-ink-900">
            {/* alt is empty: the title below names the card, and the detail page describes each image. */}
            <Image
              src={cover.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 26rem, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-500 ease-brand motion-safe:group-hover:scale-[1.03]"
            />
            {!screenshot && (
              <Badge className="absolute left-3 top-3 bg-ink-950/85 text-titanium-50 shadow-lg backdrop-blur-sm">
                {caseStudyPage.media.preview}
              </Badge>
            )}
          </div>
        ) : (
          <CaseStudyArt icon={category.icon} className="aspect-16/10 border-b border-copper-500/20" />
        )}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap gap-2">
            <Badge tone="copper">{category.label}</Badge>
            {study.isDemo && <Badge>{caseStudyPage.types.demo}</Badge>}
            {study.status === "in-development" && <Badge>{caseStudyStatus[study.status]}</Badge>}
          </div>
          <h3 className="mt-4 text-lg font-semibold leading-snug transition-colors group-hover:text-copper-300">
            {study.title}
          </h3>
          <dl className="mt-4 space-y-3 text-sm leading-relaxed">
            <div>
              <dt className="font-medium text-titanium-300">Challenge</dt>
              <dd className="mt-1 text-titanium-500">{study.problem}</dd>
            </div>
            <div>
              <dt className="font-medium text-titanium-300">Approach</dt>
              <dd className="mt-1 text-titanium-500">{study.solution}</dd>
            </div>
          </dl>
          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-copper-400">
            View case study
            <ArrowRight aria-hidden className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
