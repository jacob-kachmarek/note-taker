const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('error', err);
        } else {
            const parsedData = JSON.parse(data)
            res.json(parsedData);
        }
    })
})
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('error', err);
        } else {
            const parsedData = JSON.parse(data)
            parsedData.push(newNote)
            fs.writeFile('./db/db.json', JSON.stringify(parsedData, null), (err) => {
                if (err) {
                    console.log('error', err);
                } else {
                    res.json(parsedData);
                }
            })
        }
    })
})
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);