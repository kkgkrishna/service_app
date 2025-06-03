import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const inquirySchema = z.object({
  customerName: z
    .string()
    .min(2, "Customer name must be at least 2 characters"),
  mobileNo: z
    .string()
    .regex(/^\d{10}$/, "Must be a valid 10-digit mobile number"),
  city: z.string().min(2, "City must be at least 2 characters"),
  service: z.string().min(2, "Service must be at least 2 characters"),
  callbackTime: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Invalid date format"),
  appointmentTime: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Invalid date format"),
  amount: z.string().regex(/^\d+$/, "Amount must be a valid number"),
  status: z.string().min(1, "Status is required"),
  userId: z.string().optional(),
  alternateMobile: z
    .string()
    .regex(/^\d{10}$/, "Must be a valid 10-digit mobile number")
    .optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  landmark: z
    .string()
    .min(2, "Landmark must be at least 2 characters")
    .optional(),
  pincode: z.string().regex(/^\d{6}$/, "Must be a valid 6-digit pincode"),
  state: z.string().min(1, "State is required"),
  priority: z.string().min(1, "Priority is required"),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const search = searchParams.get("search")?.trim();
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const where: any = {};

    where.address = { not: null };

    if (status) {
      where.status = status;
    }

    if (priority) {
      where.priority = priority;
    }

    if (search) {
      where.OR = [
        { customerName: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
        { service: { contains: search, mode: "insensitive" } },
        { mobileNo: { contains: search } },
      ];
    }

    if (from || to) {
      where.createdAt = {};
      if (from) {
        where.createdAt.gte = new Date(from);
      }
      if (to) {
        const endOfDay = new Date(to);
        endOfDay.setHours(23, 59, 59, 999);
        where.createdAt.lte = endOfDay;
      }
    }

    console.log("WHERE filter object:", where);
    console.log("GET inquiries", {
      page,
      limit,
      status,
      priority,
      search,
      from,
      to,
    });

    const inquiries = await prisma.inquiry.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.inquiry.count({ where });

    return NextResponse.json({
      inquiries,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(
      "GET /api/inquiries error:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("🟡 Incoming inquiry payload:", data);

    // Safely convert strings to Date objects
    const callbackTime = new Date(data.callbackTime);
    const appointmentTime = new Date(data.appointmentTime);

    if (isNaN(callbackTime.getTime()) || isNaN(appointmentTime.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format for callbackTime or appointmentTime" },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        customerName: data.customerName,
        mobileNo: data.mobileNo,
        city: data.city,
        service: data.service,
        callbackTime,
        appointmentTime,
        amount: data.amount,
        status: data.status,
        userId: data.userId || null,
        alternateMobile: data.alternateMobile || null,
        address: data.address,
        landmark: data.landmark || null,
        pincode: data.pincode,
        state: data.state,
        priority: data.priority,
      },
    });

    return NextResponse.json(inquiry);
  } catch (error: any) {
    console.error("🔴 POST /api/inquiries error:", {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
    });

    return NextResponse.json(
      { error: error?.message || "Failed to create inquiry" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Inquiry ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();
    console.log("PUT inquiry", { id, data });

    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        customerName: data.customerName,
        mobileNo: data.mobileNo,
        city: data.city,
        service: data.service,
        callbackTime: new Date(data.callbackTime),
        appointmentTime: new Date(data.appointmentTime),
        amount: data.amount,
        status: data.status,
        userId: data.userId || null,
        alternateMobile: data.alternateMobile || null,
        address: data.address,
        landmark: data.landmark || null,
        pincode: data.pincode,
        state: data.state,
        priority: data.priority,
      },
    });

    return NextResponse.json(updatedInquiry);
  } catch (error) {
    console.error("PUT /api/inquiries error:", error);
    return NextResponse.json(
      { error: "Failed to update inquiry" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Inquiry ID is required" },
        { status: 400 }
      );
    }

    await prisma.inquiry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/inquiries error:", error);
    return NextResponse.json(
      { error: "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
