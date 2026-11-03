import type { Service } from "@/lib/types";
import { bookingHref } from "./booking";

// Source: requirements.md §7. Packages and fees are pending from the client.
// Sub-services, notes, extra costs and most FAQ answers come from the plan. Draft copy to confirm:
// `audience` (except AI & ML Learning), `problem`, `deliverables`, `support`, and the `pricing`
// lines for AI & ML Learning, Digital Marketing and Web Development.
export const services: Service[] = [
  {
    slug: "ai-ml-learning",
    title: "AI & ML Learning",
    icon: "brain-circuit",
    summary: "Guidance, mentoring and training that turn AI concepts into real skills.",
    metaDescription:
      "AI and machine learning guidance, project mentoring and training for students, researchers, teachers and teams, built around hands-on practice.",
    description:
      "Personal guidance, project mentoring and institution-based training in AI and machine learning. Regular courses run in the AIDMBD Learning Academy; this service covers tailored learning for individuals, universities and teams.",
    problem:
      "AI moves fast, and most learning material is either too theoretical or too scattered to turn into real skills and working projects.",
    audience: ["Students", "Beginners", "Researchers", "Teachers", "Business teams"],
    subServices: [
      "AI Fundamentals Training",
      "Machine Learning Fundamentals",
      "Deep Learning Introduction",
      "Generative AI & LLM Fundamentals",
      "Python for AI & Data Science",
      "Data Analysis & Visualization Training",
      "Prompt Engineering",
      "Computer Vision & NLP Introduction",
      "AI/ML Project Mentorship",
      "Model Evaluation & Result Interpretation",
      "University Workshop & Bootcamp",
      "Corporate AI Training",
      "Personalized Learning Roadmap",
    ],
    deliverables: [
      "A learning plan matched to your level and goals",
      "Hands-on sessions built around practical exercises",
      "Notes, code and datasets to keep",
      "Feedback on your own projects",
      "A roadmap for what to learn next",
    ],
    notes: [
      "Regular courses are listed in the Learning Academy; this service covers tailored guidance and training.",
      "Workshops and corporate training are planned around group size, goals and delivery format.",
    ],
    pricing: "Per session, per workshop or custom training quote.",
    extraCosts: ["Paid tools, cloud compute or API usage needed for projects"],
    support:
      "You keep the materials and leave with a roadmap for what to learn next. Follow-up mentoring sessions can be booked as you progress.",
    faqs: [
      {
        question: "Is this the same as an Academy course?",
        answer:
          "No. Academy courses have a fixed syllabus and format. This service is tailored: one-to-one guidance, project mentoring, or training designed for your institution or team.",
      },
      {
        question: "Can you train our whole team or run a university workshop?",
        answer:
          "Yes. Corporate AI training, university workshops and bootcamps are planned around your group size, goals and preferred delivery format.",
      },
    ],
    cta: { label: "Book Learning Guidance", href: bookingHref("learning-guidance") },
    secondaryCta: { label: "Explore Courses", href: "/academy" },
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    icon: "workflow",
    summary: "Automate repetitive work so your team can focus on what matters.",
    metaDescription:
      "AI automation for businesses: workflows, CRM and lead follow-up, chatbots and AI agents, with human review and clear setup and running costs.",
    description:
      "Automation design, integration and support that make repetitive business work simple and organized — from lead follow-ups and reminders to chatbots, document extraction and AI agents.",
    problem:
      "Copying data, chasing leads, sending reminders and answering the same questions eat hours every week and are easy to get wrong.",
    audience: ["Small and growing businesses", "Sales and support teams", "Operations teams"],
    subServices: [
      "Business Workflow Automation",
      "Lead Collection, CRM Integration & Follow-up",
      "Email & Notification Automation",
      "Appointment Booking & Reminder",
      "Website Customer Support Chatbot",
      "WhatsApp/Messenger Integration",
      "Internal Knowledge Assistant",
      "Document & Invoice Data Extraction",
      "Google Sheets/Excel Reporting Workflow",
      "E-commerce Order Notification",
      "AI Agent & Tool Integration",
      "Existing Automation Audit & Maintenance",
    ],
    deliverables: [
      "A map of your current workflow and what to automate first",
      "Working automations connected to the tools you already use",
      "Human review and error handling where mistakes matter",
      "Documentation and a handover walkthrough",
      "Monitoring during the agreed support period",
    ],
    notes: [
      "Human review, error handling and manual handover are built in where needed.",
      "WhatsApp/Messenger integration depends on what each platform supports.",
    ],
    pricing: "Setup fee plus optional monthly maintenance.",
    extraCosts: ["Third-party tool subscriptions", "API and AI model usage"],
    support:
      "Automations are monitored during the agreed support period. Monthly maintenance covers fixes, changes in connected tools and small improvements.",
    faqs: [
      {
        question: "What happens if an automation gets something wrong?",
        answer:
          "Where mistakes matter, we build in human review, error handling and a manual handover, so a person can step in before anything goes out.",
      },
      {
        question: "Can you connect WhatsApp or Messenger?",
        answer:
          "Often, yes — but it depends on what each platform's official integration supports. We confirm what's possible before scoping the work.",
      },
      {
        question: "Are tool and API costs included?",
        answer:
          "No. The setup fee and maintenance are our charges; third-party tool subscriptions and API usage are shown separately.",
      },
    ],
    cta: {
      label: "Discuss Your Automation",
      href: bookingHref("project-discussion", { service: "ai-automation" }),
    },
  },
  {
    slug: "ai-content-creation",
    title: "AI Content Creation",
    icon: "sparkles",
    summary: "AI-assisted visuals, video and copy for your brand and your learners.",
    metaDescription:
      "AI-assisted content for your brand: social posts, visuals, short video, scripts and Bangla–English copy, with agreed quantities and revisions.",
    description:
      "AI-assisted creative production for businesses, personal brands and learning — social posts, product visuals, short videos, scripts, voiceovers and website copy in Bangla and English.",
    problem:
      "Consistent, on-brand content takes time to produce, and small teams struggle to keep up across every channel and language.",
    audience: ["Businesses", "Personal brands", "Educators and trainers"],
    subServices: [
      "Social Media Content",
      "Product Images & Promotional Visuals",
      "Advertising Creative",
      "Short Video & Reels",
      "Video Script & Storyboard",
      "AI-assisted Voiceover",
      "Blog & Website Content",
      "Product Description",
      "Presentation & Training Content",
      "Thumbnail, Banner & Poster",
      "Content Calendar",
      "Bangla–English Content Adaptation",
      "Brand Content Workflow Setup",
    ],
    deliverables: [
      "Content in the agreed formats and quantities",
      "Drafts for review within the agreed revision limit",
      "Final files, ready to publish",
      "Bangla and English versions where needed",
      "A content calendar when it's part of the package",
    ],
    notes: [
      "Every package states content quantity, format, revision limit and delivery time.",
    ],
    pricing: "Fixed content packages or a custom quote.",
    extraCosts: [],
    support:
      "You receive final, ready-to-publish files. To keep future content consistent, we can set up a brand content workflow for your team.",
    faqs: [
      {
        question: "How many revisions are included?",
        answer:
          "Each package states its revision limit up front, along with content quantity, format and delivery time.",
      },
      {
        question: "Can you create content in Bangla?",
        answer: "Yes. We create content in Bangla and English, and adapt existing content between the two.",
      },
    ],
    cta: {
      label: "Request a Content Package",
      href: bookingHref("project-discussion", { service: "ai-content-creation" }),
    },
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    icon: "megaphone",
    summary: "Reach the right audience and measure what your campaigns achieve.",
    metaDescription:
      "Digital marketing that reaches the right audience: strategy, social media, ads, SEO and lead campaigns, with clear reporting and separate ad budgets.",
    description:
      "Strategy, advertising, SEO and reporting that put your business in front of the right audience — with clear measurement so you can see what each campaign achieves.",
    problem:
      "Without a clear strategy and proper tracking, ad spend and posting effort go out without anyone knowing what actually works.",
    audience: ["Local businesses", "E-commerce brands", "Service providers"],
    subServices: [
      "Digital Marketing Strategy",
      "Social Media Management",
      "Facebook & Instagram Advertising",
      "Google Ads",
      "Search Engine Optimization & Local SEO",
      "Business Profile Optimization",
      "Content Marketing & Email Marketing",
      "Lead Generation Campaign",
      "Landing Page Optimization",
      "Conversion Tracking & Analytics",
      "Campaign Reporting",
      "Marketing Automation",
    ],
    deliverables: [
      "A strategy matched to your goals and audience",
      "Campaign setup and management on the agreed channels",
      "Conversion tracking and analytics",
      "Regular reports in plain language",
      "Recommendations for the next period",
    ],
    notes: [
      "We don't guarantee leads or sales; we agree the scope, how results are measured and how they're reported up front.",
    ],
    pricing: "Monthly retainer or campaign-based quote, plus your ad budget.",
    extraCosts: ["Your advertising budget, kept separate from our agency fee"],
    support:
      "Reporting continues for the length of your plan, with a review at the end of each period to decide what to keep, change or stop.",
    faqs: [
      {
        question: "Do you guarantee leads or sales?",
        answer:
          "No. Results depend on many factors no agency controls. What we commit to is a clear scope, honest measurement and regular reporting.",
      },
      {
        question: "Is the ad budget included in your fee?",
        answer: "No. Our agency fee and your advertising budget are always kept separate.",
      },
    ],
    cta: {
      label: "Plan Your Marketing",
      href: bookingHref("business-consultation", { service: "digital-marketing" }),
    },
  },
  {
    slug: "web-development",
    title: "Web Development",
    icon: "code",
    summary: "Websites and web apps that are fast, clear and built to grow.",
    metaDescription:
      "Websites and web apps for businesses and educators: corporate sites, e-commerce, learning platforms, booking systems and custom dashboards.",
    description:
      "Websites and web applications for institutions, businesses and digital products — from landing pages and online stores to learning platforms, booking systems and custom dashboards.",
    problem:
      "An outdated, slow or hard-to-manage website loses visitors and makes your business harder to trust and grow.",
    audience: ["Businesses", "Institutions", "Founders and creators"],
    subServices: [
      "Business & Corporate Website",
      "Portfolio & Personal Brand Website",
      "Landing Page",
      "E-commerce Website",
      "Learning Management System (LMS)",
      "Course Selling Website",
      "Booking & Appointment Website",
      "Custom Web Application & Admin Dashboard",
      "Blog & Content Management System",
      "API & Payment Integration",
      "AI Chatbot Integration",
      "Website Redesign",
      "Speed & Mobile Optimization",
      "Website Maintenance & Support",
    ],
    deliverables: [
      "A responsive website or web app built to the agreed scope",
      "Content management access where it's included",
      "Speed, mobile and search-friendly setup",
      "Payments, booking or chatbot integrations, if scoped",
      "Handover documentation and a walkthrough",
    ],
    notes: [
      "Proposals list page count, features, content responsibilities, hosting/domain cost, delivery scope and support period.",
    ],
    pricing: "Fixed project quote plus optional maintenance plan.",
    extraCosts: ["Hosting and domain", "Paid third-party services or plugins your project needs"],
    support:
      "Every project includes the support period stated in its proposal. After that, a maintenance plan keeps your site updated and running smoothly.",
    faqs: [
      {
        question: "What does a website proposal include?",
        answer:
          "Page count, features, who provides the content, hosting and domain costs, delivery scope and the support period — so you know exactly what you're getting.",
      },
      {
        question: "Can you improve or maintain an existing website?",
        answer: "Yes. We offer redesigns, speed and mobile optimization, and ongoing maintenance and support.",
      },
    ],
    cta: {
      label: "Start Your Website Project",
      href: bookingHref("project-discussion", { service: "web-development" }),
    },
  },
  {
    slug: "virtual-assistant",
    title: "Virtual Assistant",
    icon: "headset",
    summary: "Reliable remote support for admin, research and daily operations.",
    metaDescription:
      "Remote virtual assistant support for email, scheduling, data entry, research, CRM updates and customer support, on hourly, monthly or task plans.",
    description:
      "Remote administrative, research and operational support — inbox and calendar management, data entry, research, documents, CRM updates and customer support assistance.",
    problem:
      "Inboxes, calendars, data entry and follow-ups pull you away from the work only you can do.",
    audience: ["Founders and executives", "Small teams", "E-commerce sellers"],
    subServices: [
      "Email & Inbox Management",
      "Calendar, Meeting & Appointment Management",
      "Data Entry & Spreadsheet Management",
      "Online Research",
      "Document & Presentation Preparation",
      "CRM Update & Lead Organization",
      "Customer Support Assistance",
      "E-commerce Product Listing & Order Tracking",
      "Social Media Scheduling",
      "Meeting Notes & Follow-up Preparation",
      "AI-assisted Administrative Support",
    ],
    deliverables: [
      "Support for the agreed hours or tasks",
      "Clear responsibilities and response times",
      "Regular updates on completed work",
      "Work done only through the access you choose to grant",
    ],
    notes: [
      "Responsibilities, access permissions, working hours and response expectations are agreed before work starts.",
    ],
    pricing: "Hourly, monthly or task-based packages.",
    extraCosts: [],
    support:
      "Your plan can change as your needs do — add hours, adjust tasks, or switch between hourly, monthly and task-based packages.",
    faqs: [
      {
        question: "How are virtual assistant plans priced?",
        answer: "Hourly, monthly or per task — choose what fits how much support you need.",
      },
      {
        question: "What do we agree before starting?",
        answer:
          "Responsibilities, access permissions, working hours and response expectations are all agreed before any work begins.",
      },
    ],
    cta: {
      label: "Find Your Support Plan",
      href: bookingHref("business-consultation", { service: "virtual-assistant" }),
    },
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

/** Copy for the /services overview and the service detail pages. */
export const servicesPage = {
  eyebrow: "Services",
  title: "Six services. One practical partner.",
  intro:
    "AI training, automation, content, marketing, websites and remote support — each with a clear scope, transparent pricing and a plan built around your goals.",
  academy: {
    title: "Looking for structured courses?",
    intro:
      "The AIDMBD Learning Academy offers live and recorded courses in AI automation, machine learning, research writing and programming.",
    cta: { label: "Explore Learning Academy", href: "/academy" },
  },
};

export const serviceDetail = {
  included: { eyebrow: "What's included", title: "Everything this service covers." },
  deliverablesTitle: "What you receive",
  delivery: { eyebrow: "How we deliver", title: "A clear process, from scope to support." },
  assumptionsTitle: "Good to know",
  proof: { eyebrow: "Proof", title: "Related work." },
  noProof: {
    title: "Samples on request",
    intro:
      "We're preparing published examples for this service. Ask for relevant samples during your consultation.",
  },
  pricing: { eyebrow: "Pricing", title: "Transparent pricing, no surprises." },
  proposalIncludes: ["Deliverables", "Revisions", "Support period", "Any additional costs"],
  extraCostsTitle: "Billed separately",
  extraCostsNote: "Any third-party costs are listed separately in your proposal.",
  support: { title: "After delivery" },
  faq: { eyebrow: "FAQ", title: "Questions about this service." },
  others: { eyebrow: "More services", title: "Explore other services." },
  cta: {
    eyebrow: "Next step",
    intro: "Book a consultation and we'll scope it together. We'll confirm a time with you.",
  },
};
