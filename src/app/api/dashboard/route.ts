import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET() {
  try {
    const today = dayjs().startOf("day").toDate();
    const tomorrow = dayjs().add(1, "day").startOf("day").toDate();
    const startOfMonth = dayjs().startOf("month").toDate();
    const endOfMonth = dayjs().endOf("month").toDate();

    // Total inquiries
    const totalInquiries = await prisma.inquiry.count();

    // Total engineers
    const totalEngineers = await prisma.engineer.count();

    // Total open inquiries (PENDING only)
    const totalOpenInquiries = await prisma.inquiry.count({
      where: { status: "PENDING" },
    });

    // === Today's Inquiries ===
    const todayInquiries = await prisma.inquiry.findMany({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    const todaySummary = summarizeInquiries(todayInquiries);

    // === Current Month's Inquiries ===
    const monthInquiries = await prisma.inquiry.findMany({
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    const monthSummary = summarizeInquiries(monthInquiries);

    // === Top Inquiries Today ===
    const todayTopInquiries = await prisma.inquiry.findMany({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        engineer: true,
      },
    });

    return NextResponse.json({
      totalInquiries,
      totalEngineers,
      totalOpenInquiries,
      todaySummary,
      monthSummary,
      todayTopInquiries,
    });
  } catch (error) {
    console.error("/api/dashboard/summary error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function summarizeInquiries(inquiries: any) {
  let open = 0,
    closed = 0,
    cancelled = 0,
    collection = 0,
    submitted = 0;

  for (const inquiry of inquiries) {
    if (inquiry.status === "PENDING") open++;
    else if (inquiry.status === "RESOLVED" || inquiry.status === "CLOSED")
      closed++;
    else if (inquiry.cancelInquire) cancelled++;

    collection += Number(inquiry.amount || 0);
    submitted += Number(inquiry.amount || 0); // Adjust logic if different field needed
  }

  return {
    open,
    closed,
    cancelled,
    collection,
    submitted,
  };
}
