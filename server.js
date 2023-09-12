const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();

// Use the PORT from environment variable or fallback to 3000
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/front'));

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front/index.html');
});

// API Endpoint to get the data
app.get('/api/locations', (req, res) => {
  const results = [];
  fs.createReadStream('localisationdata_v1.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    })
    .on('error', (err) => {
      console.error('Error reading CSV:', err);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});