import { GoogleServiceController } from "@/controller/googleServiceController";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const answers = body.answers;
        const spreadsheetId = body.spreadsheetId;

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