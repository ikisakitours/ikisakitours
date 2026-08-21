import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
   

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}