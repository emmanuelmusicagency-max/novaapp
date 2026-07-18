"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/auth/otp-input";
import {
  twoFactorSetupSchema,
  type TwoFactorSetupInput,
} from "@/lib/validations/auth";

/** Prompts the user for their authenticator app code after password login. */
export function TwoFactorForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, setValue, watch } = useForm<TwoFactorSetupInput>({
    resolver: zodResolver(twoFactorSetupSchema),
    defaultValues: { code: "" },
  });

  const code = watch("code");

  async function onSubmit(values: TwoFactorSetupInput) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/two-factor/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, code: values.code }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message ?? "Invalid authentication code");
        return;
      }

      toast.success("Signed in successfully");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <Smartphone className="h-7 w-7 text-primary" />
      </div>

      <OtpInput value={code} onChange={(v) => setValue("code", v)} disabled={isSubmitting} />

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="w-full"
        disabled={isSubmitting || code.length !== 6}
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Verify and sign in
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Open your authenticator app (Google Authenticator, Authy, etc.) to
        find your current code.
      </p>
    </form>
  );
}
