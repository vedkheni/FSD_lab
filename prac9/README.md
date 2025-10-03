# Product Site Backend

A basic Express.js server for a product site with clean, scalable architecture.

## Features

- Express.js server with static file serving
- Clean HTML/CSS frontend
- API endpoints ready for expansion
- Error handling and 404 pages
- Development and production scripts

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Or start in production mode:
   ```bash
   npm start
   ```

4. Visit `http://localhost:3000` to see the site

## Project Structure

```
├── server.js          # Main Express server
├── package.json       # Dependencies and scripts
├── public/            # Static files
│   ├── index.html     # Home page
│   ├── styles.css     # Simple, clean CSS
│   └── 404.html       # Error page
└── README.md          # This file
```

## API Endpoints

- `GET /` - Home page
- `GET /api/health` - Health check endpoint

## Next Steps

This foundation is ready for your team to add:
- More routes and pages
- Database integration
- Authentication
- Product catalog features
- Admin dashboard