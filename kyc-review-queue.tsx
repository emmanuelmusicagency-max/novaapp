"use client";

import { useState } from "react";
import { Check, FileText, X } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KYC_QUEUE } from "@/lib/admin-data";
import { formatDateTime } from "@/lib/utils";

/** Queue of users awaiting KYC document review, with approve/reject actions. */
export function KycReviewQueue() {
  const [reviewed, setReviewed] = useState<Record<string, "APPROVED" | "REJECTED">>({});

  function handleDecision(userId: string, decision: "APPROVED" | "REJECTED", email: string) {
    setReviewed((prev) => ({ ...prev, [userId]: decision }));
    toast.success(`KYC ${decision.toLowerCase()} for ${email}`);
  }

  return (
    <Card>
      <CardContent className="divide-y divide-border p-0">
        {KYC_QUEUE.map((user) => {
          const decision = reviewed[user.id];
          return (
            <div key={user.id} className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Submitted {formatDateTime(user.createdAt)}
                  </p>
                </div>
              </div>

              {decision ? (
                <Badge variant={decision === "APPROVED" ? "success" : "destructive"}>
                  {decision.toLowerCase()}
                </Badge>
              ) : (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 text-destructive hover:bg-destructive/10"
                    onClick={() => handleDecision(user.id, "REJECTED", user.email)}
                  >
                    <X className="h-3.5 w-3.5" /> Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="success"
                    className="gap-1.5"
                    onClick={() => handleDecision(user.id, "APPROVED", user.email)}
                  >
                    <Check className="h-3.5 w-3.5" /> Approve
                  </Button>
                </div>
              )}
            </div>
          );
        })}
        {KYC_QUEUE.length === 0 && (
          <p className="p-10 text-center text-sm text-muted-foreground">
            No pending KYC submissions.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
