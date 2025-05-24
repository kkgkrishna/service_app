import { NextResponse } from "next/server";
import engineersData from "@/data/engineers.json";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const engineer = engineersData.engineers.find((e) => e.id === params.id);

    if (!engineer) {
      return NextResponse.json(
        { error: "Engineer not found" },
        { status: 404 }
      );
    }

    // In a real application, you would update the database
    // For now, we'll just return the merged data
    const updatedEngineer = { ...engineer, ...data };
    return NextResponse.json(updatedEngineer);
  } catch (error) {
    console.error("Error updating engineer:", error);
    return NextResponse.json(
      { error: "Failed to update engineer" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const engineer = engineersData.engineers.find((e) => e.id === params.id);

    if (!engineer) {
      return NextResponse.json(
        { error: "Engineer not found" },
        { status: 404 }
      );
    }

    // In a real application, you would delete from the database
    // For now, we'll just return a success response
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting engineer:", error);
    return NextResponse.json(
      { error: "Failed to delete engineer" },
      { status: 500 }
    );
  }
}
