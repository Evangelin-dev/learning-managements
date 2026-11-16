import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageHero";

export const Route = createFileRoute("/_site/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions — Vilaiyosai" },
      { name: "description", content: "The terms that apply when you use Vilaiyosai and purchase courses." },
      { property: "og:title", content: "Terms and Conditions — Vilaiyosai" },
      { property: "og:description", content: "Terms for using Vilaiyosai." },
    ],
  }),
  component: () => (
    <>
      <PageHero title="Terms and Conditions" />
      <Prose
        sections={[
          { h: "Your account", p: "You are responsible for keeping your login details safe. Course access is for personal use and may not be shared." },
          { h: "Course content", p: "All videos and materials are owned by Vilaiyosai or its instructors. Downloading, recording or redistributing content is not allowed unless downloads are enabled for that lesson." },
          { h: "Payments", p: "Prices are shown in Indian Rupees and include applicable taxes. Access is granted once your payment is confirmed." },
        ]}
      />
    </>
  ),
});
