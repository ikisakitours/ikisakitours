// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

// POST request එක handle කරන function එක
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    console.log("Received data from frontend:", data);

    
    return NextResponse.json(
      { message: "Contact form submitted successfully!" },
      { status: 200 }
    );

  } catch (error) {
    console.error("API Error:", error);
    
    return NextResponse.json(
      { error: "Failed to submit the form. Please try again." },
      { status: 500 }
    );
  }
}