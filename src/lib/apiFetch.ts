/**
 * Utility to get API headers with authentication
 */
export function getApiHeaders(): HeadersInit {
    return {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
    };
}

/**
 * Authenticated fetch wrapper for API calls
 */
export async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const headers = {
        ...getApiHeaders(),
        ...options.headers,
    };

    return fetch(url, {
        ...options,
        headers,
    });
}
