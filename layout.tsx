import Link from "next/link";
import { ShieldCheck, TrendingUp, Wallet } from "lucide-react";

/**
 * Shared layout for all authentication routes (login, register, OTP, etc).
 * Presents a branding/marketing panel on large screens and centers the
 * form content on small screens.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <Link href="/" className="mb-10 text-2xl font-bold gradient-text">
          NovaBank
        </Link>
        {children}
      </div>

      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-indigo-700 to-slate-950 lg:flex lg:flex-col lg:justify-center lg:px-16">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="relative z-10 space-y-10 text-white">
          <h2 className="text-4xl font-bold leading-tight">
            Bank on the future of digital assets.
          </h2>
          <p className="max-w-md text-white/70">
            NovaBank gives you institutional-grade tools to buy, sell,
            stake, and grow your crypto portfolio — all in one secure
            platform.
          </p>
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Bank-grade security</p>
                <p className="text-sm text-white/60">
                  2FA, cold storage, and continuous monitoring.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Real-time analytics</p>
                <p className="text-sm text-white/60">
                  Track performance across your entire portfolio.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Unified wallet</p>
                <p className="text-sm text-white/60">
                  Buy, sell, swap, and stake from a single balance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
