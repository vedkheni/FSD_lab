# Log Viewer

A simple Express.js application for viewing error logs through a web browser. This tool helps developers debug issues without needing direct server access.

## Features

- Browse available log files
- View log file contents with syntax highlighting
- Error handling for missing or inaccessible files
- Responsive design
- Security protection against directory traversal attacks

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## Usage

1. Place your `.txt` log files in the `logs/` directory
2. Open your browser and navigate to `http://localhost:3000`
3. Click on any log file to view its contents

## Project Structure

```
├── logs/           # Directory for log files
├── public/         # Static files (CSS)
├── views/          # EJS templates
├── server.js       # Main application file
└── package.json    # Dependencies and scripts
```

## Security

- Prevents directory traversal attacks
- Only allows access to `.txt` files in the logs directory
- Proper error handling for file access issues