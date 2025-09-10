import { google } from 'googleapis';

export class AdminLoginController {
    private spreadSheetId: string;
    private GOOGLE_SHEETS_API = process.env.GOOGLE_SHEETS_API;
    private CLIENT_ID = process.env.CLIENT_ID;
    private auth;

    constructor(spreadSheetId: string) {
        this.spreadSheetId = spreadSheetId;

        this.auth = new google.auth.GoogleAuth({
            keyFile: this.GOOGLE_SHEETS_API,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
    }

    async addRow(data: any){
        await sheets.spreadsheets.values.append({
            spreadsheetId: 'YOUR_SPREADSHEET_ID',
            range: 'Sheet1', // or 'Sheet1!A1'
            valueInputOption: 'RAW',
            requestBody: {
                values: [
                ['Value 1', 'Value 2', 'Value 3'], // each inner array is a row
                ],
            },
        });
    }
}

