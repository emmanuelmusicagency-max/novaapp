import { CRYPTO_ASSETS, type CryptoAsset } from "@/lib/constants";

const SYMBOL_TO_ID: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
  BNB: "binancecoin",
  XRP: "ripple",
  ADA: "cardano",
  DOGE: "dogecoin",
  DOT: "polkadot",
  AVAX: "avalanche-2",
  LINK: "chainlink",
};

/**
 * Fetches live prices from the configured market data API. Falls back to
 * the static demo snapshot in `constants.ts` if the request fails, so the
 * UI always has data to render.
 */
export async function getLivePrices(): Promise<CryptoAsset[]> {
  const baseUrl = process.env.MARKET_DATA_API_URL;
  if (!baseUrl) return CRYPTO_ASSETS;

  try {
    const ids = Object.values(SYMBOL_TO_ID).join(",");
    const res = await fetch(
      `${baseUrl}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`,
      { next: { revalidate: 30 } }
    );

    if (!res.ok) return CRYPTO_ASSETS;

    const data = (await res.json()) as Record<
      string,
      { usd: number; usd_24h_change: number; usd_market_cap: number }
    >;

    return CRYPTO_ASSETS.map((asset) => {
      const id = SYMBOL_TO_ID[asset.symbol];
      const live = id ? data[id] : undefined;
      if (!live) return asset;

      return {
        ...asset,
        price: live.usd,
        change24h: live.usd_24h_change,
        marketCap: live.usd_market_cap,
      };
    });
  } catch (error) {
    console.error("Failed to fetch live prices, using fallback snapshot:", error);
    return CRYPTO_ASSETS;
  }
}

export function findAssetBySymbol(symbol: string): CryptoAsset | undefined {
  return CRYPTO_ASSETS.find((a) => a.symbol === symbol);
}
