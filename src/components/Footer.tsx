import { Linkedin, Mail, MessageCircleMore, Twitter } from "lucide-react";
import { SOCIALS } from "@/lib/socials";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="container-tight flex flex-col items-start gap-8 py-14 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-brand-foreground font-display text-lg">
            I
          </span>
          <div>
            <div className="font-display text-lg tracking-tight">Ibrahim Abdulrahman Sardauna</div>
            <p className="mt-1 text-sm text-foreground/55">
              © {new Date().getFullYear()} · Designed & built with care.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {[
            { href: SOCIALS.linkedin, Icon: Linkedin, label: "LinkedIn" },
            { href: `mailto:${SOCIALS.email}`, Icon: Mail, label: "Email" },
            { href: SOCIALS.whatsapp, Icon: MessageCircleMore, label: "WhatsApp" },
            { href: SOCIALS.twitter, Icon: Twitter, label: "Twitter" },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-foreground/60 transition-all duration-300 hover:text-brand hover:border-brand/50 hover:-translate-y-0.5"
            >
              <Icon className="h-[16px] w-[16px]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
