import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageHero";

export const Route = createFileRoute("/_site/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Vilaiyosai" },
      { name: "description", content: "How Vilaiyosai collects, uses and protects your personal information." },
      { property: "og:title", content: "Privacy Policy — Vilaiyosai" },
      { property: "og:description", content: "How we handle your personal information." },
    ],
  }),
  component: () => (
    <>
      <PageHero title="Privacy Policy" />
      <Prose
        sections={[
          { h: "Information we collect", p: "We collect your name, email, phone number and payment confirmation details when you create an account or buy a course, along with basic viewing activity so we can save your progress." },
          { h: "How we use it", p: "Your information is used to give you access to your courses, process payments, send receipts and improve our lessons. We never sell your data." },
          { h: "Your choices", p: "You can update your profile at any time or ask us to delete your account by contacting support." },
        ]}
      />
    </>
  ),
});
