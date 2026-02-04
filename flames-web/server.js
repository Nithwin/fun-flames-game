import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// CSV File Path
const CSV_FILE = path.join(__dirname, 'secret_flames_data.csv');

// Initialize CSV if it doesn't exist
if (!fs.existsSync(CSV_FILE)) {
    fs.writeFileSync(CSV_FILE, 'ID,Date,Name1,Name2,Result\n');
    console.log(`Created new secret CSV file at: ${CSV_FILE}`);
}

// Format data for CSV
const toCSVLine = (record) => {
    // Escape quotes and wrap in quotes if necessary
    const escape = (val) => `"${String(val).replace(/"/g, '""')}"`;
    return `${escape(record.id)},${escape(record.date)},${escape(record.name1)},${escape(record.name2)},${escape(record.result)}\n`;
};

// API Endpoint to log data
app.post('/api/log', (req, res) => {
    const record = req.body;
    
    if (!record || !record.name1 || !record.name2 || !record.result) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    try {
        const csvLine = toCSVLine(record);
        fs.appendFileSync(CSV_FILE, csvLine);
        console.log(`[LOGGED] ${record.name1} & ${record.name2} -> ${record.result}`);
        res.json({ success: true, message: 'Logged to secret file' });
    } catch (error) {
        console.error('Error writing to CSV:', error);
        res.status(500).json({ error: 'Failed to log data' });
    }
});

app.listen(PORT, () => {
    console.log(`Secret Logging Server running on http://localhost:${PORT}`);
    console.log(`Data will be stored in: ${CSV_FILE}`);
});
