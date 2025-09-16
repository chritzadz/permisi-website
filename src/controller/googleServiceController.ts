import {GoogleAuth} from 'google-auth-library';
import {google} from 'googleapis';

export class GoogleServiceController {
    private spreadsheetId: string;
    private GOOGLE_SHEETS_API = process.env.GOOGLE_SHEETS_API;
    private CLIENT_ID = process.env.CLIENT_ID;
    private auth;

    constructor(spreadSheetId: string) {
        this.spreadsheetId = spreadSheetId;

        this.auth = new GoogleAuth({
            keyFile: this.GOOGLE_SHEETS_API,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
    }

    async addRow(data: string[], range: string = 'Sheet1') {
        const service = google.sheets({version: 'v4', auth: this.auth});
        let values = [
            data
        ];
        const resource = {
            values,
        };

        const result = await service.spreadsheets.values.update({
            spreadsheetId: this.spreadsheetId,
            range: range,
            valueInputOption: 'RAW',
            requestBody: resource
        });

        return result;
    }
}

