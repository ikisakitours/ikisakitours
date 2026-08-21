import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    


    console.log(`Recovery requested for: ${email}`);

    return NextResponse.json(
      { message: "If that email exists, a recovery code has been sent." }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Recovery API Error:", error);
    return NextResponse.json(
      { error: "Failed to process recovery request" }, 
      { status: 500 }
    );
  }
}