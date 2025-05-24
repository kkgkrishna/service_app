import { NextResponse } from "next/server";
import stockUsersData from "@/data/stock-users.json";

export async function GET() {
  try {
    return NextResponse.json(stockUsersData.stockUsers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stock users" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // In a real application, validate the body and save to database
    return NextResponse.json(body, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create stock user" },
      { status: 500 }
    );
  }
}
