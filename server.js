const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const settingsFilePath = path.join(__dirname, 'settings.json');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/settings', (req, res) => {
    fs.readFile(settingsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading settings file');
        }
        res.send(JSON.parse(data));
    });
});

app.post('/settings', (req, res) => {
    fs.writeFile(settingsFilePath, JSON.stringify(req.body, null, 2), 'utf8', (err) => {
        if (err) {
            return res.status(500).send('Error saving settings');
        }
        res.send('Settings saved');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
