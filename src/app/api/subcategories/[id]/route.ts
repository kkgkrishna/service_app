// app/api/subcategories/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH: Update a subcategory
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { subCategoryName, price, categoryId } = body;

    const updated = await prisma.subCategory.update({
      where: { id: params.id },
      data: {
        ...(subCategoryName && { subCategoryName }),
        ...(price && { price: parseFloat(price) }),
        ...(categoryId && { categoryId }),
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PATCH /subcategories/:id failed:", error);
    return NextResponse.json(
      { error: "Failed to update subcategory" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a subcategory
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.subCategory.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Subcategory deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /subcategories/:id failed:", error);
    return NextResponse.json(
      { error: "Failed to delete subcategory" },
      { status: 500 }
    );
  }
}
