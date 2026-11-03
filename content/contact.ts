// Business email and phone are pending from the client (requirements §18); set them here to
// show them on the contact page. `whatsapp` also sends meeting requests from /book to that
// WhatsApp number (content/booking.ts) until the email service is set up.
export const contactDetails: { email?: string; phone?: string; whatsapp?: string } = {
  whatsapp: "+880 1575-413638",
};

export const contactTopics = [
  { value: "services", label: "Services or a project" },
  { value: "courses", label: "Courses and the Academy" },
  { value: "student-support", label: "Student support" },
  { value: "partnerships", label: "Partnerships" },
  { value: "other", label: "Something else" },
];

export const contactPage = {
  description: "Contact AIDMBD International Ltd about services, courses, student support or partnerships, or book a consultation.",
  eyebrow: "Contact",
  title: "Let's talk.",
  intro: "Send us a message and we'll reply by email. For a project or learning guidance, booking a consultation is the fastest way to start.",
  form: {
    title: "Send a message",
    labels: { fullName: "Full name", email: "Email", topic: "Topic", message: "Message" },
    submit: "Send message",
    success: {
      title: "Message sent.",
      intro: (email: string) => `Thanks for getting in touch. We'll reply to ${email} by email.`,
    },
  },
  book: {
    title: "Book a consultation",
    intro: "Choose a meeting type and a time that suits you, and we'll confirm it with you.",
    cta: { label: "Book a Consultation", href: "/book" },
  },
  support: {
    title: "Student support",
    intro: "Enrolled in a course? Choose Student support as the topic and include the course name, so your message reaches the right person.",
  },
  details: { title: "Direct contact", email: "Email", phone: "Phone", whatsapp: "WhatsApp" },
};
