const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = 3000;

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
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});