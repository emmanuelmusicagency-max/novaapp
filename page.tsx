import type { Metadata } from "next";
import { VerifyOtpForm } from "@/components/auth/verify-otp-form";

export const metadata: Metadata = { title: "Verify Code" };

export default async function VerifyOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ identifier?: string }>;
}) {
  const { identifier = "" } = await searchParams;

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">Enter verification code</h1>
        <p className="text-muted-foreground">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-foreground">{identifier || "your device"}</span>.
        </p>
      </div>
      <VerifyOtpForm identifier={identifier} purpose="login" redirectTo="/dashboard" />
    </div>
  );
}
