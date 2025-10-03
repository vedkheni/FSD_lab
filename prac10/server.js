const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up static files and view engine
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');

// Home route - list available log files
app.get('/', async (req, res) => {
    try {
        const files = await fs.readdir(logsDir);
        const logFiles = files.filter(file => file.endsWith('.txt'));
        res.render('index', { logFiles, error: null });
    } catch (error) {
        res.render('index', { logFiles: [], error: 'Unable to read logs directory' });
    }
});

// View specific log file
app.get('/logs/:filename', async (req, res) => {
    const filename = req.params.filename;

    // Security check - prevent directory traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
        return res.status(400).render('log', {
            content: null,
            filename,
            error: 'Invalid filename'
        });
    }

    const filePath = path.join(logsDir, filename);

    try {
        const content = await fs.readFile(filePath, 'utf8');
        res.render('log', { content, filename, error: null });
    } catch (error) {
        let errorMessage = 'File not found or inaccessible';

        if (error.code === 'ENOENT') {
            errorMessage = 'Log file not found';
        } else if (error.code === 'EACCES') {
            errorMessage = 'Permission denied - cannot read file';
        }

        res.status(404).render('log', {
            content: null,
            filename,
            error: errorMessage
        });
    }
});

const server = app.listen(PORT, () => {
    console.log(`Log viewer server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is busy, trying port ${PORT + 1}...`);
        const newPort = PORT + 1;
        app.listen(newPort, () => {
            console.log(`Log viewer server running on http://localhost:${newPort}`);
        });
    } else {
        console.error('Server error:', err);
    }
});