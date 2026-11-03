import type { CaseStudy, CaseStudyCategory, CaseStudyStatus, IconName } from "@/lib/types";
import { bookingHref } from "./booking";

export const caseStudyCategories: Record<CaseStudyCategory, { label: string; icon: IconName }> = {
  "ai-automation": { label: "AI Automation", icon: "workflow" },
  "web-development": { label: "Web Development", icon: "code" },
  "data-ml": { label: "Data & ML", icon: "brain-circuit" },
  content: { label: "Content", icon: "sparkles" },
  marketing: { label: "Marketing", icon: "megaphone" },
};

export const caseStudyStatus: Record<CaseStudyStatus, string> = {
  "in-development": "In development",
  complete: "Complete",
};

// The demo projects suggested in the plan (requirements §10), all still being built. Their pages
// show the brief openly as "Demo Project · In development": the context, objectives, scope and
// approach are drafts to confirm with the client. Until then each shows a labelled concept
// preview of the planned interface. Add screenshots, a demo link and measured results (with
// data, test period and baseline) when each one is complete, never before.
export const caseStudies: CaseStudy[] = [
  {
    slug: "textile-production-planning-dashboard",
    title: "Textile Production Planning Dashboard",
    category: "data-ml",
    isDemo: true,
    status: "in-development",
    preview: {
      src: "/images/case-studies/textile-production-planning-dashboard-preview.png",
      alt: "Concept preview of the planning dashboard: open orders, this week's line load by buyer, and orders at risk of missing their shipment date.",
    },
    summary: "One view of orders, line capacity and deadlines for a textile production floor.",
    context:
      "Garment and textile factories plan production across many orders, lines and shipment dates. Planning often lives in spreadsheets that each team updates separately.",
    problem: "Production planners track orders, line capacity and deadlines across scattered spreadsheets.",
    objectives: [
      "Show every open order with its line, progress and shipment date",
      "Make line capacity and bottlenecks visible at a glance",
      "Flag orders at risk of missing their shipment date early",
    ],
    scope: [
      "Data model for orders, lines and daily output",
      "Planning dashboard with filters by buyer, line and week",
      "At-risk order alerts based on output versus plan",
      "Spreadsheet import for existing planning data",
    ],
    role: "Concept, data model, dashboard design and development, built end to end by AIDMBD as a demonstration.",
    solution: "One dashboard that brings orders, capacity and schedules together and flags orders at risk of running late.",
    features: [
      "Order timeline from cutting to shipment",
      "Line load chart that shows spare and over-booked capacity",
      "Daily output entry with automatic progress tracking",
      "At-risk list sorted by days remaining",
    ],
    results: [],
    relatedService: "web-development",
    featured: true,
  },
  {
    slug: "demand-forecasting-system",
    title: "Demand Forecasting System",
    category: "data-ml",
    isDemo: true,
    status: "in-development",
    preview: {
      src: "/images/case-studies/demand-forecasting-system-preview.png",
      alt: "Concept preview of the forecasting dashboard: weekly sales with an eight-week forecast, its error range and a naive baseline, beside the weekly forecast table.",
    },
    summary: "Sales forecasts that are checked against a simple baseline before anyone relies on them.",
    context:
      "Retailers and manufacturers decide how much to stock or produce weeks ahead. Many of those decisions are made from experience alone, without using the sales history they already have.",
    problem: "Stock and production decisions rely on guesswork instead of sales history.",
    objectives: [
      "Forecast weekly demand per product from historical sales",
      "Prove the model beats a simple baseline before trusting it",
      "Explain forecasts in terms planners can act on",
    ],
    scope: [
      "Data cleaning and feature preparation from sales records",
      "Forecasting model and a naive baseline to compare against",
      "Evaluation on a held-out test period",
      "Forecast report with error ranges",
    ],
    role: "Data preparation, modelling, evaluation and reporting, carried out by AIDMBD as a demonstration.",
    solution: "A forecasting model trained on historical sales and compared against a simple baseline.",
    features: [
      "Weekly forecasts per product with error ranges",
      "Side-by-side comparison with a naive baseline",
      "Evaluation on data the model never saw in training",
      "A plain-language summary of what drives each forecast",
    ],
    results: [],
    limitations:
      "The data used, the test period, the baseline and the evaluation limitations will be published with the results.",
    relatedService: "ai-ml-learning",
  },
  {
    slug: "bangla-english-faq-assistant",
    title: "Bangla–English FAQ Assistant",
    category: "ai-automation",
    isDemo: true,
    status: "in-development",
    preview: {
      src: "/images/case-studies/bangla-english-faq-assistant-preview.png",
      alt: "Concept preview of the assistant's review console: a website chat answered in Bangla and English with cited sources, then handed over to the support team.",
    },
    summary: "A bilingual assistant that answers from approved content and knows when to hand over.",
    context:
      "Businesses in Bangladesh answer customers in both Bangla and English, across a website and messaging apps. The same questions arrive every day, and a small team answers each one by hand.",
    problem: "Customers ask the same questions in two languages, and the support team answers each one by hand.",
    objectives: [
      "Answer common questions in Bangla and English, in the customer's language",
      "Answer only from approved business information",
      "Hand over to a person when the assistant isn't sure",
    ],
    scope: [
      "Knowledge base built from approved FAQs and policies",
      "Bilingual chat assistant for a website",
      "Confidence check with handover to a human",
      "Conversation log for reviewing and improving answers",
    ],
    role: "Knowledge base setup, assistant design, integration and testing, built by AIDMBD as a demonstration.",
    solution: "A bilingual assistant that answers from an approved knowledge base and hands over to a person when unsure.",
    features: [
      "Replies in the language the customer writes in",
      "Answers cite the approved source they came from",
      "Clear handover to a person, with the conversation so far",
      "Review log to correct answers and add missing questions",
    ],
    results: [],
    relatedService: "ai-automation",
    featured: true,
  },
  {
    slug: "lead-follow-up-workflow",
    title: "Lead Follow-up Workflow",
    category: "ai-automation",
    isDemo: true,
    status: "in-development",
    preview: {
      src: "/images/case-studies/lead-follow-up-workflow-preview.png",
      alt: "Concept preview of the follow-up workflow: new lead, CRM sheet, drafted reply, approval, send, wait and follow-up steps, beside a list of recent leads.",
    },
    summary: "Every lead captured, logged and followed up on time, with a person approving key messages.",
    context:
      "Small businesses collect leads from website forms, Facebook and WhatsApp. Without one place to track them, follow-ups depend on someone remembering.",
    problem: "Leads from forms and messages go cold because follow-ups depend on someone remembering.",
    objectives: [
      "Capture leads from every channel in one place",
      "Send timely follow-ups without manual reminders",
      "Keep a person in control of important messages",
    ],
    scope: [
      "Lead capture from website forms",
      "CRM sheet with lead status and owner",
      "Scheduled follow-up emails with approval steps",
      "Weekly summary of new, active and closed leads",
    ],
    role: "Workflow design, integration and testing, built by AIDMBD as a demonstration.",
    solution:
      "A workflow that captures each lead, logs it in a CRM sheet and schedules follow-ups, with a person approving key messages.",
    features: [
      "New leads logged instantly with their source",
      "Follow-up reminders and drafted replies on a schedule",
      "Human approval before any important message goes out",
      "Error alerts when a step fails, with a manual fallback",
    ],
    results: [],
    relatedService: "ai-automation",
  },
  {
    slug: "course-learning-portal",
    title: "Course Learning Portal",
    category: "web-development",
    isDemo: true,
    status: "in-development",
    preview: {
      src: "/images/case-studies/course-learning-portal-preview.png",
      alt: "Concept preview of the student dashboard: a continue-lesson card, module progress, the next live class, an assignment due and course resources.",
    },
    summary: "Lessons, recordings, resources and progress in one place for every student.",
    context:
      "Training providers often run courses through chat groups, shared drives and video links. Students lose track of material, and instructors can't see who is keeping up.",
    problem: "Course material, recordings and assignments are shared through scattered links and chat groups.",
    objectives: [
      "Give each student one place for lessons and resources",
      "Track progress module by module",
      "Make live classes and recordings easy to find",
    ],
    scope: [
      "Student accounts and course enrollment",
      "Lesson pages with video, notes and downloads",
      "Progress tracking and assignment submission",
      "Instructor view of student progress",
    ],
    role: "Product design, front-end and back-end development, built by AIDMBD as a demonstration.",
    solution: "A portal where students enroll, watch lessons, track progress and find every resource in one place.",
    features: [
      "Course dashboard with continue-where-you-left-off",
      "Upcoming live classes with join links and recordings",
      "Assignment upload and instructor feedback",
      "Progress overview for instructors",
    ],
    results: [],
    relatedService: "web-development",
    featured: true,
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

/** "Discuss a Similar Project" pre-selects the study's service in the booking flow. */
export function similarProjectHref(study: CaseStudy) {
  return bookingHref("project-discussion", { service: study.relatedService });
}

export const caseStudiesPage = {
  description:
    "Case studies and demo projects from AIDMBD International Ltd: AI automation, web development, data and machine learning.",
  eyebrow: "Case studies",
  title: "Work that shows how we think.",
  intro:
    "Each case study explains the problem, the approach and the result. Samples we build ourselves are labelled Demo Project, and results appear only once they're measured.",
  listTitle: "All projects",
  filterLegend: "Category",
  all: "All",
  count: (shown: number) => `${shown} ${shown === 1 ? "project" : "projects"}`,
  empty: {
    title: "Nothing in this category yet.",
    intro: "We share relevant samples privately. Ask for them when we talk.",
  },
  reset: "Show all projects",
  demoNote:
    "Demo Projects are built by AIDMBD to show what we can deliver. They aren't client work, and we never present them as client results.",
  cta: {
    eyebrow: "Your project",
    title: "Have a similar challenge?",
    intro: "Tell us what you're working on, and we'll show you relevant work and how we'd approach it.",
  },
};

export const caseStudyPage = {
  similar: "Discuss a Similar Project",
  service: "Related service",
  facts: { category: "Category", type: "Type", status: "Status", service: "Service" },
  types: { demo: "Demo Project", client: "Client project" },
  media: {
    pending: "Screenshots and a live demo will be added when this demo is complete.",
    preview: "Concept preview",
    previewNote: "A concept preview of the planned interface, shown with sample data.",
    demo: "Open the live demo",
  },
  context: { eyebrow: "The challenge", title: "Context and problem." },
  objectives: "Objectives",
  scope: { eyebrow: "Scope", title: "What's included.", role: "AIDMBD's role" },
  solution: { eyebrow: "Solution", title: "How it works." },
  results: {
    eyebrow: "Results",
    title: "Results and limitations.",
    pending: "This demo is still in development. We'll publish measured results here once it's complete, never estimates.",
    limitations: "Limitations",
  },
  more: { eyebrow: "More work", title: "Other projects." },
};
