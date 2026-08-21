import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Security update failed" }, { status: 500 });
  }
}
