const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/groupMeetings', { useNewUrlParser: true, useUnifiedTopology: true });

// Meeting Schema
const meetingSchema = new mongoose.Schema({
    jenis: String,
    hari: String,
    waktu: String
});

const Meeting = mongoose.model('Meeting', meetingSchema);

// Routes
app.post('/meetings', (req, res) => {
    const newMeeting = new Meeting(req.body);
    newMeeting.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Meeting added successfully');
        }
    });
});

app.get('/meetings', (req, res) => {
    Meeting.find({}, (err, meetings) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(meetings);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
