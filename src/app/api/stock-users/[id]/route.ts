import { NextResponse } from "next/server";
import stockUsersData from "@/data/stock-users.json";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const user = stockUsersData.stockUsers.find((u) => u.id === params.id);
    if (!user) {
      return NextResponse.json(
        { error: "Stock user not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stock user" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const body = await request.json();
    const user = stockUsersData.stockUsers.find((u) => u.id === params.id);
    if (!user) {
      return NextResponse.json(
        { error: "Stock user not found" },
        { status: 404 }
      );
    }
    // In a real application, validate the body and update in database
    return NextResponse.json({ ...user, ...body });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update stock user" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const user = stockUsersData.stockUsers.find((u) => u.id === params.id);
    if (!user) {
      return NextResponse.json(
        { error: "Stock user not found" },
        { status: 404 }
      );
    }
    // In a real application, delete from database
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete stock user" },
      { status: 500 }
    );
  }
}
