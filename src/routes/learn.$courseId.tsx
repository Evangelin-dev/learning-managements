import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/VideoPlayer";
import { allLessons, getCourse } from "@/lib/data";

export const Route = createFileRoute("/learn/$courseId")({
  loader: ({ params }) => { const course = getCourse(params.courseId); if (!course) throw notFound(); return { course }; },
  head: () => ({ meta: [{ title: "Learning — Vilaiyosai" }, { name: "robots", content: "noindex" }] }),
  component: Learn,
});

function Learn() {
  const { course } = Route.useLoaderData();
  const lessons = allLessons(course);
  const [i, setI] = useState(0);
  const lesson = lessons[i]!;
  return (
    <div className="container-page grid gap-6 py-6 lg:grid-cols-[1fr_320px]">
      <div>
        <Link to="/dashboard" className="text-sm text-primary">← Dashboard</Link>
        <VideoPlayer className="mt-3" poster={course.image} resumeKey={lesson.id} />
        <h1 className="mt-4 text-xl font-semibold">{lesson.title}</h1>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" disabled={i === 0} onClick={() => setI(i - 1)}>Previous</Button>
          <Button disabled={i === lessons.length - 1} onClick={() => setI(i + 1)}>Next lesson</Button>
        </div>
      </div>
      <aside className="rounded-xl border border-border bg-card p-4">
        {course.sections.map((s) => (
          <div key={s.id} className="mb-4">
            <p className="text-sm font-semibold">{s.title}</p>
            {s.lessons.map((l) => { const idx = lessons.indexOf(l); return (
              <button key={l.id} onClick={() => setI(idx)} className={`block w-full rounded px-2 py-1.5 text-left text-sm ${idx === i ? "bg-accent text-primary" : ""}`}>{l.title} <span className="text-xs text-muted-foreground">{l.duration}</span></button>
            ); })}
          </div>
        ))}
      </aside>
    </div>
  );
}
