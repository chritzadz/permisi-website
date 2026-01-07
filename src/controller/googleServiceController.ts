import {GoogleAuth} from 'google-auth-library';
import {google} from 'googleapis';

export class GoogleServiceController {
    private spreadsheetId: string;
    private auth;

    constructor(spreadSheetId: string) {
        const rawGooglePrivateKey = process.env.GOOGLE_PRIVATE_KEY || "";
        const sanitizedKey = rawGooglePrivateKey.replace(/\\n/g, "\n");


        const credentials = {
            type: 'service_account',
            project_id: 'permisi-website-main',
            private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
            private_key: sanitizedKey,
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            client_id: process.env.GOOGLE_CLIENT_ID,
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: 'https://oauth2.googleapis.com/token',
            auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
            client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
        };

        this.spreadsheetId = spreadSheetId;

        this.auth = new GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
    }

    async addRow(data: string[], range: string = 'Sheet1') {
        try {
            const service = google.sheets({version: 'v4', auth: this.auth});
            const values = [data];
            const resource = { values };
            const result = await service.spreadsheets.values.append({
                spreadsheetId: this.spreadsheetId,
                range: range,
                valueInputOption: 'RAW',
                requestBody: resource
            });
            console.log(result);
            return result;
        } catch (error) {
            console.error('Google Sheets API error:', error);
            console.error(`Please ensure that the Google Sheet (${this.spreadsheetId}) is shared with the service account email: ${process.env.GOOGLE_CLIENT_EMAIL}`);
            return { error: error instanceof Error ? error.message : String(error) };
        }
    }
}

