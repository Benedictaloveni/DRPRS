const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Load activities
app.get('/activities', (req, res) => {
    const activitiesPath = path.join(__dirname, 'activities.json');
    fs.readFile(activitiesPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json([]);
        }
        res.json(JSON.parse(data || '[]'));
    });
});

// Add activity
app.post('/add-activity', (req, res) => {
    const newActivity = req.body;
    const activitiesPath = path.join(__dirname, 'activities.json');
    fs.readFile(activitiesPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Gagal membaca file' });
        }

        const activities = JSON.parse(data || '[]');
        activities.push(newActivity);

        fs.writeFile(activitiesPath, JSON.stringify(activities, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Gagal menyimpan file' });
            }
            res.status(200).json({ message: 'Aktivitas berhasil ditambahkan' });
        });
    });
});

// Delete activity
app.delete('/delete-activity', (req, res) => {
    const activityToDelete = req.body;
    const activitiesPath = path.join(__dirname, 'activities.json');
    fs.readFile(activitiesPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Gagal membaca file' });
        }

        let activities = JSON.parse(data || '[]');
        activities = activities.filter(activity => 
            activity.jenis !== activityToDelete.jenis || 
            activity.hari !== activityToDelete.hari || 
            activity.waktu !== activityToDelete.waktu
        );

        fs.writeFile(activitiesPath, JSON.stringify(activities, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Gagal menyimpan file' });
            }
            res.status(200).json({ message: 'Aktivitas berhasil dihapus' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
