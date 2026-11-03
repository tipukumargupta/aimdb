import type { Metadata } from "next";
import { CalendarCheck, GraduationCap } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Overline } from "@/components/ui/Overline";
import { Section } from "@/components/ui/Section";
import { contactDetails, contactPage } from "@/content/contact";
import { pageMetadata } from "@/lib/metadata";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: contactPage.description,
  path: "/contact",
});

export default function ContactPage() {
  const { form, book, support, details } = contactPage;
  const direct = [
    { label: details.email, value: contactDetails.email, href: contactDetails.email && `mailto:${contactDetails.email}` },
    { label: details.phone, value: contactDetails.phone, href: contactDetails.phone && `tel:${contactDetails.phone.replace(/\s/g, "")}` },
    { label: details.whatsapp, value: contactDetails.whatsapp, href: contactDetails.whatsapp && whatsappLink(contactDetails.whatsapp) },
  ].filter((item) => item.value);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        intro={contactPage.intro}
      />

      <Section tone="raised" aria-label={contactPage.eyebrow}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Card className="p-6 sm:p-8 lg:col-span-7">
            <h2 className="text-2xl font-bold tracking-tight">{form.title}</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Card>

          <div className="space-y-6 lg:col-span-5">
            <Card className="p-7">
              <CalendarCheck aria-hidden strokeWidth={1.5} className="size-7 text-copper-400" />
              <h2 className="mt-5 text-lg font-semibold">{book.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-titanium-500">{book.intro}</p>
              <ButtonLink href={book.cta.href} className="mt-6">
                {book.cta.label}
              </ButtonLink>
            </Card>

            <Card id="student-support" className="p-7">
              <GraduationCap aria-hidden strokeWidth={1.5} className="size-7 text-copper-400" />
              <h2 className="mt-5 text-lg font-semibold">{support.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-titanium-500">{support.intro}</p>
            </Card>

            {direct.length > 0 && (
              <Card className="p-7">
                <h2 className="text-lg font-semibold">{details.title}</h2>
                <dl className="mt-4 space-y-3">
                  {direct.map((item) => (
                    <div key={item.label}>
                      <dt>
                        <Overline>{item.label}</Overline>
                      </dt>
                      <dd className="mt-1">
                        <a href={item.href} className="text-copper-400 transition-colors hover:text-copper-300">
                          {item.value}
                        </a>
                      </dd>
                    </div>
                  ))}
                </dl>
              </Card>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
