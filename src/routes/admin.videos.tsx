import { createFileRoute } from "@tanstack/react-router";
import { Eye, EyeOff, Play, RefreshCw, UploadCloud } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageHeader, Panel, ProgressBar, StatusBadge } from "@/components/dashboard/common";
import { VideoPlayer } from "@/components/VideoPlayer";
import { courses, getCourse, videos as seed, type Video } from "@/lib/data";

export const Route = createFileRoute("/admin/videos")({
  head: () => ({ meta: [{ title: "Video Management — Admin" }, { name: "description", content: "Upload and organise lesson videos." }] }),
  component: Videos,
});

type Upload = { name: string; progress: number };

function Videos() {
  const [list, setList] = useState<Video[]>(seed);
  const [course, setCourse] = useState("all");
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [drag, setDrag] = useState(false);
  const [preview, setPreview] = useState<Video | null>(null);
  const [form, setForm] = useState({ title: "", course: courses[0].id, section: courses[0].sections[0].title, download: false });

  const start = (files: FileList | null) => {
    if (!files?.length) return;
    Array.from(files).forEach((f) => {
      setUploads((u) => [...u, { name: f.name, progress: 0 }]);
      let p = 0;
      const t = setInterval(() => {
        p += 12;
        setUploads((u) => u.map((x) => (x.name === f.name ? { ...x, progress: Math.min(p, 100) } : x)));
        if (p >= 100) { clearInterval(t); toast.success(`${f.name} uploaded — processing`); }
      }, 300);
    });
  };

  const shown = list.filter((v) => course === "all" || v.courseId === course);
  const sections = getCourse(form.course)?.sections ?? [];

  return (
    <div>
      <PageHeader title="Video Management" description={`${list.length} lesson videos`} />
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <Panel title="Upload videos">
          <label
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); start(e.dataTransfer.files); }}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-colors ${drag ? "border-primary bg-accent" : "border-border bg-background"}`}
          >
            <UploadCloud className="h-10 w-10 text-primary" />
            <p className="mt-3 font-semibold">Drag and drop video files here</p>
            <p className="text-sm text-muted-foreground">MP4, MOV up to 4 GB — or click to browse</p>
            <input type="file" accept="video/*" multiple className="hidden" onChange={(e) => start(e.target.files)} />
          </label>
          {uploads.length > 0 && (
            <ul className="mt-4 space-y-3">
              {uploads.map((u) => (
                <li key={u.name} className="rounded-lg border border-border p-3">
                  <div className="flex justify-between text-sm"><span className="truncate">{u.name}</span><span className="text-muted-foreground">{u.progress < 100 ? `${u.progress}%` : "Processing…"}</span></div>
                  <ProgressBar value={u.progress} className="mt-2" />
                </li>
              ))}
            </ul>
          )}
        </Panel>
        <Panel title="Video details">
          <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); if (!form.title) return toast.error("Add a title"); setList([{ id: `v${Date.now()}`, title: form.title, courseId: form.course, sectionTitle: form.section, order: 99, duration: "0:00", status: "processing", views: 0, completion: 0, captions: false, downloadable: form.download }, ...list]); setForm({ ...form, title: "" }); toast.success("Lesson added"); }}>
            <div><Label className="mb-1.5 block">Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label className="mb-1.5 block">Description</Label><Textarea rows={2} /></div>
            <div><Label className="mb-1.5 block">Course</Label>
              <Select value={form.course} onValueChange={(v) => setForm({ ...form, course: v, section: getCourse(v)?.sections[0]?.title ?? "" })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{courses.map((c) => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}</SelectContent></Select></div>
            <div><Label className="mb-1.5 block">Section</Label>
              <Select value={form.section} onValueChange={(v) => setForm({ ...form, section: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{sections.map((s) => <SelectItem key={s.id} value={s.title}>{s.title}</SelectItem>)}</SelectContent></Select></div>
            <div><Label className="mb-1.5 block">Captions (.vtt / .srt)</Label><Input type="file" accept=".vtt,.srt" /></div>
            <div className="flex items-center justify-between"><Label>Allow download</Label><Switch checked={form.download} onCheckedChange={(v) => setForm({ ...form, download: v })} /></div>
            <Button type="submit" className="w-full">Save lesson</Button>
          </form>
        </Panel>
      </div>
      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-soft">
        <div className="flex items-center justify-between gap-3 border-b border-border p-4">
          <h2 className="font-semibold">All videos</h2>
          <Select value={course} onValueChange={setCourse}><SelectTrigger className="w-56"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All courses</SelectItem>{courses.map((c) => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}</SelectContent></Select>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead className="pl-5">Lesson</TableHead><TableHead>Course / Section</TableHead><TableHead>Order</TableHead><TableHead>Duration</TableHead><TableHead>Captions</TableHead><TableHead>Status</TableHead><TableHead className="pr-5 text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {shown.slice(0, 40).map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="pl-5 font-medium">{v.title}</TableCell>
                  <TableCell className="text-xs"><p className="max-w-48 truncate">{getCourse(v.courseId)?.title}</p><p className="text-muted-foreground">{v.sectionTitle}</p></TableCell>
                  <TableCell>{v.order}</TableCell>
                  <TableCell>{v.duration}</TableCell>
                  <TableCell>{v.captions ? "Yes" : "—"}</TableCell>
                  <TableCell><StatusBadge status={v.status} /></TableCell>
                  <TableCell className="whitespace-nowrap pr-5 text-right">
                    <Button variant="ghost" size="icon" aria-label="Preview" onClick={() => setPreview(v)}><Play /></Button>
                    <Button variant="ghost" size="icon" aria-label="Toggle publish" onClick={() => { setList(list.map((x) => x.id === v.id ? { ...x, status: x.status === "published" ? "unpublished" : "published" } : x)); toast.success("Video status updated"); }}>{v.status === "published" ? <EyeOff /> : <Eye />}</Button>
                    <Button variant="ghost" size="icon" aria-label="Replace" onClick={() => toast.info("Choose a new file to replace this video")}><RefreshCw /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="max-w-3xl"><DialogHeader><DialogTitle>{preview?.title}</DialogTitle></DialogHeader><VideoPlayer poster={getCourse(preview?.courseId ?? "")?.image} /></DialogContent>
      </Dialog>
    </div>
  );
}
