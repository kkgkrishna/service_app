import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/engineers/:id
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

// PATCH /api/engineers/:id
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, email, phone, city, status, categories } = body;

    const updated = await prisma.engineer.update({
      where: { id: params.id },
      data: {
        name,
        email,
        phone,
        city,
        status,
      },
    });

    // Update category relationships
    if (Array.isArray(categories)) {
      await prisma.engineerCategory.deleteMany({
        where: { engineerId: params.id },
      });

      if (categories.length > 0) {
        const links = categories.map((categoryId: string) => ({
          engineerId: params.id,
          categoryId,
        }));
        await prisma.engineerCategory.createMany({
          data: links,
        });
      }
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

// DELETE /api/engineers/:id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Cleanup related categories first
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
