# Express.js App Template

A clean, simple Express.js application template for team projects with a dashboard home page.

## Features

- Express.js server setup
- Static file serving
- Clean project structure
- Responsive CSS styling
- Dashboard home page at `/home`
- Development and production scripts

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Visit your app:
   - Main dashboard: http://localhost:3000/home
   - Root redirects to dashboard: http://localhost:3000

## Project Structure

```
├── app.js              # Main application file
├── package.json        # Project dependencies and scripts
├── views/
│   └── home.html      # Dashboard home page
├── public/
│   └── css/
│       └── style.css  # Application styles
└── README.md          # This file
```

## Scripts

- `npm start` - Run the production server
- `npm run dev` - Run with nodemon for development (auto-restart)

## Customization

- Modify `views/home.html` to change the dashboard content
- Update `public/css/style.css` for styling changes
- Add new routes in `app.js`
- Add static assets to the `public/` directory

## Next Steps

This template provides a solid foundation for building web applications. You can:

- Add authentication middleware
- Connect to a database
- Add API routes
- Implement user management
- Add more pages and features

Happy coding! 🚀