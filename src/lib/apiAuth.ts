/**
 * Validates API key from request headers
 * @param request - The incoming request object
 * @returns Object with isValid boolean and error message if invalid
 */
export function validateApiKey(request: Request): { isValid: boolean; error?: string } {
    const apiKey = request.headers.get('x-api-key');
    const validApiKey = process.env.API_SECRET_KEY;

    if (!validApiKey) {
        console.error('API_SECRET_KEY is not configured in environment variables');
        return { isValid: false, error: 'API authentication not configured' };
    }

    if (!apiKey) {
        return { isValid: false, error: 'API key is required' };
    }

    if (apiKey !== validApiKey) {
        return { isValid: false, error: 'Invalid API key' };
    }

    return { isValid: true };
}

/**
 * Creates an unauthorized response
 * @param message - Error message to return
 * @returns Response object with 401 status
 */
export function unauthorizedResponse(message: string = 'Unauthorized'): Response {
    return new Response(JSON.stringify({
        error: message
    }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
    });
}
