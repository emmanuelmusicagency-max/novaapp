import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding NovaBank database…");

  const passwordHash = await bcrypt.hash("Password123!", 10);

  // ---------------------------------------------------------------------
  // Admin user
  // ---------------------------------------------------------------------
  const admin = await prisma.user.upsert({
    where: { email: "admin@novabank.io" },
    update: {},
    create: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@novabank.io",
      passwordHash,
      role: "ADMIN",
      status: "ACTIVE",
      kycStatus: "VERIFIED",
      emailVerified: true,
      twoFactorEnabled: true,
    },
  });

  // ---------------------------------------------------------------------
  // Demo end users
  // ---------------------------------------------------------------------
  const demoUsersData = [
    { firstName: "Priya", lastName: "Sharma", email: "priya@example.com", kycStatus: "VERIFIED" as const },
    { firstName: "Marcus", lastName: "Cole", email: "marcus@example.com", kycStatus: "PENDING" as const },
    { firstName: "Elena", lastName: "Vasquez", email: "elena@example.com", kycStatus: "VERIFIED" as const },
    { firstName: "Daniel", lastName: "Okafor", email: "daniel@example.com", kycStatus: "REJECTED" as const },
    { firstName: "Hana", lastName: "Kobayashi", email: "hana@example.com", kycStatus: "UNVERIFIED" as const },
  ];

  const demoUsers = [];
  for (const data of demoUsersData) {
    const user = await prisma.user.upsert({
      where: { email: data.email },
      update: {},
      create: {
        ...data,
        passwordHash,
        role: "USER",
        status: "ACTIVE",
        emailVerified: true,
        twoFactorEnabled: data.kycStatus === "VERIFIED",
      },
    });
    demoUsers.push(user);
  }

  const [priya, marcus, elena] = demoUsers;

  // ---------------------------------------------------------------------
  // Wallets & holdings for the first demo user (Priya)
  // ---------------------------------------------------------------------
  const wallet = await prisma.wallet.create({
    data: {
      userId: priya.id,
      label: "Main Wallet",
      holdings: {
        create: [
          { symbol: "BTC", amount: 0.5241 },
          { symbol: "ETH", amount: 5.812 },
          { symbol: "SOL", amount: 42.15 },
          { symbol: "USDC", amount: 3200 },
        ],
      },
    },
  });

  // ---------------------------------------------------------------------
  // Transactions
  // ---------------------------------------------------------------------
  await prisma.transaction.createMany({
    data: [
      { userId: priya.id, type: "BUY", status: "COMPLETED", asset: "BTC", amount: 0.042, usdValue: 4054.7, fee: 20.27 },
      { userId: priya.id, type: "STAKE", status: "COMPLETED", asset: "ETH", amount: 1.2, usdValue: 6385.0, fee: 0 },
      { userId: priya.id, type: "SWAP", status: "COMPLETED", asset: "SOL", amount: 12.5, usdValue: 3102.4, fee: 4.65 },
      { userId: marcus.id, type: "WITHDRAW", status: "PENDING", asset: "BTC", amount: 0.01, usdValue: 965.4, fee: 1.5 },
      { userId: elena.id, type: "DEPOSIT", status: "COMPLETED", asset: "USDC", amount: 1000, usdValue: 1000, fee: 0 },
    ],
  });

  // ---------------------------------------------------------------------
  // Staking positions
  // ---------------------------------------------------------------------
  await prisma.stakingPosition.createMany({
    data: [
      { userId: priya.id, asset: "ETH", amount: 1.2, apy: 4.2, lockPeriodDays: 0, rewardsEarned: 0.021 },
      { userId: priya.id, asset: "SOL", amount: 15, apy: 7.1, lockPeriodDays: 3, rewardsEarned: 0.42 },
      { userId: marcus.id, asset: "DOT", amount: 120, apy: 12.4, lockPeriodDays: 28, rewardsEarned: 3.1 },
    ],
  });

  // ---------------------------------------------------------------------
  // DCA plans
  // ---------------------------------------------------------------------
  await prisma.dcaPlan.createMany({
    data: [
      { userId: priya.id, asset: "BTC", amountUsd: 100, frequency: "WEEKLY", nextRunDate: new Date(Date.now() + 4 * 86400000) },
      { userId: priya.id, asset: "ETH", amountUsd: 250, frequency: "MONTHLY", nextRunDate: new Date(Date.now() + 14 * 86400000) },
    ],
  });

  // ---------------------------------------------------------------------
  // Price alerts
  // ---------------------------------------------------------------------
  await prisma.priceAlert.createMany({
    data: [
      { userId: priya.id, asset: "BTC", targetPrice: 100000, condition: "ABOVE" },
      { userId: priya.id, asset: "ETH", targetPrice: 4800, condition: "BELOW" },
    ],
  });

  // ---------------------------------------------------------------------
  // Notifications
  // ---------------------------------------------------------------------
  await prisma.notification.createMany({
    data: [
      { userId: priya.id, type: "TRANSACTION", title: "Buy order completed", description: "Your purchase of 0.042 BTC has completed.", read: false },
      { userId: priya.id, type: "SECURITY", title: "New device login", description: "A new device signed in to your account.", read: false },
      { userId: priya.id, type: "PRICE_ALERT", title: "BTC price alert", description: "Bitcoin is approaching your target price.", read: true },
    ],
  });

  // ---------------------------------------------------------------------
  // Support tickets
  // ---------------------------------------------------------------------
  await prisma.supportTicket.createMany({
    data: [
      { userId: marcus.id, subject: "Withdrawal stuck in pending", message: "My BTC withdrawal has been pending for 2 days.", status: "OPEN", priority: "HIGH" },
      { userId: elena.id, subject: "Question about staking lock period", message: "Can I unstake early if needed?", status: "RESOLVED", priority: "LOW" },
    ],
  });

  console.log("Seed complete.");
  console.log(`Admin login: admin@novabank.io / Password123!`);
  console.log(`Demo user login: priya@example.com / Password123!`);
  console.log(`Wallet ${wallet.id} created for ${priya.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
