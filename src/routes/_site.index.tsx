
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  PlayCircle,
  Sparkles,
  Star,
  Users,
  GraduationCap,
  Headphones,
  Award,
  Quote,
  ChevronLeft,
  ChevronRight,
  Medal,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* =========================================
   COURSE DATA
========================================= */

const course = {
  title: "AI Engineer Agentic Track: The Complete Agent & MCP Course",
  subtitle:
    "Master AI Agents, Agentic Workflows and Model Context Protocol with practical projects.",
  price: 399,
  originalPrice: 799,
  rating: 4.7,
  students: "1,200+",
  duration: "21 hours",
  lectures: "132 lectures",
  projects: "8 real-world projects",
};

/* =========================================
   YOUTUBE VIDEO
========================================= */

// Sample YouTube video ID.
// Replace it with your actual course video ID when available.
const YOUTUBE_VIDEO_ID = "M7lc1UVf-VE";

/* =========================================
   SERVICES
========================================= */

const services = [
  {
    icon: PlayCircle,
    title: "Remote Learning",
    description:
      "Learn from anywhere with flexible online learning resources.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    featured: false,
  },
  {
    icon: GraduationCap,
    title: "Online Diploma",
    description:
      "Build professional knowledge with structured courses.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
    featured: false,
  },
  {
    icon: CheckCircle2,
    title: "Target Goals",
    description:
      "Follow a clear learning path and achieve your goals.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
    featured: true,
  },
  {
    icon: Users,
    title: "Personal Mentor",
    description:
      "Get guidance and support throughout your journey.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800",
    featured: false,
  },
];

/* =========================================
   BENEFITS
========================================= */

const benefits = [
  {
    icon: BookOpen,
    title: "Practical Learning",
    subtitle: "Real-world Skills",
  },
  {
    icon: Award,
    title: "Lifetime Access",
    subtitle: "Learn Anytime",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    subtitle: "Guidance Available",
  },
  {
    icon: Users,
    title: "Community",
    subtitle: "Learn Together",
  },
];

/* =========================================
   FEATURES
========================================= */

const features = [
  {
    icon: CheckCircle2,
    title: "Practical Learning",
    description:
      "Learn concepts by building real-world projects.",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description:
      "Follow a structured learning path with guidance.",
  },
  {
    icon: Clock,
    title: "Learn at Your Pace",
    description:
      "Access your learning material at your convenience.",
  },
];

/* =========================================
   TESTIMONIAL DATA
========================================= */

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Aspiring AI Developer",
    initials: "AS",
    rating: 5,
    review:
      "The practical approach made complex AI concepts easier to understand. I really enjoyed learning through hands-on projects.",
  },
  {
    name: "Priya Mehta",
    role: "Computer Science Student",
    initials: "PM",
    rating: 5,
    review:
      "The structured learning journey helped me understand AI agents and how to build projects step by step.",
  },
  {
    name: "Rahul Verma",
    role: "Technology Learner",
    initials: "RV",
    rating: 5,
    review:
      "A flexible learning experience with useful explanations. The course topics helped me explore a new area of technology.",
  },
];

/* =========================================
   REUSABLE SCROLL REVEAL
========================================= */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`premium-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* =========================================
   ANIMATED COUNTER
========================================= */

function AnimatedCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    let animationFrame = 0;
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;

        started = true;

        const duration = 1600;
        const startTime = performance.now();

        const update = (now: number) => {
          const progress = Math.min(
            (now - startTime) / duration,
            1,
          );

          const eased = 1 - Math.pow(1 - progress, 4);

          setCount(Math.round(value * eased));

          if (progress < 1) {
            animationFrame = requestAnimationFrame(update);
          }
        };

        animationFrame = requestAnimationFrame(update);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <div className="text-center">
      <span
        ref={counterRef}
        className="block text-3xl font-extrabold tracking-tight text-[#001C3C] md:text-4xl"
      >
        {count.toLocaleString("en-IN")}
        {suffix}
      </span>

      <span className="mt-2 block text-sm font-medium text-[#4A5B6E]">
        {label}
      </span>
    </div>
  );
}

/* =========================================
 
/* =========================================
   PAGE DECORATIONS
========================================= */

function PageDecorations() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Yellow Star - Top Left */}
      <Star
        className="page-star page-star-yellow absolute left-[5%] top-[12%]"
        size={22}
        fill="#FFD43B"
        stroke="#FFD43B"
      />

      {/* Blue Star - Top Right */}
      <Star
        className="page-star page-star-blue absolute right-[5%] top-[12%]"
        size={23}
        fill="#0056B3"
        stroke="#0056B3"
      />

      {/* Pink Sparkles - Bottom Left */}
      <Sparkles
        className="page-star page-star-pink absolute bottom-[12%] left-[10%]"
        size={25}
        fill="#F472B6"
        stroke="#F472B6"
      />

      {/* Floating Book - Left Side */}
      <div className="page-float-book absolute left-[4%] top-[48%] text-[#0056B3]">
        <BookOpen size={30} />
      </div>

      {/* Graduation Cap - Right Side */}
      <div className="page-float-cap absolute bottom-[18%] right-[4%] text-[#007C89]">
        <GraduationCap size={38} />
      </div>

      {/* Small Decorative Dots */}
      <div className="page-dots absolute bottom-[18%] left-[25%]">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

/* =========================================
   SECTION HEADING
========================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Reveal className="mb-12 text-center">
      <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#007C89]">
        {eyebrow}
      </span>

      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#001C3C] md:text-5xl">
        {title}
      </h2>

      <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#4A5B6E]">
        {description}
      </p>
    </Reveal>
  );
}

/* =========================================
   ROUTE
========================================= */

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "Vilaiyosai — Learn Skills for the Future" },
      {
        name: "description",
        content:
          "Learn AI Engineering and build real-world skills with Vilaiyosai.",
      },
    ],
  }),
  component: Home,
});

/* =========================================
   HOME PAGE
========================================= */

function Home() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const activeTestimonial = testimonials[testimonialIndex];

  const previousTestimonial = () => {
    setTestimonialIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    );
  };

  const nextTestimonial = () => {
    setTestimonialIndex(
      (current) => (current + 1) % testimonials.length,
    );
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#FDFEED] text-[#001C3C]">

      {/* =====================================
          HERO SECTION
      ===================================== */}

      <section className="relative isolate overflow-hidden px-5 py-16 md:px-10 md:py-24">

        <div className="absolute -right-32 -top-20 h-96 w-96 rounded-full bg-[#D6F5F6] opacity-70 blur-3xl" />

        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#2EC4CC]/10 blur-3xl" />

        <PageDecorations />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

          {/* LEFT CONTENT */}

          <div className="relative z-10">

            <Reveal>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#2EC4CC]/40 bg-white px-4 py-2 text-sm font-bold text-[#007C89] shadow-sm">
                <Sparkles size={17} />
                Learn. Build. Grow.
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.12] tracking-tight md:text-7xl">
                Grow your skills
                <br />
                with
                <span className="text-[#007C89]"> Vilaiyosai.</span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#4A5B6E] md:text-lg">
                Unlock your potential with future-ready skills. Learn AI
                Engineering, build practical projects and take your career
                to the next level with expert guidance.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-9 flex flex-wrap gap-4">

                <a href="/courses/ai-agentic">
                  <Button className="premium-button h-12 rounded-xl bg-[#0056B3] px-7 font-semibold text-white shadow-lg shadow-blue-900/10 transition-all duration-200 hover:-translate-y-1 hover:bg-[#004494]">
                    Explore Courses
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </a>

                <a href="#featured-course">
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl border-2 border-[#0056B3] bg-white px-7 font-semibold text-[#0056B3] transition-all duration-200 hover:bg-[#0056B3] hover:text-white"
                  >
                    <PlayCircle className="mr-2" size={18} />
                    View Course
                  </Button>
                </a>

              </div>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-9 flex flex-wrap items-center gap-2 text-sm">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Star key={item} size={16} fill="currentColor" />
                  ))}
                </div>

                <span className="font-bold text-[#001C3C]">
                  4.7/5
                </span>

                <span className="text-[#4A5B6E]">
                  Learner satisfaction
                </span>
              </div>
            </Reveal>

          </div>

          {/* RIGHT HERO IMAGE */}

          <Reveal
            className="relative mx-auto w-full max-w-2xl"
            delay={180}
          >
            <div className="relative flex h-[420px] items-center justify-center overflow-visible rounded-none border-0 bg-transparent shadow-none md:h-[520px]">

              {/* ORIGINAL GIRL IMAGE */}

              <div className="absolute inset-0 flex items-center justify-center p-3 md:p-5">
                <img
                  src="/images/hero-girl.png"
                  alt="Vilaiyosai Student"
                  className="hero-student-image h-full w-full object-contain object-center"
                />
              </div>

              {/* EXPERT COURSES CARD */}

              <div className="hero-floating hero-float-one absolute right-0 top-4 z-20 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3 shadow-xl backdrop-blur-xl md:-right-20 md:top-8 md:p-4">

                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#D6F5F6] text-[#007C89] md:h-14 md:w-14">
                  <BookOpen size={26} />
                </div>

                <div>
                 <p className="text-xl font-extrabold text-[#001C3C] md:text-2xl">
                1
              </p>

              <p className="text-[11px] font-medium text-[#4A5B6E] md:text-sm">
                Specialized AI Course
              </p>
                </div>
              </div>

              {/* FEATURED COURSE CARD */}

              <div className="hero-floating hero-float-two absolute right-0 top-1/2 z-30 w-[180px] -translate-y-1/2 rounded-2xl border border-white/80 bg-white/95 p-3 shadow-2xl backdrop-blur-xl md:-right-24 md:w-[220px] md:p-4">

                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[#D6F5F6] px-2.5 py-1 text-[9px] font-extrabold tracking-wide text-[#007C89] md:text-[10px]">
                    FEATURED COURSE
                  </span>

                  <Sparkles size={15} className="text-[#007C89]" />
                </div>

                <h3 className="mt-3 text-xs font-extrabold leading-5 text-[#001C3C] md:text-sm">
                  AI Engineer Agentic Track
                </h3>

                <div className="mt-2 flex items-center gap-1.5 text-xs">
                  <Star size={13} fill="#FBBF24" className="text-amber-400" />

                  <span className="font-bold text-[#001C3C]">
                    4.7
                  </span>

                  <span className="text-[#4A5B6E]">
                    Course rating
                  </span>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#D6F5F6]">
                  <div className="h-full w-[75%] rounded-full bg-[#007C89]" />
                </div>

                <div className="mt-2 flex items-center justify-between text-[10px] font-semibold text-[#4A5B6E]">
                  <span>Project-based learning</span>
                  <span className="text-[#007C89]">8 projects</span>
                </div>
              </div>

              {/* ONLINE STUDENTS CARD */}

              <div className="hero-floating hero-float-three absolute bottom-4 left-0 z-20 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3 shadow-xl backdrop-blur-xl md:-left-20 md:bottom-8 md:p-4">

                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#D6F5F6] text-[#007C89] md:h-14 md:w-14">
                  <Users size={26} />
                </div>

                <div>
                  <p className="text-xl font-extrabold text-[#001C3C] md:text-2xl">
                    10,000+
                  </p>

                  <p className="text-[11px] font-medium text-[#4A5B6E] md:text-sm">
                    Happy Online Students
                  </p>
                </div>
              </div>

            </div>
          </Reveal>

        </div>
      </section>

      {/* =====================================
          BENEFITS STRIP
      ===================================== */}

      <section className="relative isolate overflow-hidden bg-[#001C3C] px-5 py-8 text-white md:px-10">

        <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-[#2EC4CC]/10 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">

          {benefits.map((item, index) => (
            <Reveal key={item.title} delay={index * 100}>
              <div className="flex items-center gap-3">

                <div className="rounded-full bg-[#2EC4CC] p-3 text-[#001C3C] transition-transform duration-300 hover:rotate-12 hover:scale-110">
                  <item.icon size={23} />
                </div>

                <div>
                  <h3 className="font-bold">{item.title}</h3>

                  <p className="mt-1 text-xs text-white/65">
                    {item.subtitle}
                  </p>
                </div>

              </div>
            </Reveal>
          ))}

        </div>
      </section>

      {/* =====================================
          ANIMATED STATISTICS
      ===================================== */}

      <section className="relative isolate overflow-hidden bg-white px-5 py-16 md:px-10">

        <PageDecorations />

        <div className="relative z-10 mx-auto max-w-7xl">

          <Reveal className="mb-10 text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#007C89]">
              Vilaiyosai in Numbers
            </span>

            <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">
              Learn. Grow. Achieve.
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 gap-8 rounded-3xl border border-[#D6F5F6] bg-[#FDFEED] px-5 py-10 shadow-sm md:grid-cols-4 md:px-10">

            <Reveal delay={0}>
              <AnimatedCounter
                value={10000}
                suffix="+"
                label="Online Students"
              />
            </Reveal>

            <Reveal delay={100}>
              <AnimatedCounter
                value={50}
                suffix="+"
                label="Expert Courses"
              />
            </Reveal>

            <Reveal delay={200}>
              <AnimatedCounter
                value={8}
                suffix="+"
                label="Practical Projects"
              />
            </Reveal>

            <Reveal delay={300}>
              <AnimatedCounter
                value={21}
                suffix="h"
                label="Course Content"
              />
            </Reveal>

          </div>

          <p className="mt-4 text-center text-xs text-[#4A5B6E]">
            Update these figures to match your verified platform statistics before publishing.
          </p>

        </div>
      </section>

      {/* =====================================
          SERVICES SECTION
      ===================================== */}

      <section
        id="services"
        className="relative isolate scroll-mt-24 overflow-hidden px-5 py-20 md:px-10 md:py-24"
      >

        <PageDecorations />

        <div className="relative z-10 mx-auto max-w-7xl">

          <SectionHeading
            eyebrow="Our Services"
            title="Explore What We Offer"
            description="Discover flexible learning opportunities designed to help you achieve your goals."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {services.map((item, index) => (
              <Reveal key={item.title} delay={index * 100}>

                <div
                  className={`premium-card h-full overflow-hidden rounded-2xl border ${
                    item.featured
                      ? "border-[#007C89] bg-[#0056B3] text-white"
                      : "border-[#D6F5F6] bg-white text-[#001C3C]"
                  }`}
                >

                  <div className="group h-44 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="premium-image h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-7">

                    <div
                      className={`mb-5 grid h-12 w-12 place-items-center rounded-xl transition-transform duration-300 hover:rotate-6 hover:scale-110 ${
                        item.featured
                          ? "bg-white/15 text-white"
                          : "bg-[#D6F5F6] text-[#007C89]"
                      }`}
                    >
                      <item.icon size={25} />
                    </div>

                    <h3 className="text-xl font-extrabold">
                      {item.title}
                    </h3>

                    <p
                      className={`mt-3 min-h-20 text-sm leading-7 ${
                        item.featured
                          ? "text-white/80"
                          : "text-[#4A5B6E]"
                      }`}
                    >
                      {item.description}
                    </p>

                    <a
                      href="#featured-course"
                      className={`mt-5 inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-3 ${
                        item.featured
                          ? "text-white"
                          : "text-[#007C89]"
                      }`}
                    >
                      Learn More
                      <ArrowRight size={16} />
                    </a>

                  </div>
                </div>

              </Reveal>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================
          FEATURED COURSE
      ===================================== */}

      <section
        id="featured-course"
        className="relative isolate scroll-mt-24 overflow-hidden bg-white px-5 py-20 md:px-10 md:py-24"
      >

        <PageDecorations />

        <div className="relative z-10 mx-auto max-w-7xl">

          <SectionHeading
            eyebrow="Featured Course"
            title="Start Your Learning Journey"
            description="One carefully designed course to help you build practical, future-ready AI engineering skills."
          />

          <Reveal>

            <div className="premium-card mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-[#D6F5F6] bg-[#FDFEED] shadow-xl md:grid-cols-2">

              {/* COURSE VIDEO */}

              <div className="course-video-wrapper relative min-h-[350px] overflow-hidden bg-[#001C3C] md:min-h-[500px]">

                {isVideoPlaying ? (

                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                    title="AI Engineering Course Preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />

                ) : (

                  <>

                    <img
                      src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`}
                      alt="AI Engineering Course Video Preview"
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-[#001C3C]/60" />

                    <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#2EC4CC]/20 blur-3xl" />

                    <div className="relative z-10 flex min-h-[350px] flex-col items-center justify-center p-8 text-center text-white md:min-h-[500px]">

                      <span className="mb-5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                        Course Preview
                      </span>

                      <button
                        type="button"
                        onClick={() => setIsVideoPlaying(true)}
                        aria-label="Play AI Engineering course preview"
                        className="course-play-button grid h-20 w-20 place-items-center rounded-full bg-[#2EC4CC] text-[#001C3C] shadow-2xl transition duration-300 hover:scale-110 hover:bg-white"
                      >
                        <PlayCircle size={48} />
                      </button>

                      <p className="mt-6 text-sm font-bold uppercase tracking-widest text-[#2EC4CC]">
                        AI Engineering
                      </p>

                      <h3 className="mt-2 text-3xl font-extrabold md:text-4xl">
                        Agentic AI
                      </h3>

                      <p className="mt-3 text-sm text-white/80">
                        Agents • MCP • Projects
                      </p>

                      <span className="mt-5 text-xs font-semibold text-white/70">
                        Click to watch the video
                      </span>

                    </div>

                  </>

                )}

              </div>

              {/* COURSE DETAILS */}

              <div className="flex flex-col justify-center p-7 md:p-10">

                <span className="w-fit rounded-full bg-[#D6F5F6] px-4 py-2 text-xs font-extrabold text-[#007C89]">
                  BEST SELLER
                </span>

                <h3 className="mt-5 text-2xl font-extrabold leading-snug">
                  {course.title}
                </h3>

                <p className="mt-4 leading-7 text-[#4A5B6E]">
                  {course.subtitle}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">

                  <span className="font-bold text-[#001C3C]">
                    {course.rating}
                  </span>

                  <Star
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />

                  <span className="text-[#4A5B6E]">
                    ({course.students} students)
                  </span>

                </div>

                <div className="mt-6 flex flex-wrap gap-5 text-sm text-[#4A5B6E]">

                  <span className="flex items-center gap-2">
                    <Clock size={17} className="text-[#007C89]" />
                    {course.duration}
                  </span>

                  <span className="flex items-center gap-2">
                    <BookOpen size={17} className="text-[#007C89]" />
                    {course.lectures}
                  </span>

                  <span className="flex items-center gap-2">
                    <Users size={17} className="text-[#007C89]" />
                    {course.projects}
                  </span>

                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">

                  <span className="text-3xl font-extrabold text-[#001C3C]">
                    ₹{course.price}
                  </span>

                  <span className="text-lg text-[#4A5B6E]/60 line-through">
                    ₹{course.originalPrice}
                  </span>

                  <span className="rounded-lg bg-[#D6F5F6] px-3 py-1 text-sm font-bold text-[#007C89]">
                    50% OFF
                  </span>

                </div>

                <a href="/courses/ai-agentic" className="mt-7 block">

                  <Button className="premium-button h-12 w-full rounded-xl bg-[#0056B3] font-bold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-[#004494]">
                    Explore Course Details
                    <ArrowRight className="ml-2" size={18} />
                  </Button>

                </a>

              </div>

            </div>

          </Reveal>

        </div>
      </section>

      {/* =====================================
          ABOUT / WHY CHOOSE US
      ===================================== */}

      <section
        id="about"
        className="relative isolate scroll-mt-24 overflow-hidden px-5 py-20 md:px-10 md:py-24"
      >

        <PageDecorations />

        <div className="relative z-10 mx-auto max-w-7xl">

          <SectionHeading
            eyebrow="Why Vilaiyosai"
            title="Learning That Moves You Forward"
            description="Everything you need to learn, grow and build your future."
          />

          <div className="grid gap-6 md:grid-cols-3">

            {features.map((item, index) => (
              <Reveal key={item.title} delay={index * 120}>

                <div className="premium-card h-full rounded-2xl border border-[#D6F5F6] bg-white p-8">

                  <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#D6F5F6] text-[#007C89] transition-transform duration-300 hover:rotate-6 hover:scale-110">
                    <item.icon size={28} />
                  </div>

                  <h3 className="text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-[#4A5B6E]">
                    {item.description}
                  </p>

                </div>

              </Reveal>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================
          STUDENT TESTIMONIALS
      ===================================== */}

      <section
        id="testimonials"
        className="relative isolate overflow-hidden bg-white px-5 py-20 md:px-10 md:py-24"
      >

        <PageDecorations />

        <div className="relative z-10 mx-auto max-w-5xl">

          <SectionHeading
            eyebrow="Student Stories"
            title="What Learners Say"
            description="Discover how structured learning and practical projects can make a difference."
          />

          <Reveal>

            <div className="relative rounded-3xl border border-[#D6F5F6] bg-[#FDFEED] p-7 shadow-lg md:p-12">

              <div className="absolute right-8 top-8 text-[#2EC4CC]/40">
                <Quote size={54} fill="currentColor" />
              </div>

              <div className="relative z-10">

                <div className="mb-6 flex gap-1 text-amber-400">
                  {Array.from({
                    length: activeTestimonial.rating,
                  }).map((_, index) => (
                    <Star
                      key={index}
                      size={19}
                      fill="currentColor"
                    />
                  ))}
                </div>

                <p
                  key={testimonialIndex}
                  className="testimonial-text min-h-28 max-w-3xl text-lg font-medium leading-8 text-[#001C3C] md:text-2xl md:leading-10"
                >
                  “{activeTestimonial.review}”
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-5">

                  <div className="flex items-center gap-4">

                    <div className="grid h-14 w-14 place-items-center rounded-full bg-[#0056B3] text-lg font-extrabold text-white">
                      {activeTestimonial.initials}
                    </div>

                    <div>
                      <h3 className="font-extrabold text-[#001C3C]">
                        {activeTestimonial.name}
                      </h3>

                      <p className="mt-1 text-sm text-[#4A5B6E]">
                        {activeTestimonial.role}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <button
                      type="button"
                      onClick={previousTestimonial}
                      aria-label="Previous testimonial"
                      className="grid h-11 w-11 place-items-center rounded-full border border-[#2EC4CC]/50 bg-white text-[#0056B3] transition hover:-translate-y-1 hover:bg-[#D6F5F6]"
                    >
                      <ChevronLeft size={21} />
                    </button>

                    <button
                      type="button"
                      onClick={nextTestimonial}
                      aria-label="Next testimonial"
                      className="grid h-11 w-11 place-items-center rounded-full border border-[#2EC4CC]/50 bg-white text-[#0056B3] transition hover:-translate-y-1 hover:bg-[#D6F5F6]"
                    >
                      <ChevronRight size={21} />
                    </button>

                  </div>
                </div>

                <div className="mt-7 flex justify-center gap-2">

                  {testimonials.map((item, index) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setTestimonialIndex(index)}
                      aria-label={`Show testimonial ${index + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        testimonialIndex === index
                          ? "w-8 bg-[#007C89]"
                          : "w-2 bg-[#2EC4CC]/40"
                      }`}
                    />
                  ))}

                </div>

              </div>
            </div>

          </Reveal>

          <p className="mt-4 text-center text-xs text-[#4A5B6E]">
            Sample testimonial content for layout preview. Replace with genuine student reviews and permission-approved names before publishing.
          </p>

        </div>
      </section>

      {/* =====================================
          CERTIFICATE PREVIEW
      ===================================== */}

      <section
        id="certificate"
        className="relative isolate overflow-hidden px-5 py-20 md:px-10 md:py-24"
      >

        <PageDecorations />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

          <Reveal>

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#007C89]">
              Your Achievement
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#001C3C] md:text-5xl">
              Learn New Skills.
              <span className="text-[#007C89]">
                {" "}Earn Recognition.
              </span>
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-[#4A5B6E]">
              Celebrate your learning journey with a course completion
              certificate. Showcase the skills and projects you have worked
              hard to build.
            </p>

            <div className="mt-7 space-y-4">

              <div className="flex items-center gap-3 text-sm font-semibold text-[#001C3C]">
                <CheckCircle2 size={20} className="text-[#007C89]" />
                A visual record of your course achievement
              </div>

              <div className="flex items-center gap-3 text-sm font-semibold text-[#001C3C]">
                <CheckCircle2 size={20} className="text-[#007C89]" />
                Highlight your learning journey
              </div>

              <div className="flex items-center gap-3 text-sm font-semibold text-[#001C3C]">
                <CheckCircle2 size={20} className="text-[#007C89]" />
                Showcase completed learning projects
              </div>

            </div>

            <a href="/courses/ai-agentic" className="mt-8 inline-block">
              <Button className="premium-button h-12 rounded-xl bg-[#0056B3] px-7 font-semibold text-white hover:bg-[#004494]">
                Explore Course
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </a>

          </Reveal>

          {/* CERTIFICATE MOCKUP */}

          <Reveal delay={150}>

            <div className="certificate-scene mx-auto w-full max-w-xl">

              <div className="certificate-card relative rounded-xl border-[7px] border-[#D6F5F6] bg-white p-3 shadow-2xl md:border-[10px] md:p-5">

                <div className="certificate-inner relative overflow-hidden border-2 border-[#007C89]/40 px-5 py-9 text-center md:px-10 md:py-12">

                  <div className="absolute left-0 top-0 h-20 w-20 border-l-[5px] border-t-[5px] border-[#2EC4CC]" />

                  <div className="absolute bottom-0 right-0 h-20 w-20 border-b-[5px] border-r-[5px] border-[#2EC4CC]" />

                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#D6F5F6] text-[#007C89]">
                    <GraduationCap size={30} />
                  </div>

                  <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#007C89] md:text-xs">
                    VILAIYOSAI
                  </p>

                  <h3 className="mt-3 font-serif text-2xl font-bold text-[#001C3C] md:text-4xl">
                    Certificate
                  </h3>

                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#4A5B6E]">
                    Of Completion
                  </p>

                  <div className="mx-auto mt-6 h-px w-24 bg-[#2EC4CC]" />

                  <p className="mt-6 text-xs text-[#4A5B6E] md:text-sm">
                    This certificate is presented to
                  </p>

                  <p className="mt-3 font-serif text-xl font-bold italic text-[#0056B3] md:text-3xl">
                    Student Name
                  </p>

                  <p className="mx-auto mt-4 max-w-sm text-xs leading-6 text-[#4A5B6E] md:text-sm">
                    For successfully completing the
                  </p>

                  <p className="mt-2 text-sm font-extrabold text-[#001C3C] md:text-base">
                    AI Engineer Agentic Track
                  </p>

                  <div className="mt-9 flex items-end justify-between gap-3">

                    <div className="text-center">
                      <div className="mx-auto mb-2 h-px w-20 bg-[#001C3C]/40 md:w-28" />

                      <p className="text-[9px] font-bold text-[#4A5B6E] md:text-xs">
                        DATE
                      </p>
                    </div>

                    <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-[#007C89] text-[#007C89]">
                      <Medal size={30} />
                    </div>

                    <div className="text-center">
                      <div className="mx-auto mb-2 h-px w-20 bg-[#001C3C]/40 md:w-28" />

                      <p className="text-[9px] font-bold text-[#4A5B6E] md:text-xs">
                        AUTHORIZED SIGNATURE
                      </p>
                    </div>

                  </div>

                </div>
              </div>

              <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-[#2EC4CC]/40 bg-white px-4 py-2 text-xs font-bold text-[#007C89] shadow-sm">
                <Trophy size={15} />
                Your next achievement starts here
              </div>

            </div>

          </Reveal>

        </div>
      </section>

      {/* =====================================
          FINAL CTA
      ===================================== */}

      <section
        id="contact"
        className="relative isolate scroll-mt-24 overflow-hidden px-5 py-16 md:px-10 md:py-20"
      >

        <PageDecorations />

        <Reveal className="relative z-10 mx-auto max-w-6xl">

          <div className="relative overflow-hidden rounded-3xl bg-[#001C3C] px-7 py-16 text-center text-white shadow-xl md:px-16">

            <div className="absolute -right-20 -top-20 h-64 w-64 animate-premium-glow rounded-full bg-[#2EC4CC]/20 blur-3xl" />

            <div className="relative z-10">

              <div className="animate-soft-glow mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-[#2EC4CC] text-[#001C3C]">
                <Sparkles size={34} />
              </div>

             <h2 className="text-3xl font-extrabold text-white md:text-5xl">
              Ready to Start Learning?
            </h2>

              <p className="mx-auto mt-5 max-w-xl leading-7 text-white/70">
                Take the first step towards building your future.
                Discover your potential and start learning today.
              </p>

              <a href="/courses/ai-agentic" className="mt-8 inline-block">

                <Button className="premium-button h-12 rounded-xl bg-[#0056B3] px-8 font-bold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-[#004494]">
                  Explore the Course
                  <ArrowRight className="ml-2" size={18} />
                </Button>

              </a>

            </div>
          </div>

        </Reveal>
      </section>

    </div>
  );
}
