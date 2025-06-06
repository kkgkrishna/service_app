import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const inquiries = await prisma.inquiry.findMany({
      where: { userId: params.userId },
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        engineer: true,
        inquiryCategories: {
          include: { category: true },
        },
        inquirySubCategories: {
          include: { subCategory: true },
        },
      },
    });

    return NextResponse.json({ inquiries });
  } catch (error: any) {
    console.error(
      "GET /api/inquiries/user/[userId] error:",
      error?.message || error
    );
    return NextResponse.json(
      { error: error?.message || "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}
