import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { InquiryStatus, Priority } from "@prisma/client";

export const inquirySchema = z.object({
  customerName: z.string().min(2),
  mobileNo: z.string().regex(/^\d{10}$/),
  city: z.string().min(2),
  service: z.string().min(2),
  callbackTime: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
    .optional()
    .nullable(),
  appointmentTime: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
    .optional()
    .nullable(),
  amount: z.string().regex(/^\d+$/),
  status: z.nativeEnum(InquiryStatus),
  priority: z.nativeEnum(Priority),
  userId: z.string().optional(),
  alternateMobile: z
    .string()
    .regex(/^\d{10}$/)
    .optional(),
  address: z.string().min(5),
  landmark: z.string().optional(),
  pincode: z.string().regex(/^\d{6}$/),
  state: z.string().min(1),
  remark: z.string().optional(),
  note: z.string().optional(),
  invoiceCustomer: z.string().optional(),
  cancelInquiry: z.boolean().optional(),
  feedback: z.string().optional(),
  cancelReason: z.string().optional(),
  engineerId: z.string().nullable().optional(),
  inquiryCategories: z.array(z.string()).optional(),
  inquirySubCategories: z.array(z.string()).optional(),
});

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, name: true, email: true } },
        engineer: { select: { id: true, name: true, email: true } },
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
    console.error("🔴 GET /api/inquiries/all error:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsed = inquirySchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    const {
      customerName,
      mobileNo,
      city,
      service,
      callbackTime,
      appointmentTime,
      amount,
      status,
      priority,
      userId,
      alternateMobile,
      address,
      landmark,
      pincode,
      state,
      remark = "",
      note = "",
      invoiceCustomer = "",
      cancelInquiry = false,
      feedback = "",
      cancelReason = "",
      engineerId = null,
      inquiryCategories = [],
      inquirySubCategories = [],
    } = parsed.data;

    const parsedCallback = callbackTime ? new Date(callbackTime) : undefined;
    const parsedAppointment = appointmentTime
      ? new Date(appointmentTime)
      : undefined;

    if (
      (callbackTime && parsedCallback?.toString() === "Invalid Date") ||
      (appointmentTime && parsedAppointment?.toString() === "Invalid Date")
    ) {
      return NextResponse.json(
        { error: "Invalid date format for callbackTime or appointmentTime" },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        customerName,
        mobileNo,
        city,
        service,
        callbackTime: parsedCallback,
        appointmentTime: parsedAppointment,
        amount: parseFloat(amount),
        status,
        priority,
        userId: userId || "",
        alternateMobile,
        address,
        landmark,
        pincode,
        state,
        remark,
        note,
        invoiceCustomer,
        cancelInquire: cancelInquiry,
        feedback,
        cancelReason,
        engineerId,
        inquiryCategories: {
          create: inquiryCategories.map((categoryId) => ({
            category: {
              connect: { id: categoryId },
            },
          })),
        },
        inquirySubCategories: {
          create: inquirySubCategories.map((subCategoryId) => ({
            subCategory: {
              connect: { id: subCategoryId },
            },
          })),
        },
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        engineer: {
          select: { id: true, name: true, email: true },
        },
        inquiryCategories: {
          include: {
            category: true,
          },
        },
        inquirySubCategories: {
          include: {
            subCategory: true,
          },
        },
      },
    });

    console.log("inquiry", inquiry);

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
