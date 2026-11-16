import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, ProgressBar } from "@/components/dashboard/common";
import { currentStudent, getCourse } from "@/lib/data";

export const Route = createFileRoute("/dashboard/")({ component: Overview });

function Overview() {
  const s = currentStudent!;
  return (
    <div>
      <PageHeader title={`Welcome back, ${s.name.split(" ")[0]}!`} description={`${s.enrollments.length} enrolled courses`} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {s.enrollments.map((e) => { const c = getCourse(e.courseId)!; return (
          <Link key={c.id} to="/learn/$courseId" params={{ courseId: c.id }} className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
            <img src={c.image} alt="" className="aspect-video w-full object-cover" />
            <div className="p-4"><p className="font-semibold">{c.title}</p><ProgressBar value={e.progress} className="mt-3" /><p className="mt-1 text-xs text-muted-foreground">{e.progress}% · Continue learning</p></div>
          </Link>); })}
      </div>
    </div>
  );
}
