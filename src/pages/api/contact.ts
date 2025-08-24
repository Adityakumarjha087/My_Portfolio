import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message }: ContactFormData = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate environment variables
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error('Missing Google Drive credentials in environment variables');
      return res.status(500).json({ 
        message: 'Server configuration error. Please contact the administrator.',
        error: 'Missing Google Drive credentials'
      });
    }

    // Set up Google Drive API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });

    // Create message content
    const messageContent = `
Contact Form Submission
======================

Date: ${new Date().toLocaleString()}
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Submitted from Portfolio Website
    `.trim();

    // Create file in Google Drive
    const fileName = `Contact_${name.replace(/\s+/g, '_')}_${Date.now()}.txt`;
    
    const fileMetadata = {
      name: fileName,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID || 'root'], // Optional: specify folder ID
    };

    const media = {
      mimeType: 'text/plain',
      body: messageContent,
    };

    const file = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });

    console.log('File created with ID:', file.data.id);

    // Send success response
    res.status(200).json({ 
      message: 'Message sent successfully and saved to Google Drive',
      fileId: file.data.id
    });

  } catch (error) {
    console.error('Error saving to Google Drive:', error);
    res.status(500).json({ 
      message: 'Failed to save message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}
