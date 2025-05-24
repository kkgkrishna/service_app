import { NextResponse } from "next/server";
import engineersData from "@/data/engineers.json";

export async function GET() {
  try {
    return NextResponse.json(engineersData.engineers);
  } catch (error) {
    console.error("Error fetching engineers:", error);
    return NextResponse.json(
      { error: "Failed to fetch engineers" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // In a real application, you would save this to a database
    // For now, we'll just return the data as if it was saved
    const newEngineer = {
      id: String(engineersData.engineers.length + 1),
      ...data,
      status: true,
    };

    return NextResponse.json(newEngineer, { status: 201 });
  } catch (error) {
    console.error("Error creating engineer:", error);
    return NextResponse.json(
      { error: "Failed to create engineer" },
      { status: 500 }
    );
  }
}
