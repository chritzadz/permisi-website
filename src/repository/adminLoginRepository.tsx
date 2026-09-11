export function getAdminJwtSecret(): string | null {
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }
  // Fail closed in production: no configured secret means admin auth is off.
  return process.env.NODE_ENV === "production" ? null : "fallback_jwtoken";
}

export class AdminLoginRepository {
  getAdminCredentials() {
    return {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    };
  }
  getAdminJWToken() {
    return getAdminJwtSecret();
  }
}
