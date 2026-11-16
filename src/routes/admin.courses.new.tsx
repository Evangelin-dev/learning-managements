import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/common";
import { CourseForm } from "@/components/dashboard/CourseForm";

export const Route = createFileRoute("/admin/courses/new")({
  head: () => ({ meta: [{ title: "Add Course — Admin" }, { name: "description", content: "Create a new course." }] }),
  component: () => (
    <div>
      <PageHeader title="Add new course" description="Fill in the details below. You can save as a draft and publish later." />
      <CourseForm />
    </div>
  ),
});
