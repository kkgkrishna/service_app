import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all engineers with categories
export async function GET() {
  try {
    const engineers = await prisma.engineer.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        engineerCategories: {
          include: {
            category: true,
          },
        },
      },
    });

    // Flatten category names for easier frontend usage
    const formatted = engineers.map((eng) => ({
      ...eng,
      categories: eng.engineerCategories.map((ec) => ec.category),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET /engineers failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const newEngineer = await prisma.engineer.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        city: body.city,
        status: body.status ?? true,
        engineerCategories: {
          create:
            body.categoryIds?.map((id: string) => ({
              category: { connect: { id } },
            })) || [],
        },
      },
      include: {
        engineerCategories: {
          include: {
            category: true,
          },
        },
      },
    });

    return NextResponse.json(newEngineer, { status: 201 });
  } catch (error: any) {
    console.error("POST /engineers failed:", error?.message || error);
    return NextResponse.json(
      { error: "Failed to create engineer" },
      { status: 500 }
    );
  }
}
