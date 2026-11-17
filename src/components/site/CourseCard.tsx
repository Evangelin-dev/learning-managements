import { Link } from "@tanstack/react-router";
import { Clock, PlayCircle, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Course, formatPrice, getCategory, getInstructor, lessonCount } from "@/lib/data";

export function CourseCard({ course }: { course: Course }) {
  const instructor = getInstructor(course.instructorId);
  const category = getCategory(course.categoryId);
  return (
    <Link
        to="/courses/ai-agentic"
      params={{ courseId: course.id }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={course.image} alt={course.title} loading="lazy" width={1024} height={640} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {course.isFree && <Badge variant="teal" className="absolute left-3 top-3">Free</Badge>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary">{category?.name}</Badge>
          <span className="flex items-center gap-1 text-xs font-semibold text-foreground">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {course.rating}
          </span>
        </div>
        <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug">{course.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{course.subtitle}</p>
        <p className="mt-3 text-xs font-medium text-foreground/70">by {instructor?.name}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.durationHours} hrs</span>
          <span className="flex items-center gap-1"><PlayCircle className="h-3.5 w-3.5" />{lessonCount(course)} lessons</span>
        </div>
        <div className="mt-auto flex items-baseline gap-2 pt-4">
          <span className="text-lg font-bold text-primary">{formatPrice(course.isFree ? 0 : course.discountPrice ?? course.price)}</span>
          {!course.isFree && course.discountPrice && (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(course.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
