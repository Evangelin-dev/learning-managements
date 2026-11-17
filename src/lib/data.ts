import heroLearner from "@/assets/hero-learner.jpg";
import courseBusiness from "@/assets/course-business.jpg";
import courseStudy from "@/assets/course-study.jpg";

export const images = { heroLearner, courseBusiness, courseStudy };

export const BRAND = {
  name: "Vilaiyosai",
  email: "hello@vilaiyosai.edu",
  phone: "+91 98765 43210",
  address: "12 Anna Salai, Chennai 600002",
  whatsapp: "+91 98765 43210",
  hours: "Mon–Sat, 10:00 AM – 7:00 PM IST",
};

// ------------------------------------------------------------------
// THE single course sold on this website (Share Market course)
// ------------------------------------------------------------------

export type Lesson = { id: string; title: string; duration: string; seconds: number; preview?: boolean };
export type Section = { id: string; title: string; lessons: Lesson[] };

export type CourseStatus = "published" | "draft" | "archived";
export type Category = { id: string; name: string; description: string; image: string };
export type Instructor = { id: string; name: string; title: string; bio: string; initials: string; students: number; courses: number; rating: number };

export type Course = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  // legacy multi-course fields kept for admin pages (single-course site)
  categoryId: string;
  instructorId: string;
  isFree: boolean;
  status: CourseStatus;
  previewEnabled: boolean;
  featured: boolean;
  createdAt: string;
  instructorName: string;
  instructorTitle: string;
  instructorBio: string;
  instructorInitials: string;
  image: string;
  price: number;
  discountPrice: number;
  durationHours: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  reviews: number;
  students: number;
  language: string;
  lastUpdated: string;
  accessDuration: string;
  outcomes: string[];
  includes: string[];
  sections: Section[];
};

export const COURSE: Course = {
  id: "ai-agentic",
  title: "Share Market Mastery: Zero to Confident Trader",
  categoryId: "share-market",
  instructorId: "priya",
  isFree: false,
  status: "published",
  previewEnabled: true,
  featured: true,
  createdAt: "2026-05-01",
  subtitle:
    "Learn stock market investing and trading from scratch — demat accounts, technical analysis, risk management and real strategies, explained in simple language.",
  description:
    "This complete pre-recorded course takes you from absolute beginner to a confident, disciplined market participant. You will learn how the Indian stock market works, how to open and use a demat account, how to read charts and candlesticks, how to analyse companies fundamentally, and how to manage risk so one bad trade never wipes you out. Every lesson is practical, recorded on real charts, and designed for people who have never invested before.",
  instructorName: "Priya Nair",
  instructorTitle: "SEBI-registered Research Analyst & Trader",
  instructorBio:
    "Priya has 12+ years of experience in Indian equity markets. She has trained over 11,000 students and is known for explaining complex market concepts in simple, jargon-free language.",
  instructorInitials: "PN",
  image: courseBusiness,
  price: 4999,
  discountPrice: 1999,
  durationHours: 22,
  level: "Beginner",
  rating: 4.8,
  reviews: 3214,
  students: 11480,
  language: "Hindi + English",
  lastUpdated: "November 2026",
  accessDuration: "Lifetime",
  outcomes: [
    "Understand how the Indian stock market actually works",
    "Open and use a demat & trading account confidently",
    "Read candlestick charts and key technical indicators",
    "Analyse companies with fundamental analysis",
    "Build a risk management plan for every trade",
    "Avoid the common mistakes that lose beginners money",
    "Create your first long-term investment portfolio",
    "Understand F&O, IPOs and mutual funds basics",
  ],
  includes: [
    "22 hours of on-demand video",
    "48 lessons across 8 sections",
    "Downloadable cheat-sheets & checklists",
    "Lifetime access, watch anytime",
    "Certificate of completion",
    "Access on mobile and desktop",
  ],
  sections: [
    {
      id: "s1",
      title: "Getting Started with the Stock Market",
      lessons: [
        { id: "s1-l1", title: "Welcome & course roadmap", duration: "6:24", seconds: 384, preview: true },
        { id: "s1-l2", title: "What is the share market? NSE, BSE & SEBI explained", duration: "12:10", seconds: 730 },
        { id: "s1-l3", title: "How shares are bought and sold", duration: "10:45", seconds: 645 },
        { id: "s1-l4", title: "Opening your demat & trading account", duration: "14:02", seconds: 842 },
      ],
    },
    {
      id: "s2",
      title: "Stock Market Basics",
      lessons: [
        { id: "s2-l1", title: "Types of stocks: large, mid & small cap", duration: "11:18", seconds: 678 },
        { id: "s2-l2", title: "Market orders, limit orders & stop loss", duration: "13:36", seconds: 816 },
        { id: "s2-l3", title: "Understanding indices: Nifty & Sensex", duration: "9:52", seconds: 592 },
        { id: "s2-l4", title: "Bulls, bears and market cycles", duration: "8:41", seconds: 521 },
        { id: "s2-l5", title: "Dividends, bonuses & stock splits", duration: "10:07", seconds: 607 },
      ],
    },
    {
      id: "s3",
      title: "Fundamental Analysis",
      lessons: [
        { id: "s3-l1", title: "Reading a company's balance sheet", duration: "15:22", seconds: 922 },
        { id: "s3-l2", title: "P/E, P/B, ROE — ratios that matter", duration: "14:48", seconds: 888 },
        { id: "s3-l3", title: "How to pick quality companies", duration: "16:31", seconds: 991 },
        { id: "s3-l4", title: "Red flags: companies to avoid", duration: "12:55", seconds: 775 },
      ],
    },
    {
      id: "s4",
      title: "Technical Analysis & Charts",
      lessons: [
        { id: "s4-l1", title: "Candlestick patterns for beginners", duration: "17:09", seconds: 1029, preview: true },
        { id: "s4-l2", title: "Support, resistance & trendlines", duration: "14:14", seconds: 854 },
        { id: "s4-l3", title: "Moving averages & RSI in practice", duration: "15:47", seconds: 947 },
        { id: "s4-l4", title: "Volume analysis", duration: "11:29", seconds: 689 },
        { id: "s4-l5", title: "Live chart walkthrough", duration: "19:03", seconds: 1143 },
      ],
    },
    {
      id: "s5",
      title: "Risk Management & Psychology",
      lessons: [
        { id: "s5-l1", title: "Position sizing: never risk too much", duration: "12:36", seconds: 756 },
        { id: "s5-l2", title: "Setting stop losses that work", duration: "10:58", seconds: 658 },
        { id: "s5-l3", title: "Controlling fear and greed", duration: "13:21", seconds: 801 },
        { id: "s5-l4", title: "Common beginner mistakes (and fixes)", duration: "14:44", seconds: 884 },
      ],
    },
    {
      id: "s6",
      title: "Trading Strategies",
      lessons: [
        { id: "s6-l1", title: "Swing trading strategy step-by-step", duration: "18:12", seconds: 1092 },
        { id: "s6-l2", title: "Intraday trading: rules & setup", duration: "16:39", seconds: 999 },
        { id: "s6-l3", title: "Breakout and pullback entries", duration: "13:57", seconds: 837 },
      ],
    },
    {
      id: "s7",
      title: "Long-Term Investing",
      lessons: [
        { id: "s7-l1", title: "Building your first portfolio", duration: "15:05", seconds: 905 },
        { id: "s7-l2", title: "SIPs, mutual funds & ETFs", duration: "12:43", seconds: 763 },
        { id: "s7-l3", title: "IPOs: how to apply and what to check", duration: "11:16", seconds: 676 },
        { id: "s7-l4", title: "Tax on stock market profits", duration: "10:34", seconds: 634 },
      ],
    },
    {
      id: "s8",
      title: "Next Steps & Wrap-Up",
      lessons: [
        { id: "s8-l1", title: "F&O basics: futures & options explained", duration: "16:52", seconds: 1012 },
        { id: "s8-l2", title: "Your 30-day practice plan", duration: "9:27", seconds: 567 },
        { id: "s8-l3", title: "Course wrap-up & certificate", duration: "5:48", seconds: 348 },
      ],
    },
  ],
};

// Single-course compatibility: the whole catalog is just COURSE.
export const courses: Course[] = [COURSE];
export const categories: Category[] = [
  { id: "share-market", name: "Share Market", description: "Stock market investing and trading, from zero to confident.", image: courseBusiness },
];
export const instructors: Instructor[] = [
  { id: "priya", name: COURSE.instructorName, title: COURSE.instructorTitle, bio: COURSE.instructorBio, initials: COURSE.instructorInitials, students: COURSE.students, courses: 1, rating: COURSE.rating },
];
export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const getInstructor = (id: string) => instructors.find((i) => i.id === id);
export const publishedCourses = () => courses.filter((c) => c.status === "published");

export const getCourse = (id: string) => (id === COURSE.id ? COURSE : undefined);
export const lessonCount = (c: Course = COURSE) => c.sections.reduce((n, s) => n + s.lessons.length, 0);
export const allLessons = (c: Course = COURSE) => c.sections.flatMap((s) => s.lessons);
export const effectivePrice = (c: Course = COURSE) => c.discountPrice ?? c.price;

export const formatPrice = (n: number) =>
  n === 0 ? "Free" : new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
export const formatNumber = (n: number) => new Intl.NumberFormat("en-IN").format(n);
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

// ------------------------------------------------------------------
// Dummy users (admin panel + logged-in student)
// ------------------------------------------------------------------

export type User = {
  id: string; name: string; email: string; phone: string; initials: string; joined: string;
  status: "active" | "inactive"; city: string;
  enrollments: { courseId: string; progress: number; completedLessons: number; expires: string; access: "active" | "revoked" | "expired" }[];
};

export const users: User[] = [
  { id: "u1", name: "Ananya Krishnan", email: "ananya.k@gmail.com", phone: "+91 98400 11223", initials: "AK", joined: "2026-01-14", status: "active", city: "Chennai",
    enrollments: [{ courseId: COURSE.id, progress: 65, completedLessons: 31, expires: "Lifetime", access: "active" }] },
  { id: "u2", name: "Rahul Menon", email: "rahul.menon@outlook.com", phone: "+91 99620 44551", initials: "RM", joined: "2026-02-02", status: "active", city: "Kochi",
    enrollments: [{ courseId: COURSE.id, progress: 45, completedLessons: 21, expires: "Lifetime", access: "active" }] },
  { id: "u3", name: "Sneha Reddy", email: "sneha.reddy@yahoo.com", phone: "+91 90030 77812", initials: "SR", joined: "2026-02-19", status: "active", city: "Hyderabad",
    enrollments: [{ courseId: COURSE.id, progress: 80, completedLessons: 38, expires: "Lifetime", access: "active" }] },
  { id: "u4", name: "Mohammed Faisal", email: "faisal.m@gmail.com", phone: "+91 97890 23344", initials: "MF", joined: "2026-03-05", status: "active", city: "Bengaluru",
    enrollments: [{ courseId: COURSE.id, progress: 20, completedLessons: 9, expires: "Lifetime", access: "active" }] },
  { id: "u5", name: "Divya Lakshmi", email: "divya.l@gmail.com", phone: "+91 94440 66789", initials: "DL", joined: "2026-03-22", status: "active", city: "Coimbatore",
    enrollments: [{ courseId: COURSE.id, progress: 100, completedLessons: 48, expires: "Lifetime", access: "active" }] },
  { id: "u6", name: "Aditya Sharma", email: "aditya.sharma@gmail.com", phone: "+91 98110 55432", initials: "AS", joined: "2026-04-08", status: "inactive", city: "Delhi",
    enrollments: [{ courseId: COURSE.id, progress: 5, completedLessons: 2, expires: "Lifetime", access: "revoked" }] },
  { id: "u7", name: "Kavya Pillai", email: "kavya.pillai@gmail.com", phone: "+91 96000 12121", initials: "KP", joined: "2026-04-27", status: "active", city: "Trivandrum",
    enrollments: [{ courseId: COURSE.id, progress: 55, completedLessons: 26, expires: "Lifetime", access: "active" }] },
  { id: "u8", name: "Sanjay Kumar", email: "sanjay.k@hotmail.com", phone: "+91 93800 98765", initials: "SK", joined: "2026-05-11", status: "active", city: "Madurai", enrollments: [] },
  { id: "u9", name: "Lakshmi Venkat", email: "lakshmi.v@gmail.com", phone: "+91 95000 34567", initials: "LV", joined: "2026-06-02", status: "active", city: "Pune",
    enrollments: [{ courseId: COURSE.id, progress: 90, completedLessons: 43, expires: "Lifetime", access: "active" }] },
  { id: "u10", name: "Nikhil Joshi", email: "nikhil.joshi@gmail.com", phone: "+91 98200 76543", initials: "NJ", joined: "2026-06-18", status: "active", city: "Mumbai",
    enrollments: [{ courseId: COURSE.id, progress: 0, completedLessons: 0, expires: "Lifetime", access: "active" }] },
];

export const getUser = (id: string) => users.find((u) => u.id === id);
export const currentStudent = users[0];

// ------------------------------------------------------------------
// Dummy orders & payments (all for the single course)
// ------------------------------------------------------------------

export type PaymentStatus = "paid" | "pending" | "failed" | "refunded" | "cancelled";
export type Order = {
  id: string; userId: string; courseId: string; amount: number; discount: number; status: PaymentStatus;
  method: "UPI" | "Card" | "Net Banking" | "Wallet"; date: string; transactionId: string;
  refundStatus: "none" | "requested" | "approved" | "rejected";
};

export const orders: Order[] = [
  { id: "ORD-10482", userId: "u1", courseId: COURSE.id, amount: 1999, discount: 3000, status: "paid", method: "UPI", date: "2026-10-30", transactionId: "TXN8F21A9", refundStatus: "none" },
  { id: "ORD-10481", userId: "u10", courseId: COURSE.id, amount: 1999, discount: 3000, status: "pending", method: "Card", date: "2026-10-29", transactionId: "TXN8F21A2", refundStatus: "none" },
  { id: "ORD-10480", userId: "u9", courseId: COURSE.id, amount: 1999, discount: 3000, status: "paid", method: "UPI", date: "2026-10-28", transactionId: "TXN8F1ZZ0", refundStatus: "none" },
  { id: "ORD-10479", userId: "u7", courseId: COURSE.id, amount: 1999, discount: 3000, status: "paid", method: "Net Banking", date: "2026-10-27", transactionId: "TXN8F1Y71", refundStatus: "none" },
  { id: "ORD-10478", userId: "u6", courseId: COURSE.id, amount: 1999, discount: 3000, status: "refunded", method: "Card", date: "2026-10-25", transactionId: "TXN8F1X45", refundStatus: "approved" },
  { id: "ORD-10477", userId: "u5", courseId: COURSE.id, amount: 1999, discount: 3000, status: "paid", method: "Wallet", date: "2026-10-24", transactionId: "TXN8F1W12", refundStatus: "none" },
  { id: "ORD-10476", userId: "u4", courseId: COURSE.id, amount: 1999, discount: 3000, status: "paid", method: "UPI", date: "2026-10-22", transactionId: "TXN8F1V88", refundStatus: "requested" },
  { id: "ORD-10475", userId: "u3", courseId: COURSE.id, amount: 1999, discount: 3000, status: "paid", method: "Card", date: "2026-10-20", transactionId: "TXN8F1U03", refundStatus: "none" },
  { id: "ORD-10474", userId: "u2", courseId: COURSE.id, amount: 1999, discount: 3000, status: "paid", method: "UPI", date: "2026-10-18", transactionId: "TXN8F1T67", refundStatus: "none" },
  { id: "ORD-10473", userId: "u2", courseId: COURSE.id, amount: 1999, discount: 3000, status: "failed", method: "Card", date: "2026-10-15", transactionId: "TXN8F1S29", refundStatus: "none" },
  { id: "ORD-10472", userId: "u8", courseId: COURSE.id, amount: 1999, discount: 3000, status: "cancelled", method: "UPI", date: "2026-10-14", transactionId: "TXN8F1R50", refundStatus: "none" },
  { id: "ORD-10471", userId: "u1", courseId: COURSE.id, amount: 4999, discount: 0, status: "failed", method: "Card", date: "2026-10-10", transactionId: "TXN8F1Q11", refundStatus: "none" },
];

export const getOrder = (id: string) => orders.find((o) => o.id === id);
export const studentOrders = orders.filter((o) => o.userId === currentStudent.id);

export const revenueByMonth = [
  { month: "May", revenue: 182000, orders: 142 },
  { month: "Jun", revenue: 214500, orders: 168 },
  { month: "Jul", revenue: 198300, orders: 155 },
  { month: "Aug", revenue: 256800, orders: 197 },
  { month: "Sep", revenue: 289400, orders: 221 },
  { month: "Oct", revenue: 342100, orders: 264 },
];

export const viewsByDay = [
  { day: "Mon", plays: 1820, viewers: 940 },
  { day: "Tue", plays: 2140, viewers: 1102 },
  { day: "Wed", plays: 1980, viewers: 1015 },
  { day: "Thu", plays: 2460, viewers: 1270 },
  { day: "Fri", plays: 2290, viewers: 1188 },
  { day: "Sat", plays: 3110, viewers: 1610 },
  { day: "Sun", plays: 2870, viewers: 1495 },
];

// ------------------------------------------------------------------
// Video analytics (per lesson of the single course)
// ------------------------------------------------------------------

export type Video = {
  id: string; title: string; courseId: string; sectionTitle: string; order: number; duration: string;
  status: "published" | "unpublished" | "processing"; views: number; completion: number; captions: boolean; downloadable: boolean;
};

export const videos: Video[] = COURSE.sections.flatMap((s) =>
  s.lessons.map((l, li) => ({
    id: l.id, title: l.title, courseId: COURSE.id, sectionTitle: s.title, order: li + 1, duration: l.duration,
    status: (li % 9 === 8 ? "processing" : "published") as Video["status"],
    views: Math.max(120, Math.round(COURSE.students * (0.9 - li * 0.06))),
    completion: Math.max(38, 92 - li * 6),
    captions: li % 3 !== 2, downloadable: false,
  })),
);

export const testimonials = [
  { name: "Ananya Krishnan", role: "Student, Chennai", quote: "Maine pehli baar demat account khola aur ab confidently invest karti hoon. Priya ma'am ke lessons bilkul simple hain.", initials: "AK" },
  { name: "Rahul Menon", role: "IT Professional, Kochi", quote: "Technical analysis section ne meri trading poori badal di. Stop loss ab har trade mein lagata hoon.", initials: "RM" },
  { name: "Divya Lakshmi", role: "Homemaker, Coimbatore", quote: "Pay once, learn forever. Maine course do baar dekha aur ab apna khud ka portfolio manage karti hoon.", initials: "DL" },
];


export const faqs = [
  {
    q: "Is this course suitable for beginners?",
    a: "Yes, absolutely! This course starts from the basics and covers everything step by step, from opening a Demat account to making your first trade."
  },
  {
    q: "How long will I have access to the course?",
    a: "You will get lifetime access. Once you purchase the course, you can watch the lessons anytime and as many times as you like."
  },
  {
    q: "When will I get access after payment?",
    a: "You will get access immediately after your payment is successful. You will also receive the payment receipt and login details via email."
  },
  {
    q: "Can I get a refund if I'm not satisfied?",
    a: "Yes, you can request a full refund within 7 days if you are not satisfied with the course. No questions asked."
  },
  {
    q: "Can I watch the course on my mobile phone?",
    a: "Yes! You can access the course seamlessly on your mobile phone, tablet, or desktop."
  },
  {
    q: "Will I receive a certificate after completing the course?",
    a: "Yes, you will receive a certificate of completion after successfully completing 100% of the course."
  },
];


export const coupons: Record<string, number> = { WELCOME10: 10, FESTIVE20: 20 };
