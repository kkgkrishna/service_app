import { NextResponse } from "next/server";
import collectionsData from "@/data/collections.json";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let filteredCollections = collectionsData.collections;

    if (status) {
      filteredCollections = filteredCollections.filter(
        (collection) => collection.status === status
      );
    }

    return NextResponse.json(filteredCollections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      { error: "Failed to fetch collections" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // In a real application, you would save this to a database
    // For now, we'll just return the data as if it was saved
    const newCollection = {
      id: String(collectionsData.collections.length + 1),
      ...data,
      status: data.status || "pending",
      amount: parseFloat(data.amount) || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(newCollection, { status: 201 });
  } catch (error) {
    console.error("Error creating collection:", error);
    return NextResponse.json(
      { error: "Failed to create collection" },
      { status: 500 }
    );
  }
}
