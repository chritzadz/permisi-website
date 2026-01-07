import jwt from "jsonwebtoken";
import { AdminLoginRepository } from "@/repository/adminLoginRepository";

interface AdminCredentials {
  username: string;
  password: string;
}

interface AdminLoginResponse {
  success: boolean;
  message?: string;
  token?: string;
}

export class AdminLoginService {
  private repository: AdminLoginRepository;

  constructor() {
    this.repository = new AdminLoginRepository();
  }

  async authenticate(
    credentials: AdminCredentials
  ): Promise<AdminLoginResponse> {
    const adminCreds = this.repository.getAdminCredentials();

    if (!adminCreds.username || !adminCreds.password) {
      return { success: false, message: "Admin credentials not configured" };
    }

    if (
      credentials.username == adminCreds.username &&
      credentials.password == adminCreds.password
    ) {
      const token = jwt.sign(
        { username: credentials.username, role: "admin" },
        this.repository.getAdminJWToken(),
        { expiresIn: "24h" }
      );
      return { success: true, token };
    }
    return { success: false, message: "Invalid credentials" };
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      jwt.verify(token, this.repository.getAdminJWToken());
      return true;
    } catch (error) {
      console.error("JWT Verification Error:", error);
      return false;
    }
  }
}
