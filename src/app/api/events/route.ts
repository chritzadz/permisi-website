import { EventService } from "@/service/EventService";
import { validateApiKey, unauthorizedResponse } from "@/lib/apiAuth";

const MAX_NAME_LENGTH = 255;
const MAX_DESCRIPTION_LENGTH = 5000;
const MAX_LINK_LENGTH = 500;

function parseEventDate(value: unknown): string | null {
    if (typeof value !== 'string' || value.trim() === '') return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date.toISOString().split('T')[0];
}

export async function GET(request: Request) {
    try {
        const service: EventService = new EventService();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const page = searchParams.get('page');
        const limit = searchParams.get('limit');
        const search = searchParams.get('search');

        if (id) {
            const event = await service.getEventById(parseInt(id));

            if (!event) {
                return new Response(JSON.stringify({
                    error: 'Event not found'
                }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            return new Response(JSON.stringify({
                data: event
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Check if pagination is requested
        if (page && limit) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const result = await service.getEventsWithPagination(pageNum, limitNum, search || undefined);

            return new Response(JSON.stringify({
                data: result.events,
                pagination: {
                    total: result.totalCount,
                    totalPages: result.totalPages,
                    currentPage: result.currentPage,
                    limit: limitNum
                }
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Return all events if no pagination
        const events = await service.getAllEvents();
        return new Response(JSON.stringify({
            data: events
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error in events API:', error);
        return new Response(JSON.stringify({
            error: 'Internal server error'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function POST(request: Request) {
    const apiKeyValidation = validateApiKey(request);
    if (!apiKeyValidation.isValid) {
        return unauthorizedResponse(apiKeyValidation.error);
    }

    try {
        const service: EventService = new EventService();
        const body = await request.json();

        const name: string = String(body.name ?? "").trim();
        const eventDate = parseEventDate(body.event_date);

        if (!name || eventDate === null) {
            return new Response(JSON.stringify({
                error: 'Name and a valid event_date are required'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (name.length > MAX_NAME_LENGTH) {
            return new Response(JSON.stringify({
                error: 'Event name is too long'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const event = await service.createEvent({
            name,
            event_date: eventDate,
            description: typeof body.description === 'string' ? body.description.slice(0, MAX_DESCRIPTION_LENGTH) : undefined,
            form_link: typeof body.form_link === 'string' && body.form_link.trim() !== '' ? body.form_link.trim().slice(0, MAX_LINK_LENGTH) : undefined
        });

        return new Response(JSON.stringify({
            data: event,
            message: 'Event created successfully'
        }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error creating event:', error);
        return new Response(JSON.stringify({
            error: 'Failed to create event'
        }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function PATCH(request: Request) {
    const apiKeyValidation = validateApiKey(request);
    if (!apiKeyValidation.isValid) {
        return unauthorizedResponse(apiKeyValidation.error);
    }

    try {
        const service: EventService = new EventService();
        const body = await request.json();
        const id = Number(body.id);

        if (!id || Number.isNaN(id)) {
            return new Response(JSON.stringify({
                error: 'id is required'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const updates: { name?: string; event_date?: string; description?: string; form_link?: string | null } = {};

        if (typeof body.name === 'string' && body.name.trim() !== '') {
            updates.name = body.name.trim().slice(0, MAX_NAME_LENGTH);
        }
        if (body.event_date !== undefined) {
            const eventDate = parseEventDate(body.event_date);
            if (eventDate === null) {
                return new Response(JSON.stringify({
                    error: 'event_date is invalid'
                }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            updates.event_date = eventDate;
        }
        if (typeof body.description === 'string') {
            updates.description = body.description.slice(0, MAX_DESCRIPTION_LENGTH);
        }
        if (body.form_link !== undefined) {
            updates.form_link = typeof body.form_link === 'string' && body.form_link.trim() !== ''
                ? body.form_link.trim().slice(0, MAX_LINK_LENGTH)
                : '';
        }

        const existing = await service.getEventById(id);
        if (!existing) {
            return new Response(JSON.stringify({
                error: 'Event not found'
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const event = await service.updateEvent(id, updates);
        const events = await service.getAllEvents();

        return new Response(JSON.stringify({
            data: event,
            events,
            message: 'Event updated successfully'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error updating event:', error);
        return new Response(JSON.stringify({
            error: 'Failed to update event'
        }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function DELETE(request: Request) {
    const apiKeyValidation = validateApiKey(request);
    if (!apiKeyValidation.isValid) {
        return unauthorizedResponse(apiKeyValidation.error);
    }

    try {
        const service: EventService = new EventService();
        const body = await request.json();
        const id = Number(body.id);

        if (!id || Number.isNaN(id)) {
            return new Response(JSON.stringify({
                error: 'id is required'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Forms linked to this event are unlinked first (FK on forms.event_id)
        const removed = await service.deleteEvent(id);

        if (!removed) {
            return new Response(JSON.stringify({
                error: 'Event not found'
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const events = await service.getAllEvents();

        return new Response(JSON.stringify({
            data: removed,
            events
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error deleting event:', error);
        return new Response(JSON.stringify({
            error: 'Failed to delete event'
        }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
