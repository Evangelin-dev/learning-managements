import { createFileRoute } from "@tanstack/react-router";
import { Clock, Download, Eye, Percent, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, Panel, ProgressBar, StatCard, UserAvatar } from "@/components/dashboard/common";
import { formatNumber, getCourse, publishedCourses, users, videos, viewsByDay } from "@/lib/data";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Video Analytics — Admin" }, { name: "description", content: "Video plays, viewers and completion." }] }),
  component: Analytics,
});

const tip = { borderRadius: 8, border: "1px solid var(--border)", background: "var(--card)" };

function Analytics() {
  const [range, setRange] = useState("7");
  const mult = range === "7" ? 1 : range === "30" ? 4.2 : 12.5;
  const plays = Math.round(viewsByDay.reduce((n, d) => n + d.plays, 0) * mult);
  const courseData = publishedCourses().map((c) => {
    const vs = videos.filter((v) => v.courseId === c.id);
    return { name: c.title.split(" ").slice(0, 2).join(" "), views: vs.reduce((n, v) => n + v.views, 0), completion: Math.round(vs.reduce((n, v) => n + v.completion, 0) / vs.length) };
  });
  const topVideos = [...videos].sort((a, b) => b.views - a.views).slice(0, 8);
  return (
    <div>
      <PageHeader title="Video Analytics" actions={<>
        <Select value={range} onValueChange={setRange}><SelectTrigger className="w-40 bg-surface"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="7">Last 7 days</SelectItem><SelectItem value="30">Last 30 days</SelectItem><SelectItem value="90">Last 90 days</SelectItem></SelectContent></Select>
        <Button variant="outline" onClick={() => toast.success("Report exported (demo)")}><Download />Export</Button>
      </>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total video plays" value={formatNumber(plays)} icon={Eye} change={14.2} />
        <StatCard label="Unique viewers" value={formatNumber(Math.round(plays * 0.51))} icon={Users} change={9.1} tone="teal" />
        <StatCard label="Avg. watch time" value="11m 42s" icon={Clock} change={4.6} tone="warning" />
        <StatCard label="Completion rate" value="68%" icon={Percent} change={2.3} tone="success" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel title="Plays & viewers">
          <div className="h-64"><ResponsiveContainer><LineChart data={viewsByDay.map((d) => ({ ...d, plays: Math.round(d.plays * mult), viewers: Math.round(d.viewers * mult) }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} /><XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} /><YAxis fontSize={12} tickLine={false} axisLine={false} width={48} /><Tooltip contentStyle={tip} />
            <Line type="monotone" dataKey="plays" stroke="var(--primary)" strokeWidth={2.5} dot={false} /><Line type="monotone" dataKey="viewers" stroke="var(--teal)" strokeWidth={2.5} dot={false} />
          </LineChart></ResponsiveContainer></div>
        </Panel>
        <Panel title="Course-wise performance">
          <div className="h-64"><ResponsiveContainer><BarChart data={courseData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} /><XAxis type="number" fontSize={12} tickLine={false} axisLine={false} /><YAxis type="category" dataKey="name" fontSize={11} width={90} tickLine={false} axisLine={false} /><Tooltip contentStyle={tip} />
            <Bar dataKey="views" fill="var(--primary)" radius={[0, 4, 4, 0]} />
          </BarChart></ResponsiveContainer></div>
        </Panel>
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Panel title="Video-wise performance">
          <div className="-m-5 overflow-x-auto"><Table>
            <TableHeader><TableRow><TableHead className="pl-5">Video</TableHead><TableHead>Course</TableHead><TableHead>Views</TableHead><TableHead className="pr-5">Completion</TableHead></TableRow></TableHeader>
            <TableBody>{topVideos.map((v) => <TableRow key={v.id}><TableCell className="pl-5 font-medium">{v.title}</TableCell><TableCell className="max-w-44 truncate text-muted-foreground">{getCourse(v.courseId)?.title}</TableCell><TableCell>{formatNumber(v.views)}</TableCell><TableCell className="pr-5"><div className="flex w-32 items-center gap-2"><ProgressBar value={v.completion} /><span className="text-xs">{v.completion}%</span></div></TableCell></TableRow>)}</TableBody>
          </Table></div>
        </Panel>
        <Panel title="User viewing activity">
          <ul className="space-y-3">{users.filter((u) => u.enrollments.length).slice(0, 7).map((u) => (
            <li key={u.id} className="flex items-center gap-3"><UserAvatar initials={u.initials} size="sm" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{u.name}</p><p className="truncate text-xs text-muted-foreground">{getCourse(u.enrollments[0].courseId)?.title}</p></div><span className="text-xs font-semibold text-primary">{u.enrollments[0].progress}%</span></li>
          ))}</ul>
        </Panel>
      </div>
    </div>
  );
}
