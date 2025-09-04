import { NextRequest, NextResponse } from "next/server";
import { AdminLoginController } from "@/controller/adminLoginController";

const authController = new AdminLoginController();

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin-token")?.value;

  if (!token) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const result = await authController.validateToken(token);

  if (!result.success) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
