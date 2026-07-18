"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CRYPTO_ASSETS } from "@/lib/constants";

interface AssetSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  assets?: { symbol: string; name: string }[];
}

/** Dropdown for choosing a crypto asset, used across trade/send/alert forms. */
export function AssetSelect({
  value,
  onChange,
  placeholder = "Select asset",
  assets = CRYPTO_ASSETS,
}: AssetSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {assets.map((asset) => (
          <SelectItem key={asset.symbol} value={asset.symbol}>
            {asset.symbol} — {asset.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
