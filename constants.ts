export interface CryptoAsset {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  color: string;
}

/**
 * Static demo market snapshot. In production this is replaced by live
 * data from the market-data API route (see src/lib/market-data.ts).
 */
export const CRYPTO_ASSETS: CryptoAsset[] = [
  { symbol: "BTC", name: "Bitcoin", price: 96540.32, change24h: 2.14, marketCap: 1_910_000_000_000, color: "#F7931A" },
  { symbol: "ETH", name: "Ethereum", price: 5320.87, change24h: 3.42, marketCap: 640_000_000_000, color: "#627EEA" },
  { symbol: "SOL", name: "Solana", price: 248.19, change24h: -1.87, marketCap: 118_000_000_000, color: "#14F195" },
  { symbol: "BNB", name: "BNB", price: 712.54, change24h: 0.65, marketCap: 103_000_000_000, color: "#F3BA2F" },
  { symbol: "XRP", name: "XRP", price: 2.87, change24h: 4.91, marketCap: 165_000_000_000, color: "#23292F" },
  { symbol: "ADA", name: "Cardano", price: 1.12, change24h: -0.54, marketCap: 39_000_000_000, color: "#0033AD" },
  { symbol: "DOGE", name: "Dogecoin", price: 0.42, change24h: 6.23, marketCap: 61_000_000_000, color: "#C2A633" },
  { symbol: "DOT", name: "Polkadot", price: 9.83, change24h: -2.11, marketCap: 14_500_000_000, color: "#E6007A" },
  { symbol: "AVAX", name: "Avalanche", price: 58.21, change24h: 1.34, marketCap: 23_800_000_000, color: "#E84142" },
  { symbol: "LINK", name: "Chainlink", price: 27.65, change24h: 2.98, marketCap: 17_600_000_000, color: "#2A5ADA" },
];

export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    period: "forever",
    description: "For individuals getting started with crypto investing.",
    features: [
      "Buy, sell & hold 10+ cryptocurrencies",
      "Standard trading fees (0.5%)",
      "Basic portfolio analytics",
      "Email support",
    ],
    cta: "Start for free",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    period: "month",
    description: "For active traders who want lower fees and deeper tools.",
    features: [
      "Everything in Starter",
      "Reduced trading fees (0.15%)",
      "Advanced charting & analytics",
      "Auto-invest & DCA strategies",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    id: "institutional",
    name: "Institutional",
    price: 99,
    period: "month",
    description: "For funds and high-volume desks needing dedicated infra.",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom API rate limits",
      "OTC desk access",
      "24/7 phone support",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

export const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Product Manager, Fintech",
    quote:
      "NovaBank's staking dashboard makes it trivial to see exactly what I'm earning across every asset, in one place.",
    avatarSeed: "priya",
  },
  {
    name: "Marcus Cole",
    role: "Independent Trader",
    quote:
      "The DCA scheduler took the emotion out of my investing. I set it up once and haven't touched it in months.",
    avatarSeed: "marcus",
  },
  {
    name: "Elena Vasquez",
    role: "CFO, Series B Startup",
    quote:
      "We moved our treasury reporting workflow onto NovaBank's analytics suite and cut our monthly close time in half.",
    avatarSeed: "elena",
  },
];

export const FAQS = [
  {
    question: "Is my money safe with NovaBank?",
    answer:
      "NovaBank uses multi-layer security including cold storage for the majority of assets, mandatory two-factor authentication, and continuous transaction monitoring to help keep your funds and data protected.",
  },
  {
    question: "What cryptocurrencies can I trade?",
    answer:
      "You can buy, sell, and swap major assets including Bitcoin, Ethereum, Solana, and dozens of other tokens, with more added regularly based on demand and liquidity.",
  },
  {
    question: "How do fees work?",
    answer:
      "Starter accounts pay a flat 0.5% trading fee. Pro and Institutional plans unlock significantly reduced fees as outlined on the pricing page, with no hidden charges.",
  },
  {
    question: "Can I stake my crypto for rewards?",
    answer:
      "Yes. Supported proof-of-stake assets can be staked directly from your wallet, with rewards accruing automatically and visible in your investment analytics.",
  },
  {
    question: "How long do withdrawals take?",
    answer:
      "Most crypto withdrawals are processed within minutes, subject to network confirmation times. Fiat withdrawals to a linked bank account typically settle in 1-3 business days.",
  },
];
