import { GoogleServiceController } from "@/controller/googleServiceController";

export async function POST(request: Request) {
    const body = await request.json();
    const answers = body.answers;
    const spreadsheetId = body.spreadsheetId

    const googleSheetsController: GoogleServiceController = new GoogleServiceController(spreadsheetId);
    const data: string[] = Object.values(answers);
    googleSheetsController.addRow(data); //default Sheet1
    

    return new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
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