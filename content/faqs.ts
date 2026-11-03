import type { Faq, FaqGroup } from "@/lib/types";

export const faqGroups: Record<FaqGroup, string> = {
  services: "Services",
  courses: "Courses",
  support: "Support",
  pricing: "Pricing",
};

// Draft answers based on the plan. Confirm with the client before launch (requirements §6.9).
export const faqs: Faq[] = [
  {
    id: "which-service",
    group: "services",
    question: "How do I know which service fits my needs?",
    answer:
      "Book a Business Consultation. We'll talk through what you need and recommend the right service, or a combination of services, before any work starts.",
  },
  {
    id: "see-examples",
    group: "services",
    question: "Can I see examples of your work first?",
    answer:
      "Yes. Each service links to related case studies, samples or live demos. Samples we built ourselves are clearly labelled as Demo Projects.",
  },
  {
    id: "live-vs-recorded",
    group: "courses",
    question: "What's the difference between live and recorded courses?",
    answer:
      "Recorded courses are self-paced: you learn on your own schedule after enrolling, with module progress tracking and defined support. Live courses run in fixed batches with a class schedule, instructor-led Q&A and recordings according to the course terms.",
  },
  {
    id: "certificate",
    group: "courses",
    question: "Will I get a certificate?",
    answer:
      "Certificates are issued when you meet the completion conditions listed on each course page.",
  },
  {
    id: "publication-guarantee",
    group: "courses",
    question: "Does the research writing course guarantee publication?",
    answer:
      "No. You get structured lessons, mentoring and feedback on your draft, but no course can guarantee publication or acceptance. Your results, references and citations must be your own verified work.",
  },
  {
    id: "after-delivery",
    group: "support",
    question: "What happens after my project is delivered?",
    answer:
      "Your proposal sets out the maintenance and support terms, including the support period. Ongoing maintenance plans are available for websites and automations.",
  },
  {
    id: "booking-confirmation",
    group: "support",
    question: "When is my meeting confirmed?",
    answer:
      "After you send a booking request, our team checks availability and replies to confirm the time. A request isn't confirmed until we do.",
  },
  {
    id: "pricing-structure",
    group: "pricing",
    question: "How is pricing structured?",
    answer:
      "Depending on the service, we offer fixed packages, custom quotes or monthly support. Every proposal lists the deliverables, revisions, support period and any additional costs.",
  },
  {
    id: "third-party-costs",
    group: "pricing",
    question: "Are advertising, tool and hosting costs included?",
    answer:
      "No. Our fee is always shown separately from third-party costs such as advertising budgets, tool or API subscriptions, hosting and domains.",
  },
];

export const faqPage = {
  description: "Answers to common questions about AIDMBD's services, courses, support and pricing.",
  eyebrow: "FAQ",
  title: "Frequently asked questions.",
  intro: "Answers about our services, courses, support and pricing. If yours isn't here, ask us directly.",
  jump: "Jump to",
  more: {
    title: "Still have a question?",
    intro: "Send us a message, or book a consultation and ask us directly.",
    contact: { label: "Contact us", href: "/contact" },
    book: { label: "Book a Consultation", href: "/book" },
  },
};
