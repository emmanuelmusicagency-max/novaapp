"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ADMIN_USERS } from "@/lib/admin-data";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { toast } from "sonner";

const KYC_VARIANT: Record<string, "success" | "warning" | "destructive" | "outline"> = {
  VERIFIED: "success",
  PENDING: "warning",
  REJECTED: "destructive",
  UNVERIFIED: "outline",
};

/** Searchable table of all platform users with per-row admin actions. */
export function AdminUsersTable() {
  const [search, setSearch] = useState("");

  const filtered = ADMIN_USERS.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card>
      <CardContent className="p-6">
        <Input
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 max-w-xs"
        />

        <div className="scroll-thin overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="py-3 pr-4 font-medium">User</th>
                <th className="py-3 pr-4 font-medium">KYC status</th>
                <th className="py-3 pr-4 font-medium">Balance</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 pr-4 font-medium">Joined</th>
                <th className="py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-0">
                  <td className="py-3 pr-4">
                    <p className="font-medium">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant={KYC_VARIANT[user.kycStatus]}>{user.kycStatus.toLowerCase()}</Badge>
                  </td>
                  <td className="py-3 pr-4 font-medium">{formatCurrency(user.totalBalanceUsd)}</td>
                  <td className="py-3 pr-4">
                    <Badge variant={user.status === "ACTIVE" ? "success" : "destructive"}>
                      {user.status.toLowerCase()}
                    </Badge>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{formatDateTime(user.createdAt)}</td>
                  <td className="py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded p-1 hover:bg-accent" aria-label="Row actions">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast.success(`Viewing ${user.email}`)}>
                          View profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success(`Password reset sent to ${user.email}`)}>
                          Reset password
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => toast.success(`${user.status === "ACTIVE" ? "Suspended" : "Reactivated"} ${user.email}`)}
                        >
                          {user.status === "ACTIVE" ? "Suspend user" : "Reactivate user"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
