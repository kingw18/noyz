import { NextResponse } from "next/server";
import { fetchRestaurants } from "@/app/lib/data"; // Adjust the path as necessary

export async function GET() {
  try {
    const restaurants = await fetchRestaurants();
    return NextResponse.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurants." },
      { status: 500 }
    );
  }
}
