import type { Service, Step } from "@/lib/types";
import { bookingHref } from "./booking";
import { processSteps } from "./process";
import { site } from "./site";

// Homepage copy. Section order and intent: requirements.md §6.

export const hero = {
  eyebrow: "AI Solutions · Digital Development ·",
  eyebrowAccent: "Practical Learning",
  title: ["Human vision.", "Intelligent futures."],
  intro: site.description,
  primaryCta: { label: "Explore Our Services", href: "#services" },
  secondaryCta: { label: "Explore Learning Academy", href: "/academy" },
  textCta: { label: "or Book a Consultation", href: "/book" },
  quickServices: ["ai-ml-learning", "ai-automation", "web-development"] satisfies Service["slug"][],
};

export const servicesSection = {
  eyebrow: "What we do",
  title: "Six services. One practical partner.",
  intro:
    "From AI training and automation to content, marketing, websites and remote support — every service comes with a clear scope, transparent pricing and a plan built around your goals.",
  help: "Not sure which service fits?",
  helpCta: { label: "Book a consultation", href: bookingHref("business-consultation") },
};

export const caseStudiesSection = {
  eyebrow: "Featured work",
  title: "Systems built for real problems.",
  intro: "A look at the kind of work we deliver. Samples we built ourselves are labelled as Demo Projects.",
  cta: { label: "View all case studies", href: "/case-studies" },
};

export const academySection = {
  eyebrow: "AIDMBD Learning Academy",
  title: "Learn AI by building with it.",
  intro:
    "Practical courses in AI automation, machine learning, research writing and programming — each one built around real projects.",
  formats:
    "Live classes run in scheduled batches with instructor-led Q&A. Recorded courses let you learn at your own pace, with progress tracking and support.",
  cta: { label: "Explore Learning Academy", href: "/academy" },
};

export const processSection = {
  eyebrow: "How we work",
  title: "From first conversation to long-term support.",
  steps: processSteps,
};

export const aboutSection = {
  eyebrow: "About AIDMBD",
  title: "One team for AI solutions, digital products and learning.",
  intro:
    "AIDMBD International Ltd helps businesses simplify their work with AI and automation, builds digital products that grow with them, and teaches AI through hands-on, real-world projects.",
  principles: [
    {
      title: "Clear scope, clear costs",
      description: "Every proposal spells out deliverables, revisions, support and third-party costs.",
    },
    {
      title: "Honest proof",
      description: "We show verified results only, and label the samples we built ourselves as Demo Projects.",
    },
    {
      title: "People in the loop",
      description: "Our automations include human review, error handling and manual handover where it matters.",
    },
    {
      title: "Learning by doing",
      description: "Every course is built around practical projects, not just theory.",
    },
  ] satisfies Step[],
  cta: { label: "More about us", href: "/about" },
};

export const testimonialsSection = {
  eyebrow: "Testimonials",
  title: "What clients and students say.",
};

export const blogSection = {
  eyebrow: "Insights",
  title: "Latest from the blog.",
  intro: "Tutorials, guides and research notes on AI, automation, development and learning.",
  cta: { label: "Visit the blog", href: "/blog" },
};

export const faqSection = {
  eyebrow: "FAQ",
  title: "Questions, answered.",
  intro: "Can't find what you're looking for? Book a consultation and ask us directly.",
  cta: { label: "See all FAQs", href: "/faq" },
};

export const bookingSection = {
  eyebrow: "Book a consultation",
  title: "Let's talk about what you're building.",
  intro: "Choose the kind of conversation you need. We'll confirm a time with you.",
  cta: { label: "Book a Consultation", href: "/book" },
};
