import { Option } from "@/model/formInputModel/Option";
import { FormInputService } from "@/service/FormInputService";
import { requireAdminSession } from "@/lib/apiAuth";

export async function GET(request: Request) {
    // Public read: the form-filling page needs the options of a form input
    try {
        const service: FormInputService = new FormInputService();

        const url = new URL(request.url);
        const formInputId = url.searchParams.get("forminputid");
        let options;
        if (!(formInputId === null)){
            options = await service.getOptionsByFormInputId(parseInt(formInputId));
        }

        return new Response(JSON.stringify({
            data: options
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("GET /api/options Error:", error);
        return new Response(JSON.stringify({
            error: "Internal Server Error"
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function PATCH(request: Request) {
    const denied = requireAdminSession(request);
    if (denied) {
        return denied;
    }

    try {
        const service: FormInputService = new FormInputService();
        const body = await request.json();
        const id: number = body.id;

        if (!id || !Array.isArray(body.options)) {
            return new Response(JSON.stringify({
                error: 'id and options[] are required'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const rawOptions: unknown[] = body.options;
        if (typeof body.newOption === 'string' && body.newOption.trim() !== "") {
            rawOptions.push(body.newOption);
        }

        const cleaned = [
            ...new Set(
                rawOptions
                    .map((o) =>
                        typeof o === 'string'
                            ? o
                            : String((o as Option)?.option ?? '')
                    )
                    .map((o) => o.trim().slice(0, 100))
                    .filter((o) => o !== '')
            ),
        ].slice(0, 50);

        const options = await service.replaceOptions(id, cleaned);

        return new Response(JSON.stringify({
            data: options,
            success: "update success"
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("PATCH /api/options Error:", error);
        return new Response(JSON.stringify({
            error: "Failed to update options"
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}