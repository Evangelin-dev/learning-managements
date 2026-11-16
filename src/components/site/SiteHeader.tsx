
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Logo } from "./Logo";

const nav = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "#services", label: "Services", isAnchor: true },
  { to: "/about", label: "About Us" },
  { to: "/instructors", label: "Instructors" },
  { to: "/contact", label: "Contact" },
] as const;

const navLinkClass =
  "relative py-2 font-sans text-base font-medium text-[#001C3C] transition-colors duration-200 hover:text-[#0056B3] hover:after:absolute hover:after:inset-x-0 hover:after:-bottom-0.5 hover:after:h-0.5 hover:after:rounded-full hover:after:bg-[#2EC4CC]";

const activeNavClass =
  "data-[status=active]:text-[#001C3C] data-[status=active]:after:absolute data-[status=active]:after:inset-x-0 data-[status=active]:after:-bottom-0.5 data-[status=active]:after:h-0.5 data-[status=active]:after:rounded-full data-[status=active]:after:bg-[#2EC4CC]";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5EDF3] bg-white shadow-[0_2px_12px_rgba(0,28,60,0.06)]">
      <div className="container-page flex h-[76px] items-center justify-between gap-4">

        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) =>
            item.isAnchor ? (
              <a
                key={item.to}
                href={item.to}
                className={`${navLinkClass} hover:after:content-['']`}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className={`${navLinkClass} ${activeNavClass}`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            asChild
            variant="ghost"
            className="font-sans text-base font-semibold text-[#001C3C] transition-colors hover:bg-[#D6F5F6] hover:text-[#0056B3]"
          >
            <Link to="/dashboard">My Learning</Link>
          </Button>

          <Button
            asChild
            className="rounded-full bg-[#0056B3] px-6 font-sans text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#004494] hover:shadow-md active:bg-[#003A7D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0056B3]"
          >
            <Link to="/login">Login</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              aria-label="Open menu"
              className="h-10 w-10 border-[#D6F5F6] text-[#001C3C] transition-colors hover:border-[#0056B3] hover:bg-[#D6F5F6] hover:text-[#0056B3]"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-80 border-l border-[#E5EDF3] bg-white">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            <div className="mt-8 flex flex-col gap-2">
              <div className="mb-5 border-b border-[#E5EDF3] pb-5">
                <Logo />
              </div>

              {nav.map((item) =>
                item.isAnchor ? (
                  <a
                    key={item.to}
                    href={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg border-l-2 border-transparent px-3 py-3 font-sans text-base font-medium text-[#001C3C] transition-colors hover:border-[#2EC4CC] hover:bg-[#D6F5F6] hover:text-[#0056B3]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: item.to === "/" }}
                    className="rounded-lg border-l-2 border-transparent px-3 py-3 font-sans text-base font-medium text-[#001C3C] transition-colors hover:border-[#2EC4CC] hover:bg-[#D6F5F6] hover:text-[#0056B3] data-[status=active]:border-[#2EC4CC] data-[status=active]:bg-[#D6F5F6] data-[status=active]:font-semibold data-[status=active]:text-[#001C3C]"
                  >
                    {item.label}
                  </Link>
                )
              )}

              <div className="mt-5 grid gap-3 border-t border-[#E5EDF3] pt-5">
                <Button
                  asChild
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="h-11 rounded-full border-2 border-[#0056B3] font-sans text-base font-semibold text-[#0056B3] transition-colors hover:bg-[#0056B3] hover:text-white active:bg-[#004494]"
                >
                  <Link to="/dashboard">My Learning</Link>
                </Button>

                <Button
                  asChild
                  onClick={() => setOpen(false)}
                  className="h-11 rounded-full bg-[#0056B3] font-sans text-base font-semibold text-white transition-colors hover:bg-[#004494] active:bg-[#003A7D]"
                >
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
