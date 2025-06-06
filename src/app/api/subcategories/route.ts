import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all subcategories
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    const subcategories = await prisma.subCategory.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: { category: true },
    });

    return NextResponse.json({ subcategories }, { status: 200 });
  } catch (error) {
    console.error("GET /api/subcategories failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch subcategories" },
      { status: 500 }
    );
  }
}

// POST create subcategory
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subCategoryName, price, categoryId } = body;

    if (
      typeof subCategoryName !== "string" ||
      isNaN(parseFloat(price)) ||
      typeof categoryId !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    const subCategory = await prisma.subCategory.create({
      data: {
        subCategoryName,
        price: parseFloat(price),
        categoryId,
      },
    });

    return NextResponse.json({ subCategory }, { status: 201 }); // ✅ Wrapped in object
  } catch (error) {
    console.error("POST /api/subcategories failed:", error);
    return NextResponse.json(
      { error: "Failed to create subcategory" },
      { status: 500 }
    );
  }
}
