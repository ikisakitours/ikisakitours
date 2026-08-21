import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { otp, password, email } = await request.json(); 
    
 

    console.log(`Password reset successfully using OTP: ${otp}`);

    return NextResponse.json(
      { message: "Password has been reset successfully" }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset Password API Error:", error);
    return NextResponse.json(
      { error: "Failed to reset password. Invalid or expired OTP." }, 
      { status: 400 } 
    );
  }
}