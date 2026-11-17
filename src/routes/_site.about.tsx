
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { images } from "@/lib/data";

export const Route = createFileRoute("/_site/about")({
  head: () => ({
    meta: [
      { title: "About Us — Vilaiyosai" },
      {
        name: "description",
        content:
          "Vilaiyosai makes expert-led, pre-recorded courses affordable and accessible to every learner.",
      },
      { property: "og:title", content: "About Us — Vilaiyosai" },
      {
        property: "og:description",
        content: "Our mission is to make quality learning accessible to everyone.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Learning that fits your life"
        subtitle="Vilaiyosai was started in Chennai in 2023 with a simple idea: great teaching shouldn't depend on where you live or when you're free."
      />

      <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-2">
        <img
          src={images.courseStudy}
          alt="Learner watching a recorded lesson"
          loading="lazy"
          width={1024}
          height={640}
          className="rounded-2xl object-cover shadow-card"
        />

        <div>
          <h2 className="text-2xl font-semibold">
            Pay once. Learn forever.
          </h2>

          <p className="mt-3 leading-relaxed text-muted-foreground">
            We work with experienced practitioners to record clear, practical
            courses. You buy a course once, and it's yours — watch on your phone
            during your commute or on your laptop at midnight.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { i: Users, n: "10,000+", l: "Learners" },
              { i: Target, n: "AI", l: "Specialized Learning" },
              { i: Heart, n: "4.8★", l: "Avg. rating" },
            ].map(({ i: Icon, n, l }) => (
              <div
                key={l}
                className="rounded-xl border border-border bg-card p-4 shadow-soft"
              >
                <Icon className="h-5 w-5 text-primary" />
                <div className="mt-2 font-display text-xl font-semibold">
                  {n}
                </div>
                <div className="text-xs text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>

          <Button asChild className="mt-6">
            <Link to="/courses">Explore courses</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
