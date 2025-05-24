import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const specialty = searchParams.get("specialty");

    const where = {
      ...(status && { status }),
      ...(specialty && { specialty: { has: specialty } }),
    };

    const engineers = await prisma.engineer.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(engineers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch engineers" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const engineer = await prisma.engineer.create({
      data,
    });
    return NextResponse.json(engineer);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create engineer" },
      { status: 500 }
    );
  }
}
