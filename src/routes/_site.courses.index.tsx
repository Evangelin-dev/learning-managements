import { createFileRoute, Link } from "@tanstack/react-router";
import { SearchX, Search } from "lucide-react";
import { useMemo } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CourseCard } from "@/components/site/CourseCard";
import { categories, effectivePrice, publishedCourses } from "@/lib/data";

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  price: z.enum(["all", "free", "under-1000", "1000-2000", "above-2000"]).optional(),
  level: z.enum(["all", "Beginner", "Intermediate", "Advanced"]).optional(),
  sort: z.enum(["popular", "rating", "newest", "price-asc", "price-desc"]).optional(),
});

export const Route = createFileRoute("/_site/courses/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "All Courses — Vilaiyosai" },
      { name: "description", content: "Browse pre-recorded courses in web development, design, marketing, data science, finance and photography." },
      { property: "og:title", content: "All Courses — Vilaiyosai" },
      { property: "og:description", content: "Browse and filter expert-led video courses." },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { q = "", category = "all", price = "all", level = "all", sort = "popular" } = search;
  const set = (patch: Partial<z.infer<typeof searchSchema>>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const list = useMemo(() => {
    let r = publishedCourses();
    if (q) {
      const s = q.toLowerCase();
      r = r.filter((c) => c.title.toLowerCase().includes(s) || c.subtitle.toLowerCase().includes(s));
    }
    if (category !== "all") r = r.filter((c) => c.categoryId === category);
    if (level !== "all") r = r.filter((c) => c.level === level);
    r = r.filter((c) => {
      const p = effectivePrice(c);
      if (price === "free") return p === 0;
      if (price === "under-1000") return p > 0 && p < 1000;
      if (price === "1000-2000") return p >= 1000 && p <= 2000;
      if (price === "above-2000") return p > 2000;
      return true;
    });
    const sorters: Record<string, (a: (typeof r)[0], b: (typeof r)[0]) => number> = {
      popular: (a, b) => b.students - a.students,
      rating: (a, b) => b.rating - a.rating,
      newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
      "price-asc": (a, b) => effectivePrice(a) - effectivePrice(b),
      "price-desc": (a, b) => effectivePrice(b) - effectivePrice(a),
    };
    return [...r].sort(sorters[sort]);
  }, [q, category, price, level, sort]);

  return (
    <div>
      <section className="border-b border-border bg-surface">
        <div className="container-page py-12">
          <p className="font-script text-2xl text-primary">Learn anything</p>
          <h1 className="text-3xl font-bold sm:text-4xl">All courses</h1>
          <p className="mt-2 text-muted-foreground">Pre-recorded, self-paced lessons from industry experts.</p>
          <div className="mt-6 flex max-w-xl items-center gap-2 rounded-lg border border-input bg-surface px-3 shadow-soft">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Input value={q} onChange={(e) => set({ q: e.target.value || undefined })} placeholder="Search courses…" className="border-0 shadow-none focus-visible:ring-0" />
          </div>
        </div>
      </section>
      <div className="container-page py-10">
        <div className="flex flex-wrap gap-2">
          {[{ id: "all", name: "All" }, ...categories].map((c) => (
            <button
              key={c.id}
              onClick={() => set({ category: c.id === "all" ? undefined : c.id })}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${category === c.id ? "border-teal bg-teal text-teal-foreground" : "border-border bg-surface hover:border-teal"}`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">{list.length} {list.length === 1 ? "course" : "courses"} found</p>
          <div className="grid grid-cols-3 gap-2 sm:flex">
            <Select value={level} onValueChange={(v) => set({ level: v as typeof level })}>
              <SelectTrigger className="bg-surface sm:w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Level: All</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={price} onValueChange={(v) => set({ price: v as typeof price })}>
              <SelectTrigger className="bg-surface sm:w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Price: All</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="under-1000">Under ₹1,000</SelectItem>
                <SelectItem value="1000-2000">₹1,000 – ₹2,000</SelectItem>
                <SelectItem value="above-2000">Above ₹2,000</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(v) => set({ sort: v as typeof sort })}>
              <SelectTrigger className="bg-surface sm:w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Sort: Popular</SelectItem>
                <SelectItem value="rating">Highest rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to high</SelectItem>
                <SelectItem value="price-desc">Price: High to low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {list.length ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center rounded-xl border border-dashed border-border bg-surface py-16 text-center">
            <SearchX className="h-10 w-10 text-muted-foreground" />
            <h3 className="mt-4 font-semibold">No courses match your filters</h3>
            <p className="mt-1 text-sm text-muted-foreground">Try a different search or clear the filters.</p>
            <Button asChild variant="outline" className="mt-5"><Link to="/courses">Clear filters</Link></Button>
          </div>
        )}
      </div>
    </div>
  );
}
