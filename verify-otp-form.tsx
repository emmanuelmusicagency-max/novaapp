"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/auth/otp-input";

interface VerifyOtpFormProps {
  identifier: string;
  purpose: "login" | "email_verification" | "withdrawal";
  redirectTo: string;
}

/** Generic OTP verification flow with resend cooldown timer. */
export function VerifyOtpForm({ identifier, purpose, redirectTo }: VerifyOtpFormProps) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  async function handleVerify() {
    if (code.length !== 6) {
      toast.error("Enter the full 6-digit code");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, code, purpose }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message ?? "Invalid or expired code");
        return;
      }

      toast.success("Verified successfully!");
      router.push(redirectTo);
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    setIsResending(true);
    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, purpose }),
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message ?? "Unable to resend code");
        return;
      }
      toast.success("A new code has been sent");
      setCooldown(60);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <ShieldCheck className="h-7 w-7 text-primary" />
      </div>

      <OtpInput value={code} onChange={setCode} disabled={isSubmitting} />

      <Button
        onClick={handleVerify}
        variant="gradient"
        size="lg"
        className="w-full"
        disabled={isSubmitting || code.length !== 6}
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Verify code
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Didn&apos;t get a code?{" "}
        <button
          onClick={handleResend}
          disabled={isResending || cooldown > 0}
          className="font-medium text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
        </button>
      </p>
    </div>
  );
}
