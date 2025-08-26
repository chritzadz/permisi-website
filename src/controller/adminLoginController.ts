import { AdminLoginService } from "@/service/adminLoginService";

interface AdminCredentials {
  username: string;
  password: string;
}

export class AdminLoginController {
  private authService: AdminLoginService;

  constructor() {
    this.authService = new AdminLoginService();
  }

  async login(credentials: AdminCredentials) {
    try {
      const result = await this.authService.authenticate(credentials);
      return result;
    } catch (error) {
      return { success: false, message: "Authentication failed" };
    }
  }

  async validateToken(token: string) {
    try {
      const isValid = await this.authService.verifyToken(token);
      return { success: isValid };
    } catch (error) {
      return { success: false };
    }
  }
}
