import { GoogleServiceController } from "@/controller/googleServiceController";
import { FormInputService } from "@/service/FormInputService";
import { FormService } from "@/service/FormService";

const MAX_ANSWER_LENGTH = 5000;

export async function POST(request: Request) {
    try {
        const referer = request.headers.get('referer') || '';
        const allowedOrigin =
            referer.includes('permisi.hk') ||
            referer.includes('localhost') ||
            referer.includes('127.0.0.1');
        if (!allowedOrigin) {
            return new Response(JSON.stringify({ error: 'Forbidden: Invalid domain' }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const body = await request.json();
        const answers = body.answers;
        const formName = body.formName;

        if (!formName) {
            return new Response(JSON.stringify({ error: "Form name is required" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
            return new Response(JSON.stringify({ error: "Answers are required" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const formService = new FormService();
        const form = await formService.getFormByName(formName as string);

        if (!form || !form.google_sheet_id) {
            return new Response(JSON.stringify({ error: "Form not found or Sheet ID missing" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (form.status === 'CLOSED') {
            return new Response(JSON.stringify({ error: "This form is closed for submissions" }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Order values by the form's question order so sheet columns never shift
        const formInputService = new FormInputService();
        const formInputs: { id: number }[] = await formInputService.getFormInputsById(formName as string);

        if (!formInputs || formInputs.length === 0) {
            return new Response(JSON.stringify({ error: "Form has no questions" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const data: string[] = [...formInputs]
            .sort((a, b) => a.id - b.id)
            .map((input) => {
                const raw = (answers as Record<string, unknown>)[String(input.id)];
                return typeof raw === 'string' ? raw.slice(0, MAX_ANSWER_LENGTH) : "";
            });

        const googleSheetsController: GoogleServiceController = new GoogleServiceController(form.google_sheet_id);
        const result = await googleSheetsController.addRow(data); //default Sheet1

        if (result && typeof result === 'object' && 'error' in result) {
            // Google Sheets API details stay server-side
            return new Response(JSON.stringify({ error: "Failed to record response" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('API route error:', error);
        return new Response(JSON.stringify({ error: "Failed to record response" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
