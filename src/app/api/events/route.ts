import { EventService } from "@/service/EventService";
import { validateApiKey, unauthorizedResponse } from "@/lib/apiAuth";

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
    const apiKeyValid = await validateApiKey(request);
    if (!apiKeyValid) {
        return unauthorizedResponse();
    }

    try {
        const service: EventService = new EventService();
        const body = await request.json();
        
        if (!body.name || !body.event_date) {
            return new Response(JSON.stringify({
                error: 'Name and event_date are required'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const event = await service.createEvent({
            name: body.name,
            event_date: new Date(body.event_date),
            description: body.description,
            location: body.location,
            registration_url: body.registration_url,
            form_link: body.form_link
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
            error: 'Internal server error'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}