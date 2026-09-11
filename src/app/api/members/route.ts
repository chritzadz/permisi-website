import { Member } from "@/model/Member";
import { MembersService } from "@/service/MembersService";
import { validateApiKey, unauthorizedResponse } from "@/lib/apiAuth";

const MAX_NAME_LENGTH = 150;
const MAX_ROLE_LENGTH = 150;
const MAX_DIVISION_LENGTH = 100;

export async function GET() {
    // Public read: the association board may be shown on public pages
    try {
        const service = new MembersService();
        const members: Member[] = await service.getAllMembers();

        return new Response(JSON.stringify({
            data: members
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("GET /api/members Error:", error);
        return new Response(JSON.stringify({
            error: "Internal Server Error"
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
        const body = await request.json();
        const name: string = String(body.name ?? "").trim();
        const role: string = String(body.role ?? "").trim();
        const division: string = String(body.division ?? "").trim();

        if (!name || !role || !division) {
            return new Response(JSON.stringify({
                error: 'name, role, and division are required'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (name.length > MAX_NAME_LENGTH || role.length > MAX_ROLE_LENGTH || division.length > MAX_DIVISION_LENGTH) {
            return new Response(JSON.stringify({
                error: 'Member fields are too long'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const service = new MembersService();
        await service.addMember(name, role, division);
        const members = await service.getAllMembers();

        return new Response(JSON.stringify({
            data: members
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("POST /api/members Error:", error);
        return new Response(JSON.stringify({
            error: "Failed to add member"
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
        const body = await request.json();
        const id: number = Number(body.id);

        if (!id || Number.isNaN(id)) {
            return new Response(JSON.stringify({
                error: 'id is required'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const service = new MembersService();
        const removed = await service.deleteMember(id);

        if (!removed) {
            return new Response(JSON.stringify({
                error: 'Member not found'
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const members = await service.getAllMembers();

        return new Response(JSON.stringify({
            data: members
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("DELETE /api/members Error:", error);
        return new Response(JSON.stringify({
            error: "Failed to delete member"
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
