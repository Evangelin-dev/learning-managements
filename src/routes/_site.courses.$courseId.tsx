import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Award, BarChart3, Check, Clock, Globe, Infinity as InfinityIcon, MonitorSmartphone, PlayCircle, Star, Users } from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { COURSE, formatNumber, formatPrice, getCourse, lessonCount } from "@/lib/data";
import { VideoPlayer } from "@/components/VideoPlayer";

export const Route = createFileRoute("/_site/courses/$courseId")({
  loader: ({ params }) => {
    const course = getCourse(params.courseId);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.course.title} — Vilaiyosai` },
          { name: "description", content: loaderData.course.subtitle },
          { property: "og:title", content: loaderData.course.title },
          { property: "og:description", content: loaderData.course.subtitle },
          { property: "og:type", content: "website" },
        ]
      : [{ title: "Course not found — Vilaiyosai" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="text-2xl font-semibold">Course not found</h1>
      <Button asChild className="mt-6"><Link to="/">Back to home</Link></Button>
    </div>
  ),
  component: CourseDetail,
});

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const [preview, setPreview] = useState(false);
  const price = course.discountPrice ?? course.price;
  const off = course.discountPrice ? Math.round((1 - course.discountPrice / course.price) * 100) : 0;

  return (
    <div>
      <section className="bg-ink text-ink-foreground">
        <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_380px] lg:py-16">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-ink-foreground/70">
              <Link to="/" className="hover:text-teal">Home</Link> / <span>Share Market</span>
            </div>
            <Badge variant="teal" className="mt-4">Bestseller</Badge>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{course.title}</h1>
            <p className="mt-3 max-w-2xl text-lg text-ink-foreground/80">{course.subtitle}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="flex items-center gap-1 font-semibold text-warning"><Star className="h-4 w-4 fill-warning" />{course.rating} <span className="font-normal text-ink-foreground/70">({formatNumber(course.reviews)} reviews)</span></span>
              <span className="flex items-center gap-1 text-ink-foreground/80"><Users className="h-4 w-4" />{formatNumber(course.students)} students</span>
              <span className="flex items-center gap-1 text-ink-foreground/80"><Clock className="h-4 w-4" />{course.durationHours} hours</span>
              <span className="flex items-center gap-1 text-ink-foreground/80"><BarChart3 className="h-4 w-4" />{course.level}</span>
            </div>
            <p className="mt-4 text-sm text-ink-foreground/80">Created by <span className="font-semibold text-teal">{course.instructorName}</span></p>
            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-foreground/60">
              <span>Last updated {course.lastUpdated}</span>
              <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" />{course.language}</span>
            </p>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-10 py-10 lg:grid-cols-[1fr_380px]">
        <div className="order-2 space-y-10 lg:order-1">
          <section className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-xl font-semibold">What you'll learn</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {course.outcomes.map((o) => (
                <li key={o} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{o}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">About this course</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{course.description}</p>
          </section>

          <section>
            <div className="flex items-end justify-between">
              <h2 className="text-xl font-semibold">Course content</h2>
              <span className="text-sm text-muted-foreground">{course.sections.length} sections · {lessonCount(course)} lessons · {course.durationHours}h</span>
            </div>
            <Accordion type="multiple" defaultValue={[course.sections[0].id]} className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
              {course.sections.map((s, i) => (
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
                            {l.preview && (
                              <button onClick={() => setPreview(true)} className="text-xs font-semibold text-primary hover:underline">Preview</button>
                            )}
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

          <section className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-xl font-semibold">Your instructor</h2>
            <div className="mt-4 flex items-start gap-4">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-brand-gradient font-display text-lg font-semibold text-primary-foreground">{course.instructorInitials}</span>
              <div>
                <h3 className="font-semibold">{course.instructorName}</h3>
                <p className="text-sm text-primary">{course.instructorTitle}</p>
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span>★ {course.rating} rating</span>
                  <span>{formatNumber(course.students)} students</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{course.instructorBio}</p>
              </div>
            </div>
          </section>
        </div>

        <aside className="order-1 lg:order-2 lg:-mt-64">
          <div className="sticky top-24 overflow-hidden rounded-xl border border-border bg-card shadow-card">
            <button onClick={() => setPreview(true)} className="group relative block aspect-video w-full overflow-hidden">
              <img src={course.image} alt={course.title} width={1024} height={640} className="h-full w-full object-cover" />
              <span className="absolute inset-0 grid place-items-center bg-ink/40 transition-colors group-hover:bg-ink/55">
                <span className="flex flex-col items-center gap-2 text-sm font-semibold text-ink-foreground">
                  <PlayCircle className="h-14 w-14" /> Preview this course
                </span>
              </span>
            </button>
            <div className="p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold">{formatPrice(price)}</span>
                <span className="text-muted-foreground line-through">{formatPrice(course.price)}</span>
                <Badge variant="success">{off}% off</Badge>
              </div>
              <p className="mt-1.5 text-xs font-medium text-destructive">⏳ 2 days left at this price!</p>
              <Button asChild size="lg" className="mt-4 w-full">
                <Link to="/checkout/$courseId" params={{ courseId: course.id }}>Buy Now</Link>
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">7-day money-back guarantee</p>
              <ul className="mt-5 space-y-2.5 text-sm">
                <li className="flex items-center gap-2"><PlayCircle className="h-4 w-4 text-primary" />{lessonCount(course)} video lessons · {course.durationHours} hrs</li>
                <li className="flex items-center gap-2"><InfinityIcon className="h-4 w-4 text-primary" />{course.accessDuration} access</li>
                <li className="flex items-center gap-2"><MonitorSmartphone className="h-4 w-4 text-primary" />Watch on mobile and desktop</li>
                <li className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" />Certificate of completion</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <Dialog open={preview} onOpenChange={setPreview}>
        <DialogContent className="max-w-3xl p-0 sm:rounded-xl">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Preview: {course.sections[0].lessons[0].title}</DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6">
            <VideoPlayer poster={course.image} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
