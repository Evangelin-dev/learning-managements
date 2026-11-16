import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BarChart3, Check, Clock, Globe, Infinity as InfinityIcon, MonitorSmartphone, PlayCircle, Quote, ShieldCheck, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { COURSE, faqs, formatNumber, formatPrice, lessonCount, testimonials } from "@/lib/data";

export const Route = createFileRoute("/_site/index/backup")({
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

const off = Math.round((1 - COURSE.discountPrice / COURSE.price) * 100);

function Home() {
  return (
    <>
      {/* Udemy-style dark hero with floating buy card */}
      <section className="bg-ink text-ink-foreground">
        <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_380px] lg:py-16">
          <div>
            <Badge variant="teal">Bestseller · Share Market Course</Badge>
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]">{COURSE.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-foreground/80">{COURSE.subtitle}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5 font-semibold text-warning">
                {COURSE.rating} <Star className="h-4 w-4 fill-warning" />
                <span className="font-normal text-teal underline underline-offset-2">({formatNumber(COURSE.reviews)} ratings)</span>
              </span>
              <span className="flex items-center gap-1 text-ink-foreground/80"><Users className="h-4 w-4" />{formatNumber(COURSE.students)} students</span>
              <span className="flex items-center gap-1 text-ink-foreground/80"><Clock className="h-4 w-4" />{COURSE.durationHours} hours</span>
              <span className="flex items-center gap-1 text-ink-foreground/80"><BarChart3 className="h-4 w-4" />{COURSE.level}</span>
            </div>
            <p className="mt-4 text-sm text-ink-foreground/80">
              Created by <span className="font-semibold text-teal">{COURSE.instructorName}</span>, {COURSE.instructorTitle}
            </p>
            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-foreground/60">
              <span>Last updated {COURSE.lastUpdated}</span>
              <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" />{COURSE.language}</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3 lg:hidden">
              <Button asChild size="lg"><Link to="/checkout/$courseId" params={{ courseId: COURSE.id }}>Buy now — {formatPrice(COURSE.discountPrice)}</Link></Button>
            </div>
          </div>

          {/* Sticky purchase card (Udemy style) */}
          <aside className="hidden lg:block">
            <BuyCard />
          </aside>
        </div>
      </section>

      {/* Mobile buy card */}
      <div className="container-page py-8 lg:hidden">
        <BuyCard />
      </div>

      <div className="container-page grid gap-10 py-4 lg:grid-cols-[1fr_380px] lg:py-10">
        <div className="space-y-12">
          {/* What you'll learn */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-xl font-semibold">What you'll learn</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {COURSE.outcomes.map((o) => (
                <li key={o} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{o}</li>
              ))}
            </ul>
          </section>

          {/* This course includes */}
          <section>
            <h2 className="text-xl font-semibold">This course includes</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {COURSE.includes.map((x, i) => (
                <li key={x} className="flex items-center gap-2.5 text-sm">
                  {[PlayCircle, MonitorSmartphone, InfinityIcon, Award, ShieldCheck, Clock][i % 6] &&
                    (() => { const Icon = [PlayCircle, MonitorSmartphone, InfinityIcon, Award, ShieldCheck, Clock][i % 6]; return <Icon className="h-4 w-4 shrink-0 text-primary" />; })()}
                  {x}
                </li>
              ))}
            </ul>
          </section>

          {/* Curriculum */}
          <section>
            <div className="flex items-end justify-between">
              <h2 className="text-xl font-semibold">Course content</h2>
              <span className="text-sm text-muted-foreground">{COURSE.sections.length} sections · {lessonCount()} lessons · {COURSE.durationHours}h total</span>
            </div>
            <Accordion type="multiple" defaultValue={[COURSE.sections[0].id]} className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
              {COURSE.sections.map((s, i) => (
                <AccordionItem key={s.id} value={s.id} className="border-b border-border last:border-0">
                  <AccordionTrigger className="px-5 hover:no-underline">
                    <span className="text-left">
                      <span className="block text-xs font-medium text-muted-foreground">Section {i + 1}</span>
                      <span className="font-semibold">{s.title}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5">
                    <ul className="divide-y divide-border">
                      {s.lessons.map((l) => (
                        <li key={l.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                          <span className="flex min-w-0 items-center gap-2">
                            <PlayCircle className={`h-4 w-4 shrink-0 ${l.preview ? "text-primary" : "text-muted-foreground"}`} />
                            <span className="truncate">{l.title}</span>
                          </span>
                          <span className="flex shrink-0 items-center gap-3">
                            {l.preview && <span className="text-xs font-semibold text-primary">Preview</span>}
                            <span className="text-muted-foreground">{l.duration}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Instructor */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-xl font-semibold">Your instructor</h2>
            <div className="mt-4 flex items-start gap-4">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-brand-gradient font-display text-lg font-semibold text-primary-foreground">{COURSE.instructorInitials}</span>
              <div>
                <h3 className="font-semibold">{COURSE.instructorName}</h3>
                <p className="text-sm text-primary">{COURSE.instructorTitle}</p>
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span>★ {COURSE.rating} instructor rating</span>
                  <span>{formatNumber(COURSE.students)} students</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{COURSE.instructorBio}</p>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section>
            <h2 className="text-xl font-semibold">What our students say</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {testimonials.map((t) => (
                <figure key={t.name} className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-soft">
                  <Quote className="h-6 w-6 text-teal" />
                  <div className="mt-2 flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />)}</div>
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85">“{t.quote}”</blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">{t.initials}</span>
                    <span>
                      <span className="block text-sm font-semibold">{t.name}</span>
                      <span className="block text-xs text-muted-foreground">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-semibold">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`f${i}`} className="border-b border-border last:border-0">
                  <AccordionTrigger className="px-5 text-left text-sm font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="px-5 text-sm text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        {/* Desktop sticky spacer keeps grid alignment */}
        <div className="hidden lg:block" />
      </div>

      {/* Final CTA */}
      <section className="container-page pb-20">
        <div className="grid items-center gap-8 rounded-2xl border border-teal/30 bg-aqua p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-script text-2xl text-primary">Sirf ek baar payment!</p>
            <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">Ready to start your share market journey?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Join {formatNumber(COURSE.students)} students learning to trade and invest with confidence.</p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {["Lifetime access to all 48 lessons", "7-day money-back guarantee", "Watch on mobile or desktop"].map((x) => (
                <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{x}</li>
              ))}
            </ul>
          </div>
          <div className="grid gap-3">
            <div className="flex items-baseline justify-center gap-3">
              <span className="font-display text-4xl font-bold">{formatPrice(COURSE.discountPrice)}</span>
              <span className="text-lg text-muted-foreground line-through">{formatPrice(COURSE.price)}</span>
              <Badge variant="success">{off}% off</Badge>
            </div>
            <Button asChild size="lg"><Link to="/checkout/$courseId" params={{ courseId: COURSE.id }}>Buy Now</Link></Button>
            <Button asChild size="lg" variant="outline-primary"><Link to="/login">Student Login</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}

function BuyCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card text-foreground shadow-card lg:sticky lg:top-24">
      <Link to="/courses/$courseId" params={{ courseId: COURSE.id }} className="group relative block aspect-video overflow-hidden">
        <img src={COURSE.image} alt={COURSE.title} width={1024} height={640} className="h-full w-full object-cover" />
        <span className="absolute inset-0 grid place-items-center bg-ink/40 transition-colors group-hover:bg-ink/55">
          <span className="flex flex-col items-center gap-2 text-sm font-semibold text-ink-foreground">
            <PlayCircle className="h-14 w-14" /> Preview this course
          </span>
        </span>
      </Link>
      <div className="p-6">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-3xl font-bold">{formatPrice(COURSE.discountPrice)}</span>
          <span className="text-muted-foreground line-through">{formatPrice(COURSE.price)}</span>
          <Badge variant="success">{off}% off</Badge>
        </div>
        <p className="mt-1.5 text-xs font-medium text-destructive">⏳ 2 days left at this price!</p>
        <Button asChild size="lg" className="mt-4 w-full">
          <Link to="/checkout/$courseId" params={{ courseId: COURSE.id }}>Buy Now</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="mt-2 w-full">
          <Link to="/courses/$courseId" params={{ courseId: COURSE.id }}>View full course details</Link>
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">7-day money-back guarantee</p>
        <ul className="mt-5 space-y-2.5 text-sm">
          <li className="flex items-center gap-2"><PlayCircle className="h-4 w-4 text-primary" />{lessonCount()} video lessons · {COURSE.durationHours} hrs</li>
          <li className="flex items-center gap-2"><InfinityIcon className="h-4 w-4 text-primary" />{COURSE.accessDuration} access</li>
          <li className="flex items-center gap-2"><MonitorSmartphone className="h-4 w-4 text-primary" />Watch on mobile and desktop</li>
          <li className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" />Certificate of completion</li>
        </ul>
      </div>
    </div>
  );
}
