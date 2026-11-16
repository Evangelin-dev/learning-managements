import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader, StatusBadge } from "@/components/dashboard/common";
import { CourseForm } from "@/components/dashboard/CourseForm";
import { getCourse } from "@/lib/data";

export const Route = createFileRoute("/admin/courses/$courseId")({
  loader: ({ params }) => {
    const course = getCourse(params.courseId);
    if (!course) throw notFound();
    return { course };
  },
  head: () => ({ meta: [{ title: "Edit Course — Admin" }, { name: "description", content: "Edit course details." }] }),
  notFoundComponent: () => <div className="py-20 text-center"><p className="font-semibold">Course not found</p><Button asChild className="mt-4"><Link to="/admin/courses">Back to courses</Link></Button></div>,
  component: EditCourse,
});

function EditCourse() {
  const { course } = Route.useLoaderData();
  return (
    <div>
      <PageHeader
        title="Edit course"
        description={course.title}
        actions={<><StatusBadge status={course.status} /><Button asChild variant="outline" size="sm"><Link to="/courses/$courseId" params={{ courseId: course.id }}>View on site</Link></Button></>}
      />
      <CourseForm key={course.id} course={course} />
    </div>
  );
}
