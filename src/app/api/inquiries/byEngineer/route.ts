import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Helper to format date (e.g. "2025-06-06T18:30:00.000Z" -> "06/June/2025")
function formatDate(isoDate: Date | null | undefined): string {
  if (!isoDate) return "No Date";
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export async function GET(req: NextRequest) {
  try {
    const engineerId = req.nextUrl.searchParams.get("engineerId");

    if (!engineerId) {
      return NextResponse.json(
        { error: "engineerId is required" },
        { status: 400 }
      );
    }

    const inquiries = await prisma.inquiry.findMany({
      where: {
        engineerId,
      },
      include: {
        inquiryCategories: {
          include: { category: true },
        },
        inquirySubCategories: {
          include: { subCategory: true },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        appointmentTime: "desc",
      },
    });

    const groupedByDate: Record<string, any[]> = {};

    for (const inquiry of inquiries) {
      const dateKey = formatDate(inquiry.appointmentTime || inquiry.createdAt);
      if (!groupedByDate[dateKey]) groupedByDate[dateKey] = [];
      groupedByDate[dateKey].push(inquiry);
    }

    return NextResponse.json(groupedByDate);
  } catch (error) {
    console.error("Failed to fetch inquiries by engineer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
