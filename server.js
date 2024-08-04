const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;

// Path ke file JSON
const filePath = path.join(__dirname, 'activities.json');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(__dirname));

// Endpoint untuk menangani pengiriman data
app.post('/submit', (req, res) => {
    const { jenis, hari, waktu } = req.body;

    // Membaca file JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error membaca file JSON:', err);
            return res.status(500).send('Error membaca file JSON');
        }

        // Parsing data JSON
        const activities = JSON.parse(data);

        // Menambahkan data baru
        activities.push({ jenis, hari, waktu });

        // Menyimpan kembali data ke file JSON
        fs.writeFile(filePath, JSON.stringify(activities, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error menulis ke file JSON:', err);
                return res.status(500).send('Error menulis ke file JSON');
            }
            res.send('Data received and saved successfully!');
        });
    });
});

// Endpoint untuk mengambil data
app.get('/activities', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error membaca file JSON:', err);
            return res.status(500).send('Error membaca file JSON');
        }
        res.json(JSON.parse(data));
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

