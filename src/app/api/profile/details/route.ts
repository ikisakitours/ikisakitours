import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { firstName, lastName, email } = await request.json();
    
  

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}