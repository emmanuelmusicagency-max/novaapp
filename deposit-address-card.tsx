"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AssetSelect } from "@/components/wallet/asset-select";
import { AddressQrCode } from "@/components/wallet/address-qr-code";
import { WALLET_ADDRESSES } from "@/lib/wallet-data";
import { CRYPTO_ASSETS } from "@/lib/constants";
import { truncateAddress } from "@/lib/utils";

const DEPOSIT_ASSETS = CRYPTO_ASSETS.filter((a) => WALLET_ADDRESSES[a.symbol]);

interface DepositAddressCardProps {
  title: string;
}

/** Shows a receiving address + QR code for the selected asset. */
export function DepositAddressCard({ title }: DepositAddressCardProps) {
  const [asset, setAsset] = useState("BTC");
  const [copied, setCopied] = useState(false);
  const address = WALLET_ADDRESSES[asset] ?? "";

  async function handleCopy() {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <AssetSelect value={asset} onChange={setAsset} assets={DEPOSIT_ASSETS} />

        <div className="flex flex-col items-center gap-4 rounded-lg border border-border p-6">
          <AddressQrCode value={address} />
          <p className="break-all text-center font-mono text-sm">{address}</p>
          <p className="text-center text-xs text-muted-foreground">
            {truncateAddress(address, 6)}
          </p>
          <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
            {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy address"}
          </Button>
        </div>

        <div className="rounded-lg bg-amber-500/10 p-4 text-xs text-amber-600 dark:text-amber-400">
          Only send {asset} to this address. Sending any other asset may
          result in permanent loss of funds.
        </div>
      </CardContent>
    </Card>
  );
}
