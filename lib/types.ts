/** Icon keys stay serializable so content can cross the server/client boundary. */
export type IconName =
  | "brain-circuit"
  | "workflow"
  | "sparkles"
  | "megaphone"
  | "code"
  | "headset"
  | "bot"
  | "file-text"
  | "terminal"
  | "graduation-cap";

export type LinkItem = {
  label: string;
  href: string;
};

export type NavItem = LinkItem & {
  /** Opens the services mega-menu instead of navigating directly. */
  hasMenu?: boolean;
};

export type FooterGroup = {
  title: string;
  links: Array<LinkItem & { soon?: boolean }>;
};

export type Service = {
  slug: string;
  title: string;
  icon: IconName;
  /** One line for cards and the mega-menu. */
  summary: string;
  /** For search results: 160 characters or fewer. */
  metaDescription: string;
  description: string;
  /** The problem the service solves, for the detail page intro. */
  problem: string;
  audience: string[];
  subServices: string[];
  /** What the client receives. */
  deliverables: string[];
  /** Scope and delivery assumptions from the plan. */
  notes: string[];
  pricing: string;
  /** Third-party costs billed separately from our fee. */
  extraCosts: string[];
  /** Maintenance and support after delivery. */
  support: string;
  faqs: Array<{ question: string; answer: string }>;
  cta: LinkItem;
  secondaryCta?: LinkItem;
};

/** The slice of a service the navigation menus need. */
export type ServiceSummary = Pick<Service, "slug" | "title" | "summary" | "icon">;

export type BookingTypeSlug =
  | "business-consultation"
  | "project-discussion"
  | "learning-guidance"
  | "research-mentorship"
  | "corporate-training";

/** Optional request fields that only some meeting types ask for. Phone is asked for every type. */
export type BookingField = "company" | "institution" | "website" | "skillLevel" | "budget" | "timeline";

export type BookingType = {
  slug: BookingTypeSlug;
  title: string;
  topic: string;
  duration: string;
  fee: string;
  format: string;
  prepare: string[];
  fields: BookingField[];
  /** Which list leads the interest picker. */
  interest: "services" | "courses";
};

/** A preferred window in the visitor's own timezone, as "HH:MM". */
export type TimeSlot = {
  id: string;
  label: string;
  start: string;
  end: string;
};

export type CourseFormat = "live" | "recorded";

export type ProgrammingTrack = {
  language: string;
  topics: string[];
  sampleProject: string;
};

export type AcademyCategory = {
  slug: string;
  title: string;
  icon: IconName;
  summary: string;
  description: string;
  formats: CourseFormat[];
  modules: string[];
  advancedModules?: { title: string; modules: string[] };
  tracks?: ProgrammingTrack[];
  /** Meeting type behind "Ask a question" for this path. */
  guidance: BookingTypeSlug;
};

export type CourseLevel = "beginner" | "intermediate" | "advanced";

/** "waitlist" until the client confirms the fee, schedule and instructor. */
export type CourseStatus = "waitlist" | "enrolling";

export type Instructor = {
  name: string;
  role: string;
  bio: string;
  /** Path under /public. */
  photo: string;
};

export type Course = {
  slug: string;
  title: string;
  category: AcademyCategory["slug"];
  level: CourseLevel;
  formats: CourseFormat[];
  status: CourseStatus;
  /** One line for cards. */
  summary: string;
  overview: string;
  outcomes: string[];
  prerequisites: string[];
  /** Module titles in teaching order. */
  syllabus: string[];
  projects: string[];
  language: string;
  /** Notes, code, datasets and templates. */
  resources: string[];
  /** Quizzes, assignments and project assessment. */
  assessment: string[];
  certificate: string;
  toolCosts: string;
  /** Course-specific cautions, such as "no guaranteed publication". */
  notes?: string[];
  // Pending from the client. Unset values show as "announced at launch".
  instructor?: Instructor;
  /** Total lessons or class hours. */
  duration?: string;
  /** Next live batch: dates, time and timezone. */
  schedule?: string;
  fee?: string;
  /** Support channel and how long support lasts. */
  support?: string;
  /** How long enrolled students keep access. */
  access?: string;
};

/** The slice of a course that cards and the catalog filters need. */
export type CourseSummary = Pick<Course, "slug" | "title" | "category" | "level" | "formats" | "status" | "summary"> & {
  categoryTitle: string;
  moduleCount: number;
};

export type CaseStudyCategory =
  | "ai-automation"
  | "web-development"
  | "data-ml"
  | "content"
  | "marketing";

export type CaseStudyStatus = "in-development" | "complete";

export type CaseStudy = {
  slug: string;
  title: string;
  category: CaseStudyCategory;
  /** Self-made samples must be labelled "Demo Project". */
  isDemo: boolean;
  /** In-development demos show their brief; results and screenshots come once complete. */
  status: CaseStudyStatus;
  /** One line for the page intro. */
  summary: string;
  /** Who it's for and the situation they're in. */
  context: string;
  problem: string;
  objectives: string[];
  scope: string[];
  /** AIDMBD's part in the work. */
  role: string;
  solution: string;
  /** What the solution does, feature by feature. */
  features: string[];
  /** Verified results only. Leave empty until measured. */
  results: string[];
  limitations?: string;
  screenshots?: Array<{ src: string; alt: string }>;
  /**
   * A concept image of the planned interface, with sample data. Shown labelled "Concept preview"
   * only until real screenshots exist, and never presented as finished work.
   */
  preview?: { src: string; alt: string };
  demoUrl?: string;
  relatedService: Service["slug"];
  /** Shown in the homepage preview. */
  featured?: boolean;
};

export type FaqGroup = "services" | "courses" | "support" | "pricing";

export type Faq = {
  id: string;
  group: FaqGroup;
  question: string;
  answer: string;
};

export type BlogCategory =
  | "ai-ml"
  | "automation"
  | "content"
  | "marketing"
  | "web"
  | "programming"
  | "research"
  | "updates";

export type Post = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  author: string;
  /** Rounded up at about 220 words a minute. */
  readingMinutes: number;
  /** ISO dates. */
  publishedAt: string;
  updatedAt?: string;
  /** The course or service the article leads to (requirements §11). */
  related: LinkItem & { kind: "course" | "service" };
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  kind: "client" | "student";
};

export type Step = {
  title: string;
  description: string;
};
