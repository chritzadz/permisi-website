import { NextRequest, NextResponse } from "next/server";
import { AdminLoginController } from "@/controller/adminLoginController";

const authController = new AdminLoginController();

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin-token")?.value;

  if (!token) {
    console.warn("Validation failed: No 'admin-token' cookie found.");
    return NextResponse.json({ success: false, message: "No token found" }, { status: 401 });
  }

  const result = await authController.validateToken(token);

  if (!result.success) {
    console.warn("Validation failed: Token verification failed.");
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
