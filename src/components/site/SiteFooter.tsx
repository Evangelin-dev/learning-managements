
import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
  ArrowRight,
} from "lucide-react";

import { BRAND } from "@/lib/data";
import { Logo } from "./Logo";

const quickLinks: [string, string][] = [
  ["/", "Home"],
  ["/courses", "Explore Courses"],
  ["/about", "About Us"],
  ["/instructors", "Our Instructors"],
];

const supportLinks: [string, string][] = [
  ["/contact", "Contact Us"],
  ["/faq", "FAQs"],
  ["/refund-policy", "Refund Policy"],
  ["/terms", "Terms & Conditions"],
  ["/privacy", "Privacy Policy"],
];

const socialLinks = [
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Youtube, label: "YouTube", href: "#" },
  { Icon: MessageCircle, label: "WhatsApp", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#001C3C] text-[#FDFEED]">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#2EC4CC]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[#0056B3]/20 blur-3xl" />

      {/* Main Footer */}
      <div className="container-page relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:gap-10 lg:py-20">

        {/* Brand Section */}
        <div>
          <div className="inline-flex rounded-xl bg-white p-2">
            <Logo />
          </div>

          <p className="mt-6 max-w-xs font-sans text-sm leading-7 text-[#FDFEED]/75">
            Learn new skills, build your future, and grow your career with
            practical online courses designed for your success.
          </p>

          {/* Social Links */}
          <div className="mt-7">
            <h4 className="mb-3 font-sans text-sm font-semibold text-[#FDFEED]">
              Follow Us
            </h4>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href === "#" ? undefined : "_blank"}
                  rel={href === "#" ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#FDFEED]/10 text-[#FDFEED] transition-all duration-200 hover:bg-[#2EC4CC] hover:text-[#001C3C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2EC4CC]"
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <FooterCol title="Quick Links" links={quickLinks} />

        {/* Support */}
        <FooterCol title="Support" links={supportLinks} />

        {/* Contact Information */}
        <div>
          <h3 className="font-display text-base font-semibold text-[#FDFEED]">
            Get In Touch
          </h3>

          <p className="mt-3 text-sm leading-6 text-[#FDFEED]/65">
            Have questions? We are here to help you.
          </p>

          <ul className="mt-6 space-y-5 font-sans text-sm">

            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#2EC4CC]/15">
                <Mail className="h-4 w-4 text-[#2EC4CC]" />
              </span>
              <div className="min-w-0">
                <p className="mb-1 text-xs font-medium text-[#FDFEED]/50">
                  Email Address
                </p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="break-all text-[#FDFEED]/85 transition-colors hover:text-[#2EC4CC] hover:underline"
                >
                  {BRAND.email}
                </a>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#2EC4CC]/15">
                <Phone className="h-4 w-4 text-[#2EC4CC]" />
              </span>
              <div className="min-w-0">
                <p className="mb-1 text-xs font-medium text-[#FDFEED]/50">
                  Phone Number
                </p>
                <a
                  href={`tel:${BRAND.phone}`}
                  className="text-[#FDFEED]/85 transition-colors hover:text-[#2EC4CC] hover:underline"
                >
                  {BRAND.phone}
                </a>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#2EC4CC]/15">
                <MapPin className="h-4 w-4 text-[#2EC4CC]" />
              </span>
              <div className="min-w-0">
                <p className="mb-1 text-xs font-medium text-[#FDFEED]/50">
                  Our Location
                </p>
                <p className="leading-6 text-[#FDFEED]/85">
                  {BRAND.address}
                </p>
              </div>
            </li>

          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative border-t border-[#FDFEED]/15">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">

          <p className="font-sans text-xs leading-6 text-[#FDFEED]/60">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#FDFEED] transition-colors hover:text-[#2EC4CC] hover:underline"
          >
            Start Learning
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h3 className="font-display text-base font-semibold text-[#FDFEED]">
        {title}
      </h3>

      <ul className="mt-6 space-y-4 font-sans text-sm">
        {links.map(([to, label]) => (
          <li key={to}>
            <Link
              to={to}
              className="group inline-flex items-center gap-2 text-[#FDFEED]/75 transition-colors duration-200 hover:text-[#2EC4CC] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2EC4CC]"
            >
              <span>{label}</span>
              <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
