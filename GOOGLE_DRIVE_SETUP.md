# Google Drive Integration Setup

## Prerequisites
1. Install the googleapis package:
```bash
npm install googleapis
```

## Google Cloud Console Setup

### Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one

### Step 2: Enable Google Drive API
1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Drive API"
3. Click on it and press "Enable"

### Step 3: Create Service Account
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `portfolio-contact-form`
   - Description: `Service account for portfolio contact form`
4. Click "Create and Continue"
5. Skip role assignment (click "Continue")
6. Click "Done"

### Step 4: Generate Service Account Key
1. Click on the created service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Select "JSON" format
5. Download the JSON file

### Step 5: Create Environment Variables
1. Create a `.env.local` file in your project root
2. Add the following variables from your downloaded JSON file:

```env
# Google Drive API Configuration
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_DRIVE_FOLDER_ID=your_folder_id_optional
```

### Step 6: Share Google Drive Folder (Optional)
1. Create a folder in your Google Drive where you want to store contact messages
2. Right-click the folder > "Share"
3. Add your service account email (from GOOGLE_CLIENT_EMAIL) as an editor
4. Copy the folder ID from the URL and add it to GOOGLE_DRIVE_FOLDER_ID

## How It Works
- When someone submits the contact form, it sends data to `/api/contact`
- The API creates a text file with the message details
- The file is automatically saved to your Google Drive
- You'll receive all contact form submissions as organized text files

## File Format
Each submission creates a file named: `Contact_[Name]_[Timestamp].txt`

Content includes:
- Date and time of submission
- Contact person's name and email
- Subject line
- Full message content

## Security Notes
- Never commit `.env.local` to version control
- Keep your service account key secure
- The service account only has access to files it creates
- Consider setting up folder-specific permissions for better organization
