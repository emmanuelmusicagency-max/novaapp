"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ALL_TRANSACTIONS } from "@/lib/transactions-data";
import { ADMIN_USERS } from "@/lib/admin-data";
import type { Transaction } from "@/types";
import { formatCrypto, formatCurrency, formatDateTime } from "@/lib/utils";

const STATUS_VARIANT: Record<Transaction["status"], "success" | "warning" | "destructive" | "outline"> = {
  COMPLETED: "success",
  PENDING: "warning",
  FAILED: "destructive",
  CANCELLED: "outline",
};

interface AdminTransactionsTableProps {
  filterTypes?: Transaction["type"][];
  allowApproval?: boolean;
}

/**
 * Admin-facing transaction table. Optionally filtered to specific types
 * (e.g. only DEPOSIT/WITHDRAW) and optionally allows approve/reject actions
 * on pending items, used by the deposits and withdrawals pages.
 */
export function AdminTransactionsTable({
  filterTypes,
  allowApproval = false,
}: AdminTransactionsTableProps) {
  const [transactions, setTransactions] = useState(
    filterTypes ? ALL_TRANSACTIONS.filter((tx) => filterTypes.includes(tx.type)) : ALL_TRANSACTIONS
  );

  function resolveTransaction(id: string, status: "COMPLETED" | "FAILED") {
    setTransactions((prev) => prev.map((tx) => (tx.id === id ? { ...tx, status } : tx)));
    toast.success(status === "COMPLETED" ? "Transaction approved" : "Transaction rejected");
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="scroll-thin overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Asset</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
                {allowApproval && <th className="px-6 py-3 font-medium" />}
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => {
                const user = ADMIN_USERS[i % ADMIN_USERS.length];
                return (
                  <tr key={tx.id} className="border-b border-border last:border-0">
                    <td className="px-6 py-4">
                      <p className="font-medium">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </td>
                    <td className="px-6 py-4 capitalize">{tx.type.toLowerCase()}</td>
                    <td className="px-6 py-4">{tx.asset}</td>
                    <td className="px-6 py-4 font-medium">
                      {formatCrypto(tx.amount)} · {formatCurrency(tx.usdValue)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={STATUS_VARIANT[tx.status]}>{tx.status.toLowerCase()}</Badge>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{formatDateTime(tx.createdAt)}</td>
                    {allowApproval && (
                      <td className="px-6 py-4">
                        {tx.status === "PENDING" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1 text-destructive hover:bg-destructive/10"
                              onClick={() => resolveTransaction(tx.id, "FAILED")}
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="success"
                              className="gap-1"
                              onClick={() => resolveTransaction(tx.id, "COMPLETED")}
                            >
                              <Check className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
