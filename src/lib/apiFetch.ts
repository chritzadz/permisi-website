let redirecting = false;

/**
 * fetch wrapper for same-origin API calls. Admin mutations authorize via the
 * HttpOnly admin-token session cookie, so no key header is sent. A 401 from
 * /api/* while inside /admin/* means the session expired: bounce to login.
 */
export async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (
        response.status === 401 &&
        typeof window !== "undefined" &&
        url.startsWith("/api/") &&
        window.location.pathname.startsWith("/admin") &&
        !redirecting
    ) {
        redirecting = true;
        window.location.href = "/admin/login";
    }

    return response;
}
