import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  role: z
    .enum(["USER", "ADMIN", "ENGINEER", "SUPER_ADMIN", "SERVICE_PROVIDER"])
    .optional(),
  isActive: z.boolean().optional(),
  permissions: z.array(z.string()).optional(), // must be valid Permission enums
});

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validation = updateUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.errors },
        { status: 400 }
      );
    }

    const userId = params.id;
    const { name, email, role, isActive, permissions } = validation.data;

    // Update user basic info
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(role && { role }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    // If permissions provided, update them
    if (permissions) {
      // Delete old permissions
      await prisma.userPermission.deleteMany({ where: { userId } });

      // Add new permissions
      const permissionData = permissions.map((perm) => ({
        userId,
        permission: perm,
      }));

      await prisma.userPermission.createMany({
        data: permissionData as any,
      });
    }

    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      {
        error: "Failed to update user",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
