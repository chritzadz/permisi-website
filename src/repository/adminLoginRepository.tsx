export class AdminLoginRepository {
  getAdminCredentials() {
    return {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    };
  }
  getAdminJWToken() {
    return process.env.JWT_SECRET || "fallback_jwtoken";
  }
}
