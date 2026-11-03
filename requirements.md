# AIDMBD International Ltd — Website Requirements & Build Plan

> This is the single source of truth for building the AIDMBD website. It draws on three sources: the 13-page Bangla plan (AIDMBD_Website_Complete_Plan.pdf), the hero-section design reference and the company logo.
> Build it phase by phase (§17). Every step has a **Done when** check.
> **Before each step, read the listed guide in `node_modules/next/dist/docs/`.** This is Next.js 16.4 and its APIs differ from older versions (see AGENTS.md).

---

## 1. Project snapshot

| | |
|---|---|
| Company | AIDMBD International Ltd |
| Positioning | **AI Solutions, Digital Development & Practical Learning** |
| Core message | Make business work simpler with AI, build digital products that grow, and teach AI through real projects |
| Two halves | **Business Services**, which generates client inquiries, and **AIDMBD Learning Academy**, which generates course enrollments. **Booking** links both to a conversation. |
| Audiences | Business clients · students and beginners · research learners · teachers · university and corporate teams |
| Tagline (footer) | PRACTICAL AI. REAL BUSINESS IMPACT. |

### Tech stack
- Already installed:
  - **Next.js 16.4.3**: App Router, Turbopack, `cacheComponents: true`, `partialPrefetching: true`
  - **React 19.3** and **TypeScript** (strict), with the `@/*` path alias
  - **Tailwind CSS v4**: CSS-first configuration with `@theme` in `app/globals.css` (there is no `tailwind.config.js`)
- To add:
  - `motion`: Framer Motion under its current package name. Import from `"motion/react"`.
  - `lucide-react`: line icons, matching the reference's copper outline icons.
- Keep dependencies minimal. No UI kit, no CSS-in-JS. `cn()` in `lib/cn.ts` wraps `tailwind-merge`, so a `className` passed to a primitive reliably overrides its defaults (added in Phase 1 after plain class-joining let `inline-flex` beat `hidden`).

---

## 2. Primary user journeys

| Visitor | Journey |
|---|---|
| Business client | Home → Services → Service Details → Case Study → **Book a Consultation** |
| Student | Home → Learning Academy → Category → Course Details → **Enroll / Join Waitlist** → Dashboard (later) |
| Research learner | Academy → Research Writing syllabus → Mentorship or class details → **Booking or Enrollment** |

Every page ends with a clear next step along one of these paths.

---

## 3. Design system

Taken from the hero reference image and the logo.

### 3.1 Visual direction
- **Warm near-black canvas** with a soft **copper radial glow** behind the hero subject.
- A thin **copper elliptical orbit line** with glowing nodes, echoing the logo's orbit ring. This is the site's signature motif. Use it sparingly: in the hero, as section accents and in the CTA band.
- Headlines are **titanium white**, with key phrases in a **copper gradient** (e.g. "Human vision. / *Intelligent futures.*").
- **Eyebrow labels**: a short copper rule, then small uppercase text with wide letter-spacing. Part of the text can be copper.
- **Cards**: transparent dark surface, 1px copper hairline border at low opacity, `rounded-xl`, copper icon, circular arrow button.
- **Buttons** come in two styles, both with a → arrow:
  - Primary: filled copper.
  - Secondary: copper outline.
- Long-form reading (course syllabi, blog, policies) uses calm, plain areas: a slightly lifted surface, `max-w-prose` and no glow.
- Use real project screenshots. No generic stock imagery.

### 3.2 Color tokens
Define these in `app/globals.css` under `@theme`. The site has a **single dark theme**, so remove the scaffold's `prefers-color-scheme` switch and the Arial body font.

| Token | Value | Use |
|---|---|---|
| `ink-950` | `#0A0A0B` | Page background |
| `ink-900` | `#111113` | Alternate section background |
| `ink-800` | `#18181B` | Cards, surfaces |
| `ink-700` | `#232327` | Inputs, strong borders |
| `line` | `rgb(255 255 255 / 0.08)` | Hairlines, dividers |
| `titanium-50` | `#F5F6F7` | Headlines, primary text |
| `titanium-300` | `#C8CCD2` | Titanium gradient end, secondary text |
| `titanium-500` | `#9A9FA6` | Body/muted text (7.4:1 on `ink-950`) |
| `copper-300` | `#F3B98A` | Gradient highlight |
| `copper-400` | `#E29A5F` | Links, hover, active nav, focus ring |
| `copper-500` | `#C8783F` | Accent text, icons, borders (5.9:1 on `ink-950`) |
| `copper-600` | `#A35D2C` | **Primary button fill** (white text 5:1) |
| `copper-700` | `#7A431F` | Button gradient end, glow base |

Gradients and effects:
- `--gradient-copper`: `linear-gradient(90deg, #F3B98A, #C8783F 55%, #A35D2C)`, for headline highlight text.
- `--gradient-titanium`: `linear-gradient(180deg, #FFFFFF, #C8CCD2)`, for headline text.
- `--glow-copper`: `radial-gradient(ellipse at center, rgb(200 120 63 / 0.35), transparent 60%)`.
- Card hover: border goes to `copper-500/60`, plus `box-shadow: 0 0 40px -10px rgb(200 120 63 / 0.45)`.

Rule: on hover, a primary button gets a glow. Don't lighten its fill, because a lighter fill drops white text below 4.5:1.

### 3.3 Typography
- **Plus Jakarta Sans** (`next/font/google`, weights 400–800) for everything. It's the closest free match to the reference's geometric headline.
- **Hind Siliguri** (400/500/600) joins the font stack when Bangla launches.
- Scale:

  | Element | Size | Weight | Notes |
  |---|---|---|---|
  | H1 | `clamp(2.75rem, 6vw, 5rem)` | 800 | Line-height 1.02, tracking -0.02em |
  | H2 | `clamp(2rem, 4vw, 3rem)` | 700 | |
  | H3 | 1.25–1.5rem | 600 | |
  | Body | 1rem–1.125rem | 400 | Line-height 1.6, `titanium-500` |
  | Eyebrow | 0.75rem | 500 | Uppercase, tracking 0.3em |

### 3.4 Layout
- Container: `max-w-7xl` (1280px) with gutters of `px-4` on mobile (16px), `md:px-8` and `lg:px-10`.
- Section rhythm: `py-20 md:py-28`. Each section has an eyebrow, an H2, an optional intro (`max-w-2xl`), then content.
- Breakpoints to verify: **360, 390, 768, 1024, 1280, 1440**. No horizontal scroll at any width.

### 3.5 Motion (Framer Motion via `motion/react`)
- Wrap the root in `<MotionConfig reducedMotion="user">`, so reduced-motion users get no transforms.
- Shared feel:
  - Easing: `[0.22, 1, 0.36, 1]`
  - Durations: 0.4–0.7s
  - Stagger: 0.08s
  - No scroll-jacking, no parallax on text.
- Reusable primitives in `components/motion/`:
  - `<Reveal>`: fade in plus a 24px upward rise, `whileInView`, `once: true`, `amount: 0.25`.
  - `<Stagger>` / `<StaggerItem>`: staggered children for grids.
- Hero:
  - The **headline and subtitle use a CSS keyframe fade-up**, not JS. This lets them paint before hydration, which protects LCP.
  - Framer animates the orbit:
    1. The SVG ellipse draws in (`pathLength` 0→1, 1.6s).
    2. A glowing node then loops along it.
    3. The copper glow "breathes" (opacity 0.6↔1, 6s).
- Interactions:
  - Cards lift on hover (`y: -4`) and their border brightens.
  - The Service Explorer panel swaps with `AnimatePresence mode="wait"`: a crossfade plus an 8px slide.
  - The mobile menu slides and fades in.
  - The "How We Work" connecting line grows on scroll (`useScroll` + `useTransform`).
- Header: transparent over the hero. After 8px of scroll it becomes `ink-950/80` with `backdrop-blur` and a bottom hairline.

### 3.6 Accessibility (required)
- Use semantic landmarks, include a skip-to-content link, and keep one H1 per page.
- Focus ring is visible everywhere: 2px `copper-400` outline with a 2px offset.
- Keyboard support:
  - Services dropdown: a `<button aria-expanded>` that opens on click or Enter, closes on Esc and returns focus.
  - Service Explorer: tab semantics with arrow-key navigation.
  - Accordions: native `<details>`/`<summary>` or equivalent ARIA.
- Tap targets are at least 44×44px. Every form field has a label, inline errors and `aria-describedby`.
- Links inside running text are underlined, not just coloured.
- All informative images have alt text; decorative SVG (orbit, glow) is `aria-hidden`.

---

## 4. Brand assets
- The provided logo is a 1254×1254 square with an **opaque charcoal background**. On the warm-black site it would show as a visible box.
  - **Interim**: crop it to the wordmark and remove the background (ImageMagick or `sharp`). Save to `public/brand/logo.png` (horizontal wordmark) and `public/brand/logo-mark.png` (the "AI" robot mark, for favicon and OG image).
  - **Request from client**: a transparent PNG or SVG master of the logo.
- **Founder photo**: the hero reference shows the founder standing in the glow, and the PDF requires a real photo. Needed: a transparent cut-out PNG, at least 1600px tall, saved to `public/images/founder.png`. Until then, the hero shows the orbit and globe visual only. No stock person.
- Favicon and app icons come from `logo-mark` (`app/icon.png`, `app/apple-icon.png`).

---

## 5. Information architecture

### 5.1 Header
```
[Logo]   Home   Services ▾   Case Studies   Blog        [ Book a Consultation → ]
```
- The PDF's nav uses "Book a Schedule". This doc uses its suggested, more natural label: **Book a Consultation**. It's an outlined copper button that links to `/book`.
- The active link is `copper-400` with a 2px underline, as in the reference.
- **Services dropdown (mega-menu)**:
  - Two columns listing the 6 services, each with icon, title and one-liner.
  - Bottom row: **AIDMBD Learning Academy →** (`/academy`).
- **Mobile**: a hamburger opens a full-height sheet with Services as an accordion, large tap targets and the Book button pinned at the bottom.
- About, Team, Careers, Contact, FAQ and Policies live in the **footer**.
- **Student Login** is added only when the course portal launches (Phase 7).

### 5.2 Routes

| Route | Page | Phase |
|---|---|---|
| `/` | Home | 1 |
| `/services` | All services | 2 |
| `/services/[slug]` | Service detail ×6 | 2 |
| `/book` | Book a Consultation (request flow) | 3 |
| `/academy` | Academy home with filters | 4 |
| `/academy/[category]` | Category ×4 | 4 |
| `/academy/courses/[slug]` | Course detail | 4 |
| `/case-studies`, `/case-studies/[slug]` | Case studies | 5 |
| `/blog`, `/blog/[slug]` | Blog | 5 |
| `/about` | About, Founder, Team (`#team`) | 5 |
| `/careers`, `/contact`, `/faq` | Company and support pages | 5 |
| `/policies/[slug]` | privacy · terms · refund · cancellation | 5 |
| `/certificate-verification` | Certificate lookup | 7 |
| `/login`, `/dashboard/*`, `/admin/*` | Student portal and admin | 7 |

**Rule:** every dynamic route exports `generateStaticParams` from the content files, so all pages prerender. Unknown slugs call `notFound()`. Filters (Academy, Case Studies, Blog categories) run **client-side with component state**, not `searchParams`, so the pages stay static.

### 5.3 Footer

| Column | Links |
|---|---|
| Company | About · Team · Careers · Contact |
| Services | The 6 service detail pages |
| Academy | Courses · Live Batches · Recorded Courses |
| Support | FAQ · Student Support · Certificate Verification (later) |
| Policies | Privacy · Terms · Refund · Cancellation |
| Connect | Business email · official social profiles (LinkedIn, YouTube, Facebook) |

The bottom bar has the logo, the tagline "PRACTICAL AI. REAL BUSINESS IMPACT.", social icons, © year, and a language switch placeholder (later).

---

## 6. Homepage spec (build in this order)

### 6.1 Hero
- **Layout**: desktop is two columns (text 7/12, visual 5/12); mobile stacks text first, then a smaller visual.
- **Eyebrow**: `— AI SOLUTIONS · DIGITAL DEVELOPMENT · ` **`PRACTICAL LEARNING`**, with the last part in copper.
- **H1**: "Human vision." in the titanium gradient, then a line break, then "Intelligent futures." in the copper gradient.
- **Subtitle**: "AIDMBD International Ltd helps businesses work smarter with AI and automation, builds digital products that grow, and teaches practical AI through real projects."
- **CTAs**:
  - Primary: **Explore Our Services →** (`#services`)
  - Secondary (outline): **Explore Learning Academy →** (`/academy`)
  - Small text link: *or Book a Consultation* (`/book`)
- **Visual**: the founder cut-out in the copper glow, with the animated orbit and glowing nodes. Until the photo arrives, show the orbit plus a globe/logo-mark composition.
- **Quick-access cards** (3, from the reference): AI & Machine Learning · AI Automation · Web Development. Each has a copper icon, title, one line of text and a circular → button linking to its service page.
- **Done when**:
  - Headline and CTAs are visible above the fold at 390×844 and 1440×900.
  - No layout shift.
  - Readable at 360px.
  - Animations are off when reduced motion is on.

### 6.2 Our Services (**main focus**, `id="services"`)
- Eyebrow: WHAT WE DO. H2: "Six services. One practical partner."
- **Desktop (≥1024px): Service Explorer**
  - Left column: a vertical list of the 6 services with number (01–06), icon and title. The active item gets a copper left border and glow.
  - Right panel shows the selected service:
    - title, summary and who it's for
    - its top 6–8 sub-services as a two-column checklist, then "+N more"
    - pricing format
    - the service-specific CTA plus **View details →**
- **Mobile/tablet**: the same data rendered as an accordion of 6 cards.
- Under the section: "Not sure which service fits? **Book a consultation →**" (don't say "free" unless the client confirms there's no fee; the plan allows paid meeting types).
- **Done when**: works by keyboard (arrow keys move between tabs), all 6 link to their detail pages, and everything is driven from `content/services.ts`.

### 6.3 Featured Case Studies
- Show 3 cards. Each has:
  - a 16:10 screenshot
  - a category badge, plus a **Demo Project** badge for self-made samples
  - the title
  - a problem → solution line
  - a verified result, if one exists
- Link to `/case-studies`.

### 6.4 Learning Academy preview
- Show 4 category cards (AI Automation · AI & Machine Learning · AI/ML/LLM Research Paper Writing · Programming). Each has **Live** / **Recorded** badges, a short "what you'll learn" and a module count.
- Add one line explaining Live vs Recorded.
- CTA: **Explore Learning Academy →**

### 6.5 How We Work
- Steps: Discovery → Proposal & Scope → Build → Review & Launch → Support & Maintenance.
- Desktop shows a horizontal timeline; mobile shows it vertical. The connecting line animates on scroll.

### 6.6 About AIDMBD
- Mission and areas of work, plus a founder card (real photo, verifiable bio, LinkedIn) and team roles.
- CTA: **More about us →** (`/about`).

### 6.7 Testimonials
- Render **only when `content/testimonials.ts` has approved entries**. Otherwise omit the section entirely.
- Each card shows the quote, name, role/organization, and whether it's from a client or a student. Real feedback with permission only.

### 6.8 Latest Blog
- Show the 3 newest posts: category, title, excerpt, date and read time. Link to `/blog`.

### 6.9 FAQ
- Grouped as Services · Courses · Support · Pricing, using an accordion.
- Seed about 8 draft Q&As, marked for client confirmation.

### 6.10 Booking CTA band + Footer
- Copy: "Let's talk about what you're building." Show the 5 booking types as chips linking to `/book?type=<slug>`.
- Add the footer from §5.3.

---

## 7. Services

### 7.1 Service detail page template (`/services/[slug]`)
1. **Intro**: title, summary, target audience, the problem it solves, primary CTA.
2. **Solution**: sub-services grid with specific deliverables.
3. **Scope**: work process steps and delivery assumptions.
4. **Proof**: related case study, sample or live demo (matched by category).
5. **Pricing**: package or custom quotation, with additional costs spelled out.
6. **After delivery**: maintenance and support, service FAQ, **Book a Consultation** CTA.

Pricing formats: **fixed package · custom quote · monthly support**. Each states its deliverables, revisions, support period and additional costs.

### 7.2 The six services (content for `content/services.ts`)

**1. AI & ML Learning** — `ai-ml-learning` · icon `BrainCircuit`
- **What it is**: personal guidance, mentoring and institution-based training. Regular courses live in the Academy.
- **Who it's for**: students, beginners, researchers, teachers, business teams.
- **Sub-services**: AI Fundamentals Training · Machine Learning Fundamentals · Deep Learning Introduction · Generative AI & LLM Fundamentals · Python for AI & Data Science · Data Analysis & Visualization Training · Prompt Engineering · Computer Vision & NLP Introduction · AI/ML Project Mentorship · Model Evaluation & Result Interpretation · University Workshop & Bootcamp · Corporate AI Training · Personalized Learning Roadmap.
- **CTA**: Explore Courses / Book Learning Guidance.

**2. AI Automation** — `ai-automation` · icon `Workflow`
- **What it is**: automation design, integration and support that make repetitive business work simple and organized.
- **Sub-services**: Business Workflow Automation · Lead Collection, CRM Integration & Follow-up · Email & Notification Automation · Appointment Booking & Reminder · Website Customer Support Chatbot · WhatsApp/Messenger Integration (on supported platforms) · Internal Knowledge Assistant · Document & Invoice Data Extraction · Google Sheets/Excel Reporting Workflow · E-commerce Order Notification · AI Agent & Tool Integration · Existing Automation Audit & Maintenance.
- **Notes**: human review, error handling and manual handover where needed. Setup fee, maintenance and third-party tool/API costs are shown **separately**.
- **CTA**: Discuss Your Automation.

**3. AI Content Creation** — `ai-content-creation` · icon `Sparkles`
- **What it is**: AI-assisted creative production for businesses, personal brands and learning.
- **Sub-services**: Social Media Content · Product Images & Promotional Visuals · Advertising Creative · Short Video & Reels · Video Script & Storyboard · AI-assisted Voiceover · Blog & Website Content · Product Description · Presentation & Training Content · Thumbnail, Banner & Poster · Content Calendar · Bangla–English Content Adaptation · Brand Content Workflow Setup.
- **Notes**: each package states content quantity, format, revision limit and delivery time.
- **CTA**: Request a Content Package.

**4. Digital Marketing** — `digital-marketing` · icon `Megaphone`
- **What it is**: reach the right audience and measure campaign results.
- **Sub-services**: Digital Marketing Strategy · Social Media Management · Facebook & Instagram Advertising · Google Ads · SEO & Local SEO · Business Profile Optimization · Content Marketing & Email Marketing · Lead Generation Campaign · Landing Page Optimization · Conversion Tracking & Analytics · Campaign Reporting · Marketing Automation.
- **Notes**: agency fee and ad budget are **separate**. No guarantees of leads or sales. Instead, show the scope, how results are measured and how they're reported.
- **CTA**: Plan Your Marketing.

**5. Web Development** — `web-development` · icon `Code2`
- **What it is**: websites and web applications for institutions, businesses and digital products.
- **Sub-services**: Business & Corporate Website · Portfolio & Personal Brand Website · Landing Page · E-commerce Website · Learning Management System (LMS) · Course Selling Website · Booking & Appointment Website · Custom Web Application & Admin Dashboard · Blog & CMS · API & Payment Integration · AI Chatbot Integration · Website Redesign · Speed & Mobile Optimization · Website Maintenance & Support.
- **Notes**: proposals list page count, features, content responsibilities, hosting/domain cost, delivery scope and support period.
- **CTA**: Start Your Website Project.

**6. Virtual Assistant** — `virtual-assistant` · icon `Headset`
- **What it is**: remote administrative, research and operational support.
- **Sub-services**: Email & Inbox Management · Calendar, Meeting & Appointment Management · Data Entry & Spreadsheet Management · Online Research · Document & Presentation Preparation · CRM Update & Lead Organization · Customer Support Assistance · E-commerce Product Listing & Order Tracking · Social Media Scheduling · Meeting Notes & Follow-up Preparation · AI-assisted Administrative Support.
- **Notes**: packages are hourly, monthly or task-based. Responsibilities, access permissions, working hours and response expectations are agreed **before** work starts.
- **CTA**: Find Your Support Plan.

---

## 8. AIDMBD Learning Academy

### 8.1 Academy home (`/academy`)
- Format filter: **All Courses · Live Classes · Recorded Courses**.
- Level filter: **Beginner · Intermediate · Advanced**.
- Four categories:

| Category | What you learn | Format |
|---|---|---|
| AI Automation | Workflows, chatbots, agents, integrations | Live / Recorded |
| AI & Machine Learning | From foundations to applied projects | Live / Recorded |
| AI/ML/LLM Research Paper Writing | Research, experiments, academic writing | Live / Recorded |
| Programming | Python, Java, C, C++ | Live / Recorded |

**Launch with 2–3 ready courses.** The rest show **Join Waitlist**. A full learning path can be split into smaller courses.

### 8.2 Course modules
- **AI Automation**: Automation Fundamentals & Workflow Mapping · No-code/Low-code Automation · Triggers, Actions & Webhooks · API Fundamentals · Google Sheets & CRM Integration · Email & Booking Automation · AI Chatbot Development · AI Agents & Tool Use · Error Handling & Human Approval · Deployment, Monitoring & Cost Management · Final Business Automation Project.
- **AI & Machine Learning**: AI & ML Fundamentals (+ required Python) · Mathematics & Statistics Foundations · NumPy, Pandas & Data Visualization · Data Cleaning & Preprocessing · Regression, Classification & Clustering · Model Evaluation & Feature Engineering · Deep Learning Introduction · NLP & Computer Vision Introduction · Generative AI & LLM Introduction · Model Deployment Basics · Practical Capstone Project.
- **Research Paper Writing** (learners plan, run, analyze and write up their own research): Research Fundamentals & Ethics · Topic Selection · Literature Search & Review · Research Gap Identification · Research Question & Objectives · Dataset Selection & Data Documentation · Methodology & Experimental Design · Baseline & Model Comparison · Evaluation Metrics · Reproducibility & Experiment Tracking · Results, Tables & Figures · Discussion & Limitations · Abstract, Introduction & Conclusion Writing · Citation & Reference Management · LaTeX/Overleaf Introduction · Journal/Conference Selection · Submission & Reviewer Response · Research Proposal/Paper Draft Project.
  - *Advanced LLM modules*: Prompting vs Fine-tuning vs RAG · LLM Evaluation · Hallucination & Error Analysis · Benchmark Selection · Ablation Study · Compute/API Cost Reporting.
  - Includes mentoring and draft feedback. **Never say publication or acceptance is guaranteed.** Research results, references and citations must be verified.
  - Research learner path: view syllabus → set skill level and research goal → choose class or mentorship → book Research Mentorship if needed → enrollment and project-based learning.
- **Programming** (start with beginner courses; advanced and problem-solving courses come later):

| Course | Main topics | Sample project |
|---|---|---|
| Python | Syntax, functions, data structures, files, OOP, libraries | Data analysis or small automation |
| Java | Syntax, OOP, collections, exceptions, file handling | Console management application |
| C | Variables, operators, loops, arrays, functions, pointers, structures | Student record management |
| C++ | Fundamentals, OOP, STL, searching, sorting, DSA intro | Problem-solving and management project |

### 8.3 Course detail page (`/academy/courses/[slug]`): required fields
1. Title, format and level
2. Overview, learning outcomes and prerequisites
3. Module-wise syllabus and project list
4. Instructor photo, bio and relevant experience
5. Language and total lessons or class duration
6. For live courses: date, time, timezone and whether recordings are available
7. Notes, code, datasets and templates
8. Support channel and support duration
9. Quizzes, assignments and project assessment
10. Certificate conditions
11. Course fee and any additional tool cost
12. Access duration, refund and cancellation terms
13. CTA: **Enroll / Join Waitlist / Ask a Question**

**Live vs Recorded** (shown on every course page):
- **Recorded**: self-paced after enrollment, with module progress and a defined support level.
- **Live**: a fixed batch with a class schedule, instructor-led Q&A, and recordings according to the terms.

Access and support policies are stated separately for each format.

### 8.4 How Phase 4 implements it
- **Courses** (`content/courses.ts`): eight courses split from the four paths, as §8.1 allows:
  - Practical AI Automation (Beginner)
  - AI & Machine Learning Foundations (Beginner)
  - Research Paper Writing for AI & ML (Intermediate)
  - Advanced LLM Research Methods (Advanced, live only, built from the advanced modules)
  - Python, Java, C and C++ Programming (Beginner)

  Syllabi come from §8.2. Outcomes, prerequisites, projects, resources, assessment, certificate conditions, tool costs and the language are drafts for the client.
- **Waitlist first.** No course has a confirmed fee, schedule or instructor, so every course has `status: "waitlist"`. Unset fields (instructor, duration, live batch, fee, support, access) render as "Announced at launch" and are never invented.
  - Setting `status: "enrolling"` switches the copy to "Request enrollment". That covers the 2–3 launch courses once their details are confirmed, until payments exist.
- **`/academy`**: learning paths, Live vs Recorded cards (`#live`, `#recorded`; the footer links land there), then the catalogue (`#courses`).
  - Format and level filters are component state. Next keeps the page mounted after navigation, so filters survive a trip to a course and back.
  - "Browse live courses" filters the grid and moves to it.
- **`/academy/[category]`**: syllabus (or the four language tracks), the research learner path with its cautions on the research page, the path's courses, the course FAQs, and a guidance booking.
- **`/academy/courses/[slug]`**: all 13 fields of §8.3, including Live vs Recorded marked "Offered" or "Not offered" for that course.
- **Waitlist form**: `useActionState` with the Server Action `app/academy/actions.ts`, so it also works without JavaScript.
  - The same validator (`lib/waitlist.ts`) runs in the browser first.
  - It has the same honeypot and email delivery as booking.
- **"Ask a question"** opens `/book` as Learning Guidance, or Research Mentorship for the research path, with the path pre-selected (`?course=`).

---

## 9. Booking (`/book`)

### 9.1 Booking types
| Type | Discussion topic |
|---|---|
| Business Consultation | Understand needs, choose the right service |
| Project Discussion | Website, automation, content or marketing project |
| Learning Guidance | Right course and learning path |
| Research Mentorship | Topic, methodology or draft review |
| Corporate Training | Team size, goals, delivery format |

Each type shows its duration, its fee (if any), its format (online or in person) and **what to prepare**.

### 9.2 Fields
- **Required**:
  - Full Name and Email
  - Booking Type and Service/Course Interest
  - Preferred Date and Available Time Slot
  - Timezone (auto-detected with `Intl`, editable)
  - Short Description
- **Optional**, shown depending on the booking type:

  | Booking type | Extra fields |
  |---|---|
  | All types | Phone/WhatsApp |
  | Business Consultation, Project Discussion | Company, Website Link, Budget Range, Expected Timeline |
  | Learning Guidance | Current Skill Level |
  | Research Mentorship | Institution, Current Skill Level |
  | Corporate Training | Company/Institution, Budget Range, Expected Timeline |

### 9.3 Flow
1. Choose meeting type.
2. See duration and fee.
3. Pick date and time.
4. Confirm the time in your own timezone.
5. Fill in details.
6. Review the booking.
7. Confirmation.
8. Calendar invite and meeting link.
9. Reminder.
10. Reschedule or cancel.

- **Phase 3 builds steps 1–7 as "Request a Meeting"**, because no live calendar is connected yet:
  - It's a multi-step client form with a Server Action that validates on the server, plus a honeypot field for spam.
  - The success screen says **"Request received — we'll confirm by email."** It must never say "confirmed" before the team confirms.
  - `?type=` pre-selects the type. Read it with `useSearchParams` inside a `Suspense` boundary.
- **Later**: calendar integration for steps 8–10 (invites, reminders, reschedule/cancel).
- The booking page states the format, free/paid status, duration, timezone, preparation and cancellation/rescheduling terms.

### 9.4 How Phase 3 implements it
- **Screens**:
  1. *Meeting*: type cards, then a details panel showing duration, fee, format and what to prepare (flow steps 1–2). Then the interest picker: services first, or courses first for learning types.
  2. *Date & time*: date (tomorrow to +90 days), a preferred window (Morning, Midday, Afternoon or Evening) and the timezone. A summary restates the choice, plus the Dhaka-time equivalent when the zones differ (flow steps 3–4).
  3. *Your details* (flow step 5), with conditional fields per §9.2.
  4. *Review*, with an Edit link per section (flow step 6).
  5. *Success* (flow step 7).
- **One validator** (`lib/booking/schema.ts`) runs per step in the browser and again in the Server Action.
  - The server re-validates whatever was posted and drops fields the chosen type doesn't ask for.
  - Server errors reopen the step with the first error.
- **Static page**: `?type=` and `?service=` are read with `useSearchParams` inside `Suspense`. The fallback is the same form without a pre-selection, so the prerendered HTML is a working form.
- **Delivery**: `lib/email.ts` posts a plain-text email to Resend's REST API, with the visitor as reply-to. Every form shares it. It's configured by `RESEND_API_KEY`, `EMAIL_TO` and `EMAIL_FROM` (see `.env.example`).
  - Unconfigured in development: the request is logged and the visitor sees success.
  - Unconfigured in production: the visitor sees an error. A request is never silently dropped.
- **Spam**: a hidden honeypot field (`homepage`). Bots that fill it get a fake success and nothing is sent.
- **Draft content** to confirm with the client lives in `content/booking.ts`: durations, formats, what to prepare, budget ranges (USD) and the rescheduling terms. Fees read "Agreed before the meeting" until set.

---

## 10. Case Studies
- Filters: **All · AI Automation · Web Development · Data & ML · Content · Marketing**.
- Each case study covers:
  - client/project context and the core problem
  - objectives, scope and AIDMBD's role
  - the solution applied
  - screenshots, video or live demo
  - verified results and limitations
  - related service and a **Discuss a Similar Project** button
- Self-made samples are **labelled "Demo Project"**. A portfolio piece shows what was built; a case study explains why and what the result was.
- Suggested demos:
  - Textile production planning dashboard
  - Demand forecasting system. Must state its data, test period, baseline and evaluation limitations.
  - Bangla–English FAQ assistant
  - Lead follow-up workflow
  - Course learning portal

## 11. Blog
- Categories: AI & Machine Learning · Automation Tutorials · AI Content Creation · Digital Marketing · Web Development · Programming · Research & Academic Writing · AIDMBD Updates.
- Each article shows the author, published/updated date, category and a related course or service.
- Posts are written in MDX (`content/blog/*.mdx`, via `@next/mdx`; read `02-guides/mdx.md`).
- Community, with moderated learner projects and workshop announcements, comes later. A newsletter is optional.

## 12. About, Careers, Contact, FAQ, Policies
- **About**: the company's purpose and areas of work; the founder's **real photo** and verifiable bio; team roles; delivery process. Founder credibility should reinforce the company brand.
- **Careers**:
  - Content: Why AIDMBD, real openings (type/location, responsibilities, required skills, deadline), hiring process, CV/portfolio form, applicant privacy notice.
  - With no openings, show "No current openings" plus a talent-pool form.
  - Terms for jobs, internships and paid training are stated separately.
  - The application form ships in Phase 7.
- **Contact**: business email, phone/WhatsApp, a short contact form and a link to `/book`.
- **FAQ**: services, courses, support, pricing.
- **Policies**: Privacy Policy, Terms of Service, Course Refund Policy, Cancellation (project cancellation and payment terms), and certificate conditions.

### 12.1 How Phase 5 implements §10–12
- **Case studies** (`/case-studies`, `/case-studies/[slug]`):
  - A category filter (component state) with an empty state.
  - Each page follows §10 in order: context and problem with objectives, scope and AIDMBD's role, solution and features, results and limitations, then **Discuss a Similar Project** (pre-selects the related service in `/book`).
  - All five suggested demos are listed openly as **Demo Project · In development**. Pages show "measured results will be published once complete, never estimates". The briefs are drafts.
  - Until real screenshots exist, each demo shows a **concept preview** (`preview` in `content/caseStudies.ts`, images in `public/images/case-studies/*-preview.png`, HTML sources in `design/case-study-previews/` rendered at 800×500, 2× scale): a mock-up of the planned interface with sample data, labelled "Concept preview" on the card and captioned on the detail page. Previews never show results or accuracy figures. The first screenshot replaces the preview automatically.
  - When a demo is finished, add its `screenshots`, `demoUrl` and verified `results` and set `status: "complete"`. The forecasting demo must then state its data, test period, baseline and limitations.
- **Blog** (`/blog`, `/blog/[slug]`):
  - Posts are MDX (`content/blog/<slug>.mdx`, imported by the route) with typed metadata in `content/posts.ts`. Reading time is counted at 220 words a minute.
  - Each post shows the author, date, category, reading time and a related course or service.
  - The three launch articles are full drafts dated 25 October 2026. Confirm the author and set the dates at launch.
  - `mdx-components.tsx` styles long-form text.
- **About**: purpose, the two halves of the business, principles, delivery process, and team roles at `#team`. The founder section appears only once `founder` in `content/about.ts` has a real photo and a verifiable bio.
- **Careers**: why AIDMBD, openings (none, so "No current openings"), how roles' terms differ, the hiring process, a talent pool form and an applicant privacy note. CV upload waits for Phase 7.
- **Contact**: a contact form with topics (including Student support at `#student-support`, where the footer link lands) and booking. Email, phone and WhatsApp show once `contactDetails` is set.
- **FAQ**: every FAQ, grouped, with jump links.
- **Policies** (`/policies/[slug]`, MDX): privacy, terms (including certificate conditions), refund and cancellation.
  - These are plain-English drafts that describe only what the site does: its four forms, Resend for email, and no analytics cookies.
  - Specific promises (refund windows, project cancellation terms, retention periods) are left to the course page or proposal rather than invented.
  - **They need legal review before launch**, and then an `updatedAt` date.
- **Forms**: contact, talent pool and the course waitlist share `components/forms/useFormSubmission.ts` (browser checks, focus on the first error, keeping errors in sync with the server's), `FormParts.tsx` and `lib/submit.ts` (honeypot, validate again, email). All three work without JavaScript.
- **404**: the temporary catch-all is gone and `app/not-found.tsx` (built early, from Phase 6) handles unknown URLs with a real 404.

## 13. Student dashboard and admin (Phase 7, needs backend decisions)
- **Student dashboard**: My Courses and Continue Learning · lesson and module list · recorded video player · upcoming live classes with join link · class recordings · notes, code and resources · assignment submission · quiz and progress · instructor feedback · support · certificate · payment history and invoices.
  - Live flow: Enroll → Schedule → Join Class → Recording → Assignment.
  - Recorded flow: Enroll → Watch Lessons → Practice → Assessment → Completion.
- **Admin panel** manages:
  - services, packages, blog and case studies
  - courses, lessons, resources, batches and enrollments
  - leads, bookings, applications and follow-ups
  - payment status, invoices and refunds
  - student access and staff permissions
- **Payments**: confirm the business is eligible for, and can access, the chosen provider (local gateway and/or international cards) **before** picking one. Verify payments server-side.

---

## 14. Content and trust rules
- No fabricated testimonials, client logos or statistics. Every one must be real, permission-based and verifiable.
- Self-made work is labelled **Demo Project**.
- No guarantees about research publication, leads or sales. Describe scope, measurement and reporting instead.
- Fees are always separate from third-party costs: ad budget, tool/API fees, hosting and domain.
- Pricing states its deliverables, revisions, support period and additional costs.
- Course language and currency (BDT/USD) are always stated.
- **All copy lives in `content/*.ts` or MDX**, never hard-coded in components. That makes Bangla translation and a later CMS straightforward.

---

## 15. Technical requirements

### 15.1 Next.js 16.4 rules
| Rule | Read first |
|---|---|
| `params` is a Promise. `await` it in pages, and type it with `PageProps<'/services/[slug]'>`. In layouts, don't await params at the top level. | `03-api-reference/03-file-conventions/dynamic-routes.md`, `page.md` |
| Cache Components is on. Pages are prerendered, so avoid request-time APIs at the top level. Every `[slug]` route exports `generateStaticParams`. | `01-getting-started/08-caching.md`, `02-guides/keeping-pages-static.md`, `04-functions/generate-static-params.md` |
| The Header uses `usePathname` for the active link. This is fine on static routes. If a route with unknown dynamic params is ever added, wrap the Header nav in `Suspense`. | `04-functions/use-pathname.md` |
| `useSearchParams` always goes inside `<Suspense>`. | `04-functions/use-search-params.md` |
| Server Components by default. Add `"use client"` only to interactive or animated leaves (motion primitives, Service Explorer, menus, forms). | `01-getting-started/05-server-and-client-components.md` |
| `next/image`: `priority` is deprecated. For the hero image use `preload` or `fetchPriority="high"`, and always set `sizes`. | `02-components/image.md` |
| Fonts via `next/font/google`, exposed as CSS variables in `@theme`. | `01-getting-started/13-fonts.md` |
| Use the `metadata` / `generateMetadata` exports, plus `app/sitemap.ts`, `app/robots.ts`, `opengraph-image` and Organization JSON-LD. | `01-getting-started/14-metadata-and-og-images.md`, `02-guides/json-ld.md` |
| Forms use Server Actions with server-side validation. | `02-guides/forms.md`, `02-guides/server-actions.md` |
| Tailwind v4 is configured in CSS only (`@import "tailwindcss"` + `@theme`). | `01-getting-started/11-css.md` |
| Dynamic pages whose params are all prerendered export `instant = false` and read params at the top level. Wrapping a large page in `<Suspense>` to satisfy the dev "URL data outside of Suspense" insight makes React paint the fallback first and shifts the layout on direct visits (measured: CLS 0.48). | `02-guides/adopting-partial-prefetching.md`, `03-file-conventions/02-route-segment-config/instant.md` |

### 15.2 Quality bar
- Responsive layout, optimized images and fast loading. Targets: Lighthouse **≥90 performance** and **≥95 accessibility, best practices and SEO** on Home and on one service page.
- Readable contrast, labelled forms and full keyboard navigation.
- Spam protection on forms (honeypot, plus a rate limit when the backend arrives). Secrets stay in environment variables, server-only.
- Custom `not-found.tsx`. No broken internal links. Error monitoring and backups come with the backend phase.
- Unique title and description for every page, a sitemap and social preview images.
- Later (Phase 7): secure authentication, role-based access and controlled course access.

### 15.3 How Phase 6 implements SEO and polish
- **Site address**: `SITE_URL` (see `.env.example`; on Vercel the production domain is used if it's unset) sets `metadataBase`, canonical URLs, the sitemap, `robots.txt`, social images and structured data. A production build warns if it's missing.
- **Page metadata**: every page uses `pageMetadata()` (`lib/metadata.ts`) for title, description, canonical URL and complete Open Graph and Twitter cards.
  - Next replaces, rather than merges, a parent's `openGraph`, so the helper always sets every field.
  - It leaves `title` out on the home page, because an explicit `undefined` erases the layout's default title.
  - Routes with their own image pass `ownImage: true`, because images set in metadata override a route's `opengraph-image` file.
  - Service pages use a written `metaDescription` (160 characters or fewer). Academy path titles end in "Courses" so they don't clash with service names.
- **Social images**: generated at build time by `lib/og.tsx` with the brand font (`assets/fonts`, SIL OFL). There's one default (`app/opengraph-image.tsx`) and one per service, Academy path, course, case study and article, 27 in all. Demo case studies carry "Demo Project" on their image.
- **Sitemap and manifest**: `app/sitemap.ts` lists all 40 pages from the content files, with `lastModified` only where a real date exists. `app/robots.ts` points to it. `app/manifest.ts` is the web manifest.
- **Structured data** (`lib/structuredData.ts`, rendered by `components/seo/JsonLd.tsx` with `<` escaped):
  - Organization and WebSite on every page, and BreadcrumbList on every inner page (from `PageHero`).
  - Service, Course and BlogPosting on their pages.
  - No prices, ratings or schedules until confirmed. Add `sameAs` and `contactPoint` once social profiles and contact details exist.
- **Security headers** (`next.config.ts`): a static Content Security Policy (no nonces, so pages stay prerendered), plus `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and `Permissions-Policy`. HSTS is left to the host.
- **Scrolling**: `<html data-scroll-behavior="smooth">` lets Next turn smooth scrolling off during route changes (Next 16 behaviour).
- **Images**: AVIF first, then WebP. The header logo source is 608px (master in `design/`) with a `sizes` hint, so it ships as a 256px AVIF of about 8 KB instead of a 384px image.
- **Not done**: the optional Bangla version (§17). It needs a reviewed translation of every page and the client's go-ahead.

---

## 16. Code structure
```
app/
  layout.tsx            # fonts, metadata, <MotionProvider>, <Header>, <Footer>, skip link
  page.tsx              # Home: composes components/sections/home/*
  globals.css           # @theme tokens, gradients, hero keyframes
  services/page.tsx  services/[slug]/page.tsx
  book/page.tsx  book/actions.ts
  academy/page.tsx  academy/[category]/page.tsx  academy/courses/[slug]/page.tsx
  academy/actions.ts  contact/actions.ts  careers/actions.ts   # Server Actions
  case-studies/page.tsx  case-studies/[slug]/page.tsx  blog/page.tsx  blog/[slug]/page.tsx
  about/  careers/  contact/  faq/  policies/[slug]/page.tsx
  not-found.tsx  robots.ts  sitemap.ts  manifest.ts  icon.png  apple-icon.png
  opengraph-image.tsx   # default social image; services/[slug], academy/[category],
                        # academy/courses/[slug], case-studies/[slug], blog/[slug] have their own
mdx-components.tsx      # long-form styles for MDX posts and policies
assets/fonts/           # Plus Jakarta Sans TTFs (+ OFL licence) for social images
components/
  layout/   Header.tsx  NavDropdown.tsx  MobileMenu.tsx  Footer.tsx  Logo.tsx  navStyles.ts
  ui/       Button.tsx  Container.tsx  Section.tsx  SectionHeading.tsx  Eyebrow.tsx  Overline.tsx
            Card.tsx  Badge.tsx  Accordion.tsx  Breadcrumb.tsx  Icon.tsx  IconCircleArrow.tsx
            Field.tsx (TextField, SelectField, TextAreaField, FieldError: label, hint, error, aria wiring)
            ChoiceCard.tsx (radio drawn as a card)  FilterPills.tsx (radio filter drawn as pills)
  motion/   MotionProvider.tsx  Reveal.tsx  Stagger.tsx  Orbit.tsx  easing.ts
  sections/ PageHero.tsx (inner-page h1 + breadcrumb)  Process.tsx  ProcessTimeline.tsx
            BookingCta.tsx (props override the homepage copy)  FaqBlock.tsx (heading + accordion)
  sections/home/  Hero.tsx  HeroVisual.tsx  QuickCards.tsx  ServicesSection.tsx
            ServiceExplorer.tsx  ServiceAccordion.tsx  ServicePanel.tsx
            CaseStudiesPreview.tsx  AcademyPreview.tsx  AboutPreview.tsx
            Testimonials.tsx  LatestPosts.tsx  FaqSection.tsx
  services/ ServiceCard.tsx  ServiceIntro.tsx  ServiceIncluded.tsx  ServiceDelivery.tsx
            ServiceProof.tsx  ServicePricing.tsx  ServiceFaq.tsx  OtherServices.tsx
  case-studies/  CaseStudyCard.tsx  CaseStudyArt.tsx (placeholder art)  CaseStudyCatalog.tsx (client)
            detail/  CaseStudyHero.tsx  CaseStudyMedia.tsx  CaseStudyStory.tsx
  blog/     PostCard.tsx  BlogCatalog.tsx (client)
  forms/    useFormSubmission.ts  FormParts.tsx (Honeypot, FormAlert, SubmitRow, FormSuccess)
  seo/      JsonLd.tsx
  contact/  ContactForm.tsx      careers/  TalentPoolForm.tsx
  academy/  CategoryCard.tsx  CourseCard.tsx  FormatCard.tsx (Live or Recorded)
            CourseCatalog.tsx (client: filters + grid)  WaitlistForm.tsx (client)
            category/  CategorySyllabus.tsx  ResearchPath.tsx
            course/  CourseHero.tsx (with facts)  CourseOverview.tsx  CourseSyllabus.tsx
                     CourseFormats.tsx  CourseDetails.tsx  CourseEnroll.tsx
  booking/  BookingFlow.tsx (client: steps, validation, submit)  BookingFromUrl.tsx (?type/?service)
            StepIndicator.tsx  BookingSuccess.tsx  BookingAside.tsx
            useBrowserTime.ts (detected timezone, today, zone list)
            steps/  TypeStep.tsx  TimeStep.tsx  DetailsStep.tsx  ReviewStep.tsx
content/    site.ts (nav, footer, socials, contact)  home.ts (homepage copy)  process.ts  services.ts
            academy.ts (paths + Academy copy)  courses.ts  caseStudies.ts  testimonials.ts  faqs.ts
            booking.ts (types, slots, options, labels, errors, page copy)
            posts.ts + blog/*.mdx  policies.ts + policies/*.mdx  about.ts  careers.ts  contact.ts
            forms.ts (copy shared by every form)
lib/        cn.ts  types.ts  format.ts (dates)  forms.ts (types, honeypot, checks, text cleanup)
            email.ts (server-only Resend delivery)  submit.ts (server-only shared action body)
            waitlist.ts  contactForm.ts  talentPool.ts (shared validators)
            siteUrl.ts  metadata.ts (pageMetadata)  og.tsx (social images)  structuredData.ts
  booking/  schema.ts (shared validator)  time.ts (timezone helpers)  summary.ts (review and email rows)
            interests.ts (options built on the server)  email.ts (formats the meeting request)
.env.example   # RESEND_API_KEY, EMAIL_TO, EMAIL_FROM, SITE_URL
public/brand/  logo.png  logo-mark.png      public/images/  founder.png  case-studies/*
```

Conventions:
- One component per file. Use named exports, except the `default` exports that pages and layouts require.
- Type props explicitly. Content types live in `lib/types.ts`.
- Sections receive data from `content/` and stay presentational.

---

## 17. Build plan, step by step

### Phase 0: Foundation
1. `npm i motion lucide-react`.
2. Brand assets: crop the logo and remove its background (§4). Add `icon.png` and `apple-icon.png`.
3. `globals.css`:
   - Add the `@theme` tokens (§3.2), gradients and glow utilities.
   - Add the hero fade-up keyframes and focus-ring base styles.
   - Remove the light/dark media switch.
4. `layout.tsx`:
   - Load Plus Jakarta Sans and set the site metadata (title template `%s · AIDMBD International Ltd`).
   - Set `<html className="bg-ink-950 text-titanium-50">` and add `MotionProvider` and the skip link.
5. UI primitives: `Container`, `Section`, `SectionHeading`, `Button` (primary/outline/link, with arrow), `Card`, `Badge`, `Accordion`.
6. Motion primitives: `Reveal`, `Stagger`, `Orbit` (SVG ellipse with `pathLength` draw and a travelling glow node).
7. Content files: `site.ts`, `services.ts` (all of §7.2), `faqs.ts`, `caseStudies.ts` (demo seeds), `academy.ts`.

**Done when**: `npm run lint` and `npm run build` pass, and a temporary page renders the tokens, buttons and cards correctly.

### Phase 1: Landing page (priority)
Build in order, and check each section at 360, 768, 1280 and 1440 before moving on:
1. Header, desktop dropdown and mobile menu.
2. Hero and Quick Cards.
3. Services section and Service Explorer.
4. Case Studies preview.
5. Academy preview.
6. How We Work.
7. About preview.
8. Testimonials (conditional).
9. Latest Blog (placeholder posts until Phase 5).
10. FAQ.
11. Booking CTA band.
12. Footer.

**Done when**:
- All links resolve (to real pages, `#anchors`, or the `/book` stub).
- Keyboard pass is clean, and reduced motion is respected.
- Lighthouse meets §15.2.
- No console errors.

### Phase 2: Service pages
`/services` (overview grid) and `/services/[slug]` following the §7.1 template, with `generateStaticParams` and `generateMetadata`.

**Done when**: all 6 render from data with their correct CTAs and service-specific notes.

### Phase 3: Booking
Build `/book` as the multi-step request flow (§9) with a Server Action. Delivery defaults to email.

**Done when**:
- Required fields are validated on client and server.
- Conditional fields show for each type, and `?type=` pre-selects.
- The honeypot blocks bots.
- The success copy never says "confirmed".

### Phase 4: Academy
`/academy` (client-side filters), the category pages, and course detail pages with all 13 fields. Unready courses show **Join Waitlist**.

### Phase 5: Supporting pages
Case Studies (filters and detail pages), Blog (MDX, categories), About (with `#team`), Careers (no-openings state and talent pool), Contact, FAQ, Policies.

### Phase 6: SEO and polish (done, see §15.3)
- `sitemap.ts`, OG images, JSON-LD. (`robots.ts` shipped in Phase 1 and `not-found.tsx` in Phase 5.)
- Full accessibility and Lighthouse pass, plus an image optimization review.
- Optional, not started: the Bangla version through a `[lang]` segment (read `02-guides/internationalization.md`). The language switch opens the same page in the other language.

### Phase 7: Platform (after backend decisions)
Auth and student dashboard, payments, admin panel, calendar booking (invites, reminders, reschedule), careers applications, certificate verification, community and newsletter, client portal.

**First launch (from the PDF)**:
- Pages: Home, the 6 service pages, Academy, ready course pages, Case Studies, About, Blog, Booking, Contact, Policies. That's Phases 0–6.
- If recorded courses are sold directly at launch, payments and student access must ship too. Otherwise use inquiry or waitlist.

---

## 18. Needed from the client before or while building
- [ ] Final logo as a transparent PNG/SVG, and confirmation of the brand colours
- [ ] Company and founder introduction, plus the founder's real photo (transparent cut-out for the hero)
- [ ] Service scope, packages and support terms
- [ ] At least 2–3 strong projects or demos, with screenshots
- [ ] Course syllabi, preview lessons and instructor details (photo, bio)
- [ ] Testimonials, with permission
- [ ] Business email, contact details and meeting availability
- [ ] Booking details: duration, fee and format per meeting type, what to prepare, budget ranges and currency, rescheduling terms (drafts in `content/booking.ts`)
- [ ] A Resend account with a verified sending domain, and the inbox that receives requests
- [ ] Build the demo projects (or supply real client work) with screenshots and measured results (`content/caseStudies.ts`)
- [ ] Legal review of the four policy drafts in `content/policies/`, then publish dates
- [ ] Confirm the three draft blog articles, their author and publish dates
- [ ] Team roles on About, the Careers copy and hiring process, and any real openings
- [ ] The 2–3 courses to open first, each with fee (BDT/USD), schedule, instructor, duration, support and access terms; confirmation of the draft course text and teaching language in `content/courses.ts`
- [ ] Decisions on payment, refund and cancellation
- [ ] Domain and the necessary account access, then set `SITE_URL` for production builds
- [ ] Official social profile URLs (footer icons and the organization's structured data)

## 19. Open decisions (and the defaults used until decided)
| Decision | Default |
|---|---|
| Launch language | English first. All copy kept in `content/` so Bangla can be added later. |
| Where booking and contact submissions go | Server Action → email via Resend (built in Phase 3, see §9.4). Calendar integration later. |
| Team timezone for confirming requests | Asia/Dhaka. The booking flow shows visitors the Dhaka-time equivalent. |
| Content source | Typed TS files plus MDX for the blog. Admin/CMS in Phase 7. |
| Recorded course sales at launch | Waitlist (built in Phase 4), or an enrollment request once a course is confirmed, until payment and auth are chosen |
| Hosting | Vercel (native Next.js). Netlify, where the old site lives, also works. |
| Primary nav CTA label | "Book a Consultation", the PDF's suggested natural label |

## 20. Success metrics
| Area | Measure |
|---|---|
| Services | Qualified inquiries, booked meetings, accepted proposals |
| Academy | Preview views, enrollments, completion rate, refund rate |
| Content | Relevant traffic and its contribution to inquiries and enrollments |
| Support | Response time, unresolved requests |

---
*Reference sites used in the original plan: thedevelopsuite.com/services, badarmunir.co. The service and course lists here are a proposed structure. Finalize them against real delivery capacity, fees, schedules and instructor availability.*
