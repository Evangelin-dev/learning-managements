import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog, PageHeader } from "@/components/dashboard/common";
import { categories as seed, courses } from "@/lib/data";

export const Route = createFileRoute("/admin/categories")({
  head: () => ({ meta: [{ title: "Categories — Admin" }, { name: "description", content: "Manage course categories." }] }),
  component: Categories,
});

function Categories() {
  const [list, setList] = useState(seed);
  const [name, setName] = useState("");
  return (
    <div>
      <PageHeader title="Categories" description="Group courses so learners can find them." />
      <form className="mb-6 flex max-w-md gap-2" onSubmit={(e) => { e.preventDefault(); if (!name.trim()) return; setList([...list, { id: name.toLowerCase().replace(/\s+/g, "-"), name, description: "New category", image: seed[0].image }]); setName(""); toast.success("Category added"); }}>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="New category name" className="bg-surface" />
        <Button type="submit"><Plus />Add</Button>
      </form>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((c) => (
          <div key={c.id} className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-soft">
            <img src={c.image} alt="" className="h-16 w-20 shrink-0 rounded-md object-cover" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{c.name}</p>
              <p className="text-xs text-muted-foreground">{courses.filter((x) => x.categoryId === c.id).length} courses</p>
            </div>
            <ConfirmDialog title="Delete category?" description="Courses in this category will need a new category." confirmLabel="Delete" onConfirm={() => { setList(list.filter((x) => x.id !== c.id)); toast.success("Category deleted"); }} trigger={<Button variant="ghost" size="icon" aria-label="Delete"><Trash2 /></Button>} />
          </div>
        ))}
      </div>
    </div>
  );
}
