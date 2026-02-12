import { GoogleServiceController } from "@/controller/googleServiceController";
import { FormService } from "@/service/FormService";

export async function POST(request: Request) {
    try {
        // const referer = request.headers.get('referer') || '';
        // if (!referer.includes('permisi.hk')) {
        //     return new Response(JSON.stringify({ error: 'Forbidden: Invalid domain' }), {
        //         status: 403,
        //         headers: { 'Content-Type': 'application/json' }
        //     });
        // }
        const body = await request.json();
        const answers = body.answers;
        const formName = body.formName;

        if (!formName) {
            return new Response(JSON.stringify({ error: "Form name is required" }), {
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

        const spreadsheetId = form.google_sheet_id;

        const googleSheetsController: GoogleServiceController = new GoogleServiceController(spreadsheetId);
        const data: string[] = Object.values(answers);
        const result = await googleSheetsController.addRow(data); //default Sheet1

        if (result && typeof result === 'object' && 'error' in result) {
            // Google Sheets API error
            return new Response(JSON.stringify({ error: result.error }), {
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
        return new Response(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// export async function GET(request: Request) {
//      const url = new URL(request.url);
//     const formName = url.searchParams.get("formName");

//     const googleSheetsController: GoogleServiceController = new GoogleServiceController(spreadsheetId);
    
    

//     return new Response(JSON.stringify({}), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' }
//     });
// }