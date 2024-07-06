import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

type Note = {
  content: string;
  likes: number;
  subject: string;
  title: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const note: Note = req.body;

    try {
      const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS as string);
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      const sheets = google.sheets({ version: 'v4', auth });

      const values = [[note.content, note.likes.toString(), note.subject, note.title]];

      console.log('Appending the following data to Google Sheets:', values);

      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: 'SPREADSHEET_ID',
        range: 'Backend!A1:D1',
        valueInputOption: 'RAW',
        requestBody: {
          values,
        },
      });

      console.log('Google Sheets API response:', response.data);

      res.status(200).json({ message: 'Data successfully appended to Google Sheet', data: response.data });
    } catch (error) {
      console.error('Error appending data to Google Sheet:', error);
      res.status(500).json({ message: 'Error appending data to Google Sheet', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
