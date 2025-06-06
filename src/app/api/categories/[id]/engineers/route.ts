import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all engineers by categoryId
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: categoryId } = params;

    const engineerCategories = await prisma.engineerCategory.findMany({
      where: { categoryId },
      include: {
        engineer: true,
      },
    });

    const engineers = engineerCategories.map((ec) => ec.engineer);

    return NextResponse.json(engineers);
  } catch (error) {
    console.error("GET /categories/:id/engineers failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch engineers for category" },
      { status: 500 }
    );
  }
}
