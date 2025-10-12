# Tuition Admin Panel

A simple admin panel for managing tuition class students built with Node.js, Express.js, and MongoDB.

## Features

- **Add Students**: Create new student records with name, email, phone, grade, subject, and fees status
- **View Students**: Display all students in a clean table format
- **Edit Students**: Update existing student information
- **Delete Students**: Remove student records with confirmation
- **Fees Tracking**: Track payment status for each student
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating, vanilla CSS/JavaScript
- **Features**: CRUD operations, form validation, error handling

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure MongoDB is running on your system
4. Start the server:
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000`

## API Endpoints

### Web Routes
- `GET /` - View all students
- `GET /add` - Add student form
- `POST /add` - Create new student
- `GET /edit/:id` - Edit student form
- `PUT /edit/:id` - Update student
- `DELETE /delete/:id` - Delete student

### API Routes
- `GET /api/students` - Get all students (JSON)
- `GET /api/students/:id` - Get single student (JSON)
- `POST /api/students` - Create student (JSON)
- `PUT /api/students/:id` - Update student (JSON)
- `DELETE /api/students/:id` - Delete student (JSON)

## Student Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required),
  grade: String (required),
  subject: String (required),
  feesPaid: Boolean (default: false),
  joiningDate: Date (default: now),
  timestamps: true
}
```

## Usage

1. **Adding Students**: Click "Add Student" button and fill in the form
2. **Viewing Students**: All students are displayed on the home page
3. **Editing Students**: Click "Edit" button next to any student
4. **Deleting Students**: Click "Delete" button (requires confirmation)
5. **API Access**: Use the `/api/students` endpoints for programmatic access

## Development

The application uses:
- EJS for server-side rendering
- Method-override for PUT/DELETE requests in forms
- Mongoose for MongoDB interactions
- Simple CSS for styling
- Client-side JavaScript for form validation and UX enhancements