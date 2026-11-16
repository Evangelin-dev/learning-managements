import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/site/Logo";
import { images } from "@/lib/data";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Vilaiyosai" },
      { name: "description", content: "Sign in or create an account to access your courses." },
      { property: "og:title", content: "Login — Vilaiyosai" },
      { property: "og:description", content: "Sign in to access your courses." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const go = (to: "/dashboard" | "/admin") => {
    toast.success(to === "/admin" ? "Signed in as admin (demo)" : "Welcome back, Ananya! (demo)");
    navigate({ to });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <Logo />
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10">
          <h1 className="text-3xl font-bold">{tab === "login" ? "Welcome back" : "Create your account"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Demo mode — any details will work.</p>
          <Tabs value={tab} onValueChange={setTab} className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={(e) => { e.preventDefault(); go("/dashboard"); }} className="mt-4 space-y-4">
                <div><Label className="mb-1.5 block">Email</Label><Input type="email" defaultValue="ananya.k@gmail.com" required /></div>
                <div><Label className="mb-1.5 block">Password</Label><Input type="password" defaultValue="password" required /></div>
                <Button type="submit" className="w-full" size="lg">Login</Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={(e) => { e.preventDefault(); go("/dashboard"); }} className="mt-4 space-y-4">
                <div><Label className="mb-1.5 block">Full name</Label><Input required /></div>
                <div><Label className="mb-1.5 block">Email</Label><Input type="email" required /></div>
                <div><Label className="mb-1.5 block">Password</Label><Input type="password" minLength={6} required /></div>
                <Button type="submit" className="w-full" size="lg">Create account</Button>
              </form>
            </TabsContent>
          </Tabs>
          <div className="mt-8 grid gap-2 border-t border-border pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Quick demo access</p>
            <Button variant="outline" onClick={() => go("/dashboard")}><GraduationCap />Continue as student</Button>
            <Button variant="outline" onClick={() => go("/admin")}><ShieldCheck />Continue as admin</Button>
          </div>
          <Link to="/" className="mt-6 text-center text-sm text-primary hover:underline">← Back to website</Link>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img src={images.heroLearner} alt="" width={1024} height={1152} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-ink-foreground">
          <p className="font-script text-3xl text-teal">Start today</p>
          <p className="mt-2 font-display text-3xl font-semibold leading-tight">Learn new skills with expert-led video courses.</p>
        </div>
      </div>
    </div>
  );
}
