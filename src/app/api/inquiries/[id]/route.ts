import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { InquiryStatus, Priority } from "@prisma/client";

// Schema for validation
export const inquiryUpdateSchema = z.object({
  customerName: z.string().min(2),
  mobileNo: z.string().regex(/^\d{10}$/),
  city: z.string().min(2),
  service: z.string().min(2).nullable(),
  callbackTime: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
      "Invalid datetime format (YYYY-MM-DDTHH:MM)"
    ),
  appointmentTime: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
      "Invalid datetime format (YYYY-MM-DDTHH:MM)"
    ),
  amount: z.string().regex(/^\d+$/),
  status: z.nativeEnum(InquiryStatus),
  priority: z.nativeEnum(Priority),
  userId: z.string(),
  alternateMobile: z.string().nullable().optional(),
  address: z.string().min(5),
  landmark: z.string().nullable().optional(),
  pincode: z.string().regex(/^\d{6}$/),
  state: z.string().min(1),
  remark: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
  invoiceCustomer: z.string().nullable().optional(),
  cancelInquiry: z.boolean().optional(),
  feedback: z.string().nullable().optional(),
  cancelReason: z.string().nullable().optional(),
  engineerId: z.string().nullable().optional(),
  inquiryCategories: z.array(z.string()).optional(),
  inquirySubCategories: z.array(z.string()).optional(),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        engineer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
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

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json(inquiry);
  } catch (error: any) {
    console.error("GET /api/inquiries/[id] error:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch inquiry" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;
    const data = await request.json();

    const parsed = inquiryUpdateSchema.safeParse(data);
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

    const parsedCallback = new Date(callbackTime);
    const parsedAppointment = new Date(appointmentTime);

    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        customerName,
        mobileNo,
        city,
        service: service ?? null,
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
          set: [],
          connect: inquiryCategories.map((id) => ({ id })),
        },
        inquirySubCategories: {
          set: [],
          connect: inquirySubCategories.map((id) => ({ id })),
        },
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        engineer: { select: { id: true, name: true, email: true } },
        inquiryCategories: { include: { category: true } },
        inquirySubCategories: { include: { subCategory: true } },
      },
    });

    return NextResponse.json(updatedInquiry);
  } catch (error: any) {
    console.error("🔴 PUT /api/inquiries/[id] error:", {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
    });
    return NextResponse.json(
      { error: error?.message || "Failed to update inquiry" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.inquiry.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Inquiry deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/inquiries/[id] error:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
