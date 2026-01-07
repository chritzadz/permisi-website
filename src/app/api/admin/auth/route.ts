import { NextRequest, NextResponse } from "next/server";
import { AdminLoginController } from "@/controller/adminLoginController";

const authController = new AdminLoginController();

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const result = await authController.login({ username, password });

    if (result.success) {
      console.log("Login successful. Setting cookie...");
      const response = NextResponse.json({ success: true });
      response.cookies.set("admin-token", result.token!, {
        httpOnly: true,
        // If your production environment is not HTTPS (unlikely), set this to false manually to test
        secure: process.env.NODE_ENV === "production", 
        sameSite: "lax",
        path: "/",
        maxAge: 86400,
      });
      return response;
    }

    return NextResponse.json(result, { status: 401 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
