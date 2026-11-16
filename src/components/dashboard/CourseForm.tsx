import { Link, useNavigate } from "@tanstack/react-router";
import { GripVertical, ImagePlus, Loader2, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Panel } from "./common";
import { type Course, type Section, categories, instructors } from "@/lib/data";

export function CourseForm({ course }: { course?: Course }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(course?.title ?? "");
  const [subtitle, setSubtitle] = useState(course?.subtitle ?? "");
  const [description, setDescription] = useState(course?.description ?? "");
  const [category, setCategory] = useState(course?.categoryId ?? "");
  const [instructor, setInstructor] = useState(course?.instructorId ?? "arjun");
  const [pricing, setPricing] = useState<"paid" | "free">(course?.isFree ? "free" : "paid");
  const [price, setPrice] = useState(String(course?.price ?? ""));
  const [discount, setDiscount] = useState(String(course?.discountPrice ?? ""));
  const [access, setAccess] = useState(course?.accessDuration ?? "Lifetime");
  const [visible, setVisible] = useState(course ? course.status === "published" : false);
  const [preview, setPreview] = useState(course?.previewEnabled ?? true);
  const [thumb, setThumb] = useState<string | undefined>(course?.image);
  const [outcomes, setOutcomes] = useState<string[]>(course?.outcomes ?? [""]);
  const [sections, setSections] = useState<Section[]>(course?.sections ?? [{ id: "s1", title: "Introduction", lessons: [] }]);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const save = (publish?: boolean) => {
    const err: Record<string, string> = {};
    if (title.trim().length < 4) err.title = "Title must be at least 4 characters";
    if (!category) err.category = "Choose a category";
    if (pricing === "paid" && !(Number(price) > 0)) err.price = "Enter a price";
    if (pricing === "paid" && discount && Number(discount) >= Number(price)) err.discount = "Discount price must be lower than the price";
    setErrors(err);
    if (Object.keys(err).length) return toast.error("Please fix the highlighted fields");
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success(course ? "Course updated" : publish ? "Course published" : "Course saved as draft");
      navigate({ to: "/admin/courses" });
    }, 800);
  };

  const updateSection = (i: number, patch: Partial<Section>) => setSections((s) => s.map((x, j) => (j === i ? { ...x, ...patch } : x)));

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
      <div className="min-w-0 space-y-6">
        <Panel title="Basic information">
          <div className="space-y-4">
            <F label="Course title" error={errors.title}><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Complete React Developer" /></F>
            <F label="Short description"><Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="One line shown on course cards" /></F>
            <F label="Full description"><Textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} /></F>
            <div className="grid gap-4 sm:grid-cols-2">
              <F label="Category" error={errors.category}>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>{categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </F>
              <F label="Instructor">
                <Select value={instructor} onValueChange={setInstructor}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{instructors.map((i) => <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>)}</SelectContent>
                </Select>
              </F>
            </div>
          </div>
        </Panel>

        <Panel title="Learning outcomes">
          <div className="space-y-2">
            {outcomes.map((o, i) => (
              <div key={i} className="flex gap-2">
                <Input value={o} onChange={(e) => setOutcomes(outcomes.map((x, j) => (j === i ? e.target.value : x)))} placeholder="What will students be able to do?" />
                <Button type="button" variant="ghost" size="icon" onClick={() => setOutcomes(outcomes.filter((_, j) => j !== i))} aria-label="Remove"><X /></Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => setOutcomes([...outcomes, ""])}><Plus />Add outcome</Button>
          </div>
        </Panel>

        <Panel title="Syllabus" action={<Button type="button" size="sm" variant="outline" onClick={() => setSections([...sections, { id: `s${Date.now()}`, title: "New section", lessons: [] }])}><Plus />Section</Button>}>
          <div className="space-y-4">
            {sections.map((s, i) => (
              <div key={s.id} className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="shrink-0 text-xs font-semibold text-muted-foreground">Section {i + 1}</span>
                  <Input value={s.title} onChange={(e) => updateSection(i, { title: e.target.value })} className="h-8 bg-surface" />
                  <Button type="button" variant="ghost" size="icon" onClick={() => setSections(sections.filter((_, j) => j !== i))} aria-label="Delete section"><Trash2 /></Button>
                </div>
                <ul className="mt-3 space-y-1.5 pl-6">
                  {s.lessons.map((l, li) => (
                    <li key={l.id} className="flex items-center gap-2 rounded-md bg-surface px-3 py-2 text-sm">
                      <span className="w-5 text-xs text-muted-foreground">{li + 1}.</span>
                      <span className="min-w-0 flex-1 truncate">{l.title}</span>
                      <span className="text-xs text-muted-foreground">{l.duration}</span>
                      <button type="button" onClick={() => updateSection(i, { lessons: s.lessons.filter((x) => x.id !== l.id) })} aria-label="Remove lesson"><X className="h-3.5 w-3.5 text-muted-foreground" /></button>
                    </li>
                  ))}
                  <li>
                    <button type="button" className="text-xs font-semibold text-primary hover:underline" onClick={() => updateSection(i, { lessons: [...s.lessons, { id: `l${Date.now()}`, title: `New lesson ${s.lessons.length + 1}`, duration: "0:00", seconds: 0 }] })}>+ Add lesson</button>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="space-y-6">
        <Panel title="Thumbnail">
          <label className="block cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-border bg-background transition-colors hover:border-primary">
            {thumb ? <img src={thumb} alt="Thumbnail" className="aspect-video w-full object-cover" /> : (
              <div className="flex aspect-video flex-col items-center justify-center gap-2 text-sm text-muted-foreground"><ImagePlus className="h-8 w-8" />Click to upload (1280×720)</div>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setThumb(URL.createObjectURL(f)); }} />
          </label>
        </Panel>
        <Panel title="Pricing">
          <RadioGroup value={pricing} onValueChange={(v) => setPricing(v as "paid" | "free")} className="grid grid-cols-2 gap-2">
            {(["paid", "free"] as const).map((p) => (
              <Label key={p} htmlFor={`p-${p}`} className={`flex cursor-pointer items-center gap-2 rounded-md border p-3 capitalize ${pricing === p ? "border-primary bg-accent" : "border-border"}`}>
                <RadioGroupItem value={p} id={`p-${p}`} />{p}
              </Label>
            ))}
          </RadioGroup>
          {pricing === "paid" && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <F label="Price (₹)" error={errors.price}><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></F>
              <F label="Discount price (₹)" error={errors.discount}><Input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} /></F>
            </div>
          )}
          <div className="mt-4">
            <F label="Access duration">
              <Select value={access} onValueChange={setAccess}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{["Lifetime", "1 year", "6 months", "3 months"].map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
              </Select>
            </F>
          </div>
        </Panel>
        <Panel title="Visibility">
          <div className="space-y-4">
            <Toggle label="Visible on website" desc="Show this course in the public catalogue" checked={visible} onChange={setVisible} />
            <Toggle label="Free preview" desc="Let visitors watch the first lesson" checked={preview} onChange={setPreview} />
          </div>
        </Panel>
        <div className="flex flex-col gap-2">
          <Button onClick={() => save(true)} disabled={saving}>{saving && <Loader2 className="animate-spin" />}{course ? "Save changes" : "Publish course"}</Button>
          {!course && <Button variant="outline" onClick={() => save(false)} disabled={saving}>Save as draft</Button>}
          <Button asChild variant="ghost"><Link to="/admin/courses">Cancel</Link></Button>
        </div>
      </div>
    </div>
  );
}

function F({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5 block">{label}</Label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Toggle({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div><p className="text-sm font-medium">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
