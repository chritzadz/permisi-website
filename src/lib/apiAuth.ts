import jwt from "jsonwebtoken";
import { getAdminJwtSecret } from "@/repository/adminLoginRepository";

const COOKIE_NAME = "admin-token";

function authResponse(status: number, error: string): Response {
    return new Response(JSON.stringify({ error }), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
}

function sameOrigin(request: Request): boolean {
    const host = new URL(request.url).host;
    const source = request.headers.get("origin") || request.headers.get("referer");
    if (!source) {
        // Non-browser callers (no Origin/Referer) still need a valid session
        // cookie, so there is nothing cross-site to protect against here.
        return true;
    }
    try {
        return new URL(source).host === host;
    } catch {
        return false;
    }
}

/**
 * Authorizes a mutating API request with the HttpOnly `admin-token` JWT
 * session cookie set at /admin/login. Returns null when the request is
 * allowed, or a ready-to-return 401/403/500 Response when it is not.
 */
export function requireAdminSession(request: Request): Response | null {
    if (!sameOrigin(request)) {
        return authResponse(403, "Forbidden: cross-origin request");
    }

    const cookieHeader = request.headers.get("cookie") || "";
    const pair = cookieHeader
        .split(/;\s*/)
        .find(entry => entry.startsWith(`${COOKIE_NAME}=`));
    const token = pair ? decodeURIComponent(pair.slice(COOKIE_NAME.length + 1)) : null;

    if (!token) {
        return authResponse(401, "Admin session required. Please log in again.");
    }

    const secret = getAdminJwtSecret();
    if (!secret) {
        return authResponse(500, "Admin auth is not configured on this server");
    }

    try {
        const payload = jwt.verify(token, secret) as jwt.JwtPayload;
        if (payload.role !== "admin") {
            return authResponse(401, "Invalid admin session");
        }
    } catch {
        return authResponse(401, "Admin session expired. Please log in again.");
    }

    return null;
}
