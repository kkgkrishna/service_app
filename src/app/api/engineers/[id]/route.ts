import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/engineers/:id - Fetch one engineer with categories
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const engineer = await prisma.engineer.findUnique({
      where: { id: params.id },
      include: {
        engineerCategories: {
          include: { category: true },
        },
      },
    });

    if (!engineer)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    const formatted = {
      ...engineer,
      categories: engineer.engineerCategories.map((ec) => ec.category),
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET /engineers/:id failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch engineer" },
      { status: 500 }
    );
  }
}

// PATCH /api/engineers/:id - Update engineer and category links
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, email, address, phone, city, status, categoryIds = [] } = body;

    const updated = await prisma.engineer.update({
      where: { id: params.id },
      data: { name, email, address, phone, city, status },
    });

    // Reset category relations
    await prisma.engineerCategory.deleteMany({
      where: { engineerId: params.id },
    });

    if (categoryIds.length > 0) {
      const links = categoryIds.map((categoryId: string) => ({
        engineerId: params.id,
        categoryId,
      }));
      await prisma.engineerCategory.createMany({ data: links });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /engineers/:id failed:", error);
    return NextResponse.json(
      { error: "Failed to update engineer" },
      { status: 500 }
    );
  }
}

// DELETE /api/engineers/:id - Remove engineer and category links
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.engineerCategory.deleteMany({
      where: { engineerId: params.id },
    });

    await prisma.engineer.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Engineer deleted successfully" });
  } catch (error) {
    console.error("DELETE /engineers/:id failed:", error);
    return NextResponse.json(
      { error: "Failed to delete engineer" },
      { status: 500 }
    );
  }
}
