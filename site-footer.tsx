import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Security", href: "/security" },
    { label: "API", href: "/api-docs" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Press", href: "/press" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Compliance", href: "/compliance" },
    { label: "Cookies", href: "/cookies" },
  ],
};

/** Site-wide footer with sitemap columns and social links. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-16">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="text-xl font-bold gradient-text">
              NovaBank
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Crypto investment banking, reimagined for everyone.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-foreground">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold">{heading}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} NovaBank. All rights reserved.</p>
          <p>Crypto assets are volatile and involve risk of loss.</p>
        </div>
      </div>
    </footer>
  );
}
