import { createFileRoute, Link } from "@tanstack/react-router";
import { Archive, BookOpen, Copy, Eye, EyeOff, MoreHorizontal, Pencil, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { EmptyState, PageHeader, StatusBadge } from "@/components/dashboard/common";
import { type Course, type CourseStatus, categories, courses as seed, formatNumber, formatPrice, getCategory } from "@/lib/data";

export const Route = createFileRoute("/admin/courses/")({
  head: () => ({ meta: [{ title: "Courses — Admin" }, { name: "description", content: "Manage your course catalogue." }] }),
  component: AdminCourses,
});

function AdminCourses() {
  const [list, setList] = useState<Course[]>(seed);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [status, setStatus] = useState("all");
  const [archiveId, setArchiveId] = useState<string | null>(null);

  const filtered = useMemo(
    () => list.filter((c) => (cat === "all" || c.categoryId === cat) && (status === "all" || c.status === status) && c.title.toLowerCase().includes(q.toLowerCase())),
    [list, q, cat, status],
  );

  const setCourseStatus = (id: string, s: CourseStatus) => {
    setList((l) => l.map((c) => (c.id === id ? { ...c, status: s } : c)));
    toast.success(`Course ${s === "published" ? "published" : s === "draft" ? "unpublished" : "archived"}`);
  };
  const duplicate = (c: Course) => {
    setList((l) => [{ ...c, id: `${c.id}-copy-${Date.now()}`, title: `${c.title} (Copy)`, status: "draft", students: 0 }, ...l]);
    toast.success("Course duplicated as draft");
  };

  return (
    <div>
      <PageHeader title="Courses" description={`${list.length} courses in your catalogue`} actions={<Button asChild><Link to="/admin/courses/new"><Plus />Add New Course</Link></Button>} />
      <div className="mb-4 grid gap-2 sm:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses" className="bg-surface pl-9" />
        </div>
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="bg-surface sm:w-48"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All categories</SelectItem>{categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="bg-surface sm:w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem><SelectItem value="published">Published</SelectItem><SelectItem value="draft">Draft</SelectItem><SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {filtered.length === 0 ? (
        <EmptyState icon={BookOpen} title="No courses found" description="Try adjusting your search or filters." />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow><TableHead className="pl-5">Course</TableHead><TableHead>Category</TableHead><TableHead>Price</TableHead><TableHead>Students</TableHead><TableHead>Status</TableHead><TableHead className="pr-5 text-right">Actions</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="pl-5">
                      <div className="flex min-w-64 items-center gap-3">
                        <img src={c.image} alt="" width={1024} height={640} className="h-11 w-16 shrink-0 rounded-md object-cover" />
                        <div className="min-w-0"><p className="truncate font-medium">{c.title}</p><p className="text-xs text-muted-foreground">{c.durationHours} hrs · {c.level}</p></div>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{getCategory(c.categoryId)?.name}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {c.isFree ? "Free" : <>{formatPrice(c.discountPrice ?? c.price)}{c.discountPrice && <span className="ml-1.5 text-xs text-muted-foreground line-through">{formatPrice(c.price)}</span>}</>}
                    </TableCell>
                    <TableCell>{formatNumber(c.students)}</TableCell>
                    <TableCell><StatusBadge status={c.status} /></TableCell>
                    <TableCell className="pr-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label="Actions"><MoreHorizontal /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild><Link to="/admin/courses/$courseId" params={{ courseId: c.id }}><Pencil />Edit</Link></DropdownMenuItem>
                          <DropdownMenuItem onClick={() => duplicate(c)}><Copy />Duplicate</DropdownMenuItem>
                          {c.status === "published" ? (
                            <DropdownMenuItem onClick={() => setCourseStatus(c.id, "draft")}><EyeOff />Unpublish</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => setCourseStatus(c.id, "published")}><Eye />Publish</DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive" disabled={c.status === "archived"} onClick={() => setArchiveId(c.id)}><Archive />Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      <AlertDialog open={!!archiveId} onOpenChange={(o) => !o && setArchiveId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive this course?</AlertDialogTitle>
            <AlertDialogDescription>It will be hidden from the website. Existing students keep their access.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => { if (archiveId) setCourseStatus(archiveId, "archived"); setArchiveId(null); }}>Archive</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
