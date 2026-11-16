import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { courses, formatNumber, instructors } from "@/lib/data";

export const Route = createFileRoute("/_site/instructors")({
  head: () => ({
    meta: [
      { title: "Instructors — Vilaiyosai" },
      { name: "description", content: "Meet the industry experts who teach Vilaiyosai's video courses." },
      { property: "og:title", content: "Instructors — Vilaiyosai" },
      { property: "og:description", content: "Meet the industry experts behind our courses." },
    ],
  }),
  component: Instructors,
});

function Instructors() {
  return (
    <>
      <PageHero eyebrow="Learn from the best" title="Our instructors" subtitle="Practitioners who teach what they do every day." />
      <div className="container-page grid gap-6 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {instructors.map((i) => {
          const theirs = courses.filter((c) => c.instructorId === i.id && c.status === "published");
          return (
            <div key={i.id} className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-soft">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-gradient font-display text-lg font-semibold text-primary-foreground">{i.initials}</span>
              <h3 className="mt-4 text-lg font-semibold">{i.name}</h3>
              <p className="text-sm text-primary">{i.title}</p>
              <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" />{i.rating}</span>
                <span>{formatNumber(i.students)} learners</span>
              </div>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{i.bio}</p>
              <div className="mt-4 space-y-1 border-t border-border pt-4">
                {theirs.map((c) => (
                  <Link key={c.id} to="/courses/$courseId" params={{ courseId: c.id }} className="block truncate text-sm font-medium text-primary hover:underline">{c.title}</Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
