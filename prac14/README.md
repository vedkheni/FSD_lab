# Job Portal - Resume Upload

A simple job portal application built with Express.js that allows users to upload PDF resumes with file validation.

## Features

- PDF file upload with 2MB size limit
- File type validation (only PDF files allowed)
- Clean and responsive UI
- Real-time file selection feedback
- Uploaded resumes list with timestamps
- Error handling for invalid files

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## File Structure

```
├── server.js          # Express server with upload logic
├── package.json       # Project dependencies
├── .gitignore        # Git ignore rules
├── public/           # Static files
│   ├── index.html    # Main HTML page
│   ├── style.css     # Styling
│   └── script.js     # Client-side JavaScript
└── uploads/          # Directory for uploaded resumes (created automatically)
```

## API Endpoints

- `GET /` - Serve the main page
- `POST /upload-resume` - Upload a PDF resume
- `GET /resumes` - Get list of uploaded resumes

## File Validation

- Only PDF files are accepted
- Maximum file size: 2MB
- Files are stored with unique names to prevent conflicts