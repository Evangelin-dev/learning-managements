
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  ArrowRight,
  BarChart3,
  Check,
  Clock,
  Globe,
  Infinity as InfinityIcon,
  MonitorSmartphone,
  PlayCircle,
  Quote,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  COURSE,
  faqs,
  formatNumber,
  formatPrice,
  lessonCount,
  testimonials,
} from "@/lib/data";

export const Route = createFileRoute("/_site/courses/ai-agentic")({
  head: () => ({
    meta: [
      { title: `${COURSE.title} — Vilaiyosai` },
      { name: "description", content: COURSE.subtitle },
      { property: "og:title", content: `${COURSE.title} — Vilaiyosai` },
      { property: "og:description", content: COURSE.subtitle },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const off = Math.round(
  (1 - COURSE.discountPrice / COURSE.price) * 100
);

const primaryButton =
  "bg-[#0056B3] text-white hover:bg-[#004494] active:bg-[#003A7D]";

const outlineButton =
  "border-2 border-[#0056B3] bg-transparent text-[#0056B3] hover:bg-[#0056B3] hover:text-white";

const cardClass =
  "rounded-2xl border border-[#E1E8ED] bg-white shadow-[0_3px_16px_rgba(0,28,60,0.05)]";

function Home() {
  return (
    <main className="bg-[#FDFEED]">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#001C3C] text-[#FDFEED]">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#2EC4CC]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#0056B3]/20 blur-3xl" />

        <div className="container-page relative grid gap-10 py-14 lg:grid-cols-[1fr_380px] lg:gap-14 lg:py-20">

          <div>
            <Badge className="border border-[#2EC4CC]/30 bg-[#2EC4CC] px-3 py-1.5 font-sans text-xs font-semibold text-[#001C3C] hover:bg-[#2EC4CC]">
              Bestseller · Share Market Course
            </Badge>

            <h1 className="mt-6 max-w-3xl font-display text-3xl font-bold leading-tight text-[#FDFEED] sm:text-4xl lg:text-[44px]">
              {COURSE.title}
            </h1>

            <p className="mt-5 max-w-2xl font-sans text-base leading-8 text-[#FDFEED]/75 sm:text-lg">
              {COURSE.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 font-sans text-sm">

              <span className="flex items-center gap-1.5 font-semibold text-[#FDFEED]">
                {COURSE.rating}
                <Star className="h-4 w-4 fill-[#F5B942] text-[#F5B942]" />
                <span className="font-normal text-[#2EC4CC] underline underline-offset-4">
                  ({formatNumber(COURSE.reviews)} ratings)
                </span>
              </span>

              <span className="flex items-center gap-2 text-[#FDFEED]/75">
                <Users className="h-4 w-4 text-[#2EC4CC]" />
                {formatNumber(COURSE.students)} students
              </span>

              <span className="flex items-center gap-2 text-[#FDFEED]/75">
                <Clock className="h-4 w-4 text-[#2EC4CC]" />
                {COURSE.durationHours} hours
              </span>

              <span className="flex items-center gap-2 text-[#FDFEED]/75">
                <BarChart3 className="h-4 w-4 text-[#2EC4CC]" />
                {COURSE.level}
              </span>
            </div>

            <p className="mt-6 font-sans text-sm text-[#FDFEED]/70">
              Created by{" "}
              <span className="font-semibold text-[#2EC4CC]">
                {COURSE.instructorName}
              </span>
              , {COURSE.instructorTitle}
            </p>

            <div className="mt-3 flex flex-wrap gap-5 font-sans text-xs text-[#FDFEED]/55">
              <span>Last updated {COURSE.lastUpdated}</span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-[#2EC4CC]" />
                {COURSE.language}
              </span>
            </div>

            <div className="mt-8 lg:hidden">
              <Button
                asChild
                size="lg"
                className={`rounded-full px-7 font-sans font-semibold ${primaryButton}`}
              >
                <Link
                  to="/checkout/$courseId"
                  params={{ courseId: COURSE.id }}
                >
                  Buy Now — {formatPrice(COURSE.discountPrice)}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* DESKTOP PURCHASE CARD */}
          <aside className="hidden lg:block">
            <BuyCard />
          </aside>
        </div>
      </section>

      {/* MOBILE PURCHASE CARD */}
      <div className="container-page py-8 lg:hidden">
        <BuyCard />
      </div>

      {/* COURSE CONTENT */}
      <div className="container-page grid gap-12 py-10 lg:grid-cols-[1fr_380px] lg:py-16">

        <div className="min-w-0 space-y-14">

          {/* WHAT YOU WILL LEARN */}
          <section className={`${cardClass} p-6 sm:p-8`}>
            <SectionHeading
              eyebrow="YOUR LEARNING JOURNEY"
              title="What you'll learn"
            />

            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {COURSE.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-start gap-3 font-sans text-sm leading-6 text-[#001C3C]/85"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#D6F5F6]">
                    <Check className="h-3.5 w-3.5 text-[#007C89]" />
                  </span>
                  {outcome}
                </li>
              ))}
            </ul>
          </section>

          {/* COURSE INCLUDES */}
          <section>
            <SectionHeading
              eyebrow="COURSE BENEFITS"
              title="This course includes"
            />

            <div className={`${cardClass} mt-6 grid gap-5 p-6 sm:grid-cols-2`}>
              {COURSE.includes.map((item, index) => {
                const icons = [
                  PlayCircle,
                  MonitorSmartphone,
                  InfinityIcon,
                  Award,
                  ShieldCheck,
                  Clock,
                ];
                const Icon = icons[index % icons.length];

                return (
                  <div
                    key={item}
                    className="flex items-center gap-3 font-sans text-sm text-[#001C3C]/85"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#D6F5F6]">
                      <Icon className="h-5 w-5 text-[#007C89]" />
                    </span>
                    {item}
                  </div>
                );
              })}
            </div>
          </section>

          {/* CURRICULUM */}
          <section>
            <SectionHeading
              eyebrow="LEARNING MODULES"
              title="Course content"
            />

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm text-[#4A5B6E]">
              <span>{COURSE.sections.length} sections</span>
              <span>{lessonCount()} lessons</span>
              <span>{COURSE.durationHours} hours total</span>
            </div>

            <Accordion
              type="multiple"
              defaultValue={[COURSE.sections[0].id]}
              className={`${cardClass} mt-6 overflow-hidden`}
            >
              {COURSE.sections.map((section, index) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  className="border-b border-[#E5EDF3] last:border-0"
                >
                  <AccordionTrigger className="px-5 py-5 text-left hover:bg-[#F8FCFC] hover:no-underline sm:px-6">
                    <span>
                      <span className="mb-1 block font-sans text-xs font-medium text-[#007C89]">
                        SECTION {index + 1}
                      </span>
                      <span className="font-display text-base font-semibold text-[#001C3C]">
                        {section.title}
                      </span>
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="px-5 sm:px-6">
                    <ul className="divide-y divide-[#E5EDF3]">
                      {section.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className="flex items-center justify-between gap-3 py-4 font-sans text-sm"
                        >
                          <span className="flex min-w-0 items-center gap-3">
                            <PlayCircle
                              className={`h-4 w-4 shrink-0 ${
                                lesson.preview
                                  ? "text-[#007C89]"
                                  : "text-[#4A5B6E]"
                              }`}
                            />
                            <span className="truncate text-[#001C3C]">
                              {lesson.title}
                            </span>
                          </span>

                          <span className="flex shrink-0 items-center gap-3">
                            {lesson.preview && (
                              <span className="rounded-full bg-[#D6F5F6] px-2.5 py-1 text-xs font-semibold text-[#001C3C]">
                                Preview
                              </span>
                            )}
                            <span className="text-xs text-[#4A5B6E]">
                              {lesson.duration}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* INSTRUCTOR */}
          <section className={`${cardClass} p-6 sm:p-8`}>
            <SectionHeading
              eyebrow="MEET YOUR MENTOR"
              title="Your instructor"
            />

            <div className="mt-7 flex items-start gap-4 sm:gap-5">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#D6F5F6] font-display text-xl font-bold text-[#001C3C]">
                {COURSE.instructorInitials}
              </span>

              <div className="min-w-0">
                <h3 className="font-display text-lg font-semibold text-[#001C3C]">
                  {COURSE.instructorName}
                </h3>

                <p className="mt-1 font-sans text-sm font-medium text-[#007C89]">
                  {COURSE.instructorTitle}
                </p>

                <div className="mt-3 flex flex-wrap gap-4 font-sans text-xs text-[#4A5B6E]">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-[#F5B942] text-[#F5B942]" />
                    {COURSE.rating} instructor rating
                  </span>
                  <span>
                    {formatNumber(COURSE.students)} students
                  </span>
                </div>

                <p className="mt-4 font-sans text-sm leading-7 text-[#4A5B6E]">
                  {COURSE.instructorBio}
                </p>
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section>
            <SectionHeading
              eyebrow="STUDENT EXPERIENCES"
              title="What our students say"
            />

            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {testimonials.map((testimonial) => (
                <figure
                  key={testimonial.name}
                  className={`${cardClass} flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#2EC4CC] hover:shadow-lg`}
                >
                  <Quote className="h-7 w-7 text-[#007C89]" />

                  <div className="mt-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className="h-4 w-4 fill-[#F5B942] text-[#F5B942]"
                      />
                    ))}
                  </div>

                  <blockquote className="mt-4 flex-1 font-sans text-sm leading-7 text-[#4A5B6E]">
                    “{testimonial.quote}”
                  </blockquote>

                  <figcaption className="mt-6 flex items-center gap-3 border-t border-[#E5EDF3] pt-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#D6F5F6] font-sans text-sm font-semibold text-[#001C3C]">
                      {testimonial.initials}
                    </span>
                    <span>
                      <span className="block font-sans text-sm font-semibold text-[#001C3C]">
                        {testimonial.name}
                      </span>
                      <span className="mt-0.5 block font-sans text-xs text-[#4A5B6E]">
                        {testimonial.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <SectionHeading
              eyebrow="NEED HELP?"
              title="Frequently asked questions"
            />

            <Accordion
              type="single"
              collapsible
              className={`${cardClass} mt-6 overflow-hidden`}
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-b border-[#E5EDF3] last:border-0"
                >
                  <AccordionTrigger className="px-5 py-5 text-left font-sans text-sm font-semibold text-[#001C3C] hover:bg-[#F8FCFC] hover:no-underline sm:px-6">
                    {faq.q}
                  </AccordionTrigger>

                  <AccordionContent className="px-5 pb-5 font-sans text-sm leading-7 text-[#4A5B6E] sm:px-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        {/* GRID ALIGNMENT */}
        <div className="hidden lg:block" />
      </div>

      {/* FINAL CTA */}
      <section className="container-page pb-16 pt-4 sm:pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-[#B8E9EB] bg-[#D6F5F6] p-7 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#2EC4CC]/20 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">

            <div>
              <p className="font-script text-2xl text-[#007C89]">
                Your journey starts here!
              </p>

              <h2 className="mt-3 max-w-xl font-display text-2xl font-bold leading-tight text-[#001C3C] sm:text-3xl">
                Ready to start your share market journey?
              </h2>

              <p className="mt-4 max-w-xl font-sans text-sm leading-7 text-[#4A5B6E]">
                Join {formatNumber(COURSE.students)} students learning to
                trade and invest with confidence.
              </p>

              <ul className="mt-7 space-y-3 font-sans text-sm text-[#001C3C]">
                {[
                  `Lifetime access to all ${lessonCount()} lessons`,
                  "7-day money-back guarantee",
                  "Watch on mobile or desktop",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#2EC4CC]">
                      <Check className="h-3.5 w-3.5 text-[#001C3C]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#B8E9EB] bg-white p-6 shadow-[0_8px_30px_rgba(0,28,60,0.08)] sm:p-8">
              <div className="flex flex-wrap items-baseline justify-center gap-3">
                <span className="font-display text-4xl font-bold text-[#001C3C]">
                  {formatPrice(COURSE.discountPrice)}
                </span>

                <span className="font-sans text-lg text-[#4A5B6E] line-through">
                  {formatPrice(COURSE.price)}
                </span>

                <Badge className="bg-[#2EC4CC] font-sans font-semibold text-[#001C3C] hover:bg-[#2EC4CC]">
                  {off}% OFF
                </Badge>
              </div>

              <Button
                asChild
                size="lg"
                className={`mt-7 h-12 w-full rounded-full font-sans font-semibold ${primaryButton}`}
              >
                <Link
                  to="/checkout/$courseId"
                  params={{ courseId: COURSE.id }}
                >
                  Buy Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className={`mt-3 h-12 w-full rounded-full font-sans font-semibold ${outlineButton}`}
              >
                <Link to="/login">Student Login</Link>
              </Button>

              <p className="mt-5 text-center font-sans text-xs text-[#4A5B6E]">
                Secure checkout · 7-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* REUSABLE SECTION HEADING */
function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="font-sans text-xs font-semibold tracking-[0.15em] text-[#007C89]">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-2xl font-semibold text-[#001C3C] sm:text-[28px]">
        {title}
      </h2>
    </div>
  );
}

/* PURCHASE CARD */
function BuyCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E1E8ED] bg-white text-[#001C3C] shadow-[0_8px_30px_rgba(0,28,60,0.12)] lg:sticky lg:top-24">

      <Link
        to="/courses/$courseId"
        params={{ courseId: COURSE.id }}
        className="group relative block aspect-video overflow-hidden"
      >
        <img
          src={COURSE.image}
          alt={COURSE.title}
          width={1024}
          height={640}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute inset-0 grid place-items-center bg-[#001C3C]/45 transition-colors group-hover:bg-[#001C3C]/60">
          <span className="flex flex-col items-center gap-2 font-sans text-sm font-semibold text-white">
            <PlayCircle className="h-14 w-14" />
            Preview this course
          </span>
        </span>
      </Link>

      <div className="p-6">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-display text-3xl font-bold text-[#001C3C]">
            {formatPrice(COURSE.discountPrice)}
          </span>

          <span className="font-sans text-sm text-[#4A5B6E] line-through">
            {formatPrice(COURSE.price)}
          </span>

          <Badge className="bg-[#2EC4CC] font-sans font-semibold text-[#001C3C] hover:bg-[#2EC4CC]">
            {off}% OFF
          </Badge>
        </div>

        <Button
          asChild
          size="lg"
          className={`mt-6 h-12 w-full rounded-full font-sans font-semibold ${primaryButton}`}
        >
          <Link
            to="/checkout/$courseId"
            params={{ courseId: COURSE.id }}
          >
            Buy Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        <Button
          asChild
          size="lg"
          variant="outline"
          className={`mt-3 h-12 w-full rounded-full font-sans font-semibold ${outlineButton}`}
        >
          <Link
            to="/courses/$courseId"
            params={{ courseId: COURSE.id }}
          >
            View Full Course Details
          </Link>
        </Button>

        <p className="mt-4 text-center font-sans text-xs text-[#4A5B6E]">
          7-day money-back guarantee
        </p>

        <div className="my-6 border-t border-[#E5EDF3]" />

        <h3 className="font-display text-base font-semibold text-[#001C3C]">
          This course includes
        </h3>

        <ul className="mt-5 space-y-4 font-sans text-sm text-[#4A5B6E]">
          <li className="flex items-center gap-3">
            <PlayCircle className="h-4 w-4 shrink-0 text-[#007C89]" />
            {lessonCount()} video lessons · {COURSE.durationHours} hrs
          </li>

          <li className="flex items-center gap-3">
            <InfinityIcon className="h-4 w-4 shrink-0 text-[#007C89]" />
            {COURSE.accessDuration} access
          </li>

          <li className="flex items-center gap-3">
            <MonitorSmartphone className="h-4 w-4 shrink-0 text-[#007C89]" />
            Watch on mobile and desktop
          </li>

          <li className="flex items-center gap-3">
            <Award className="h-4 w-4 shrink-0 text-[#007C89]" />
            Certificate of completion
          </li>
        </ul>
      </div>
    </div>
  );
}
