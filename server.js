const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express(); 
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const filePath = path.join(__dirname, 'visitorCount.json');
app.get('/api/visitor-count', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }
    res.json(JSON.parse(data));
  });
});
app.post('/api/visitor-count', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }
    const countData = JSON.parse(data);
    countData.count = countData.count + 1; // Increment the count

    fs.writeFile(filePath, JSON.stringify(countData), (err) => {
      if (err) {
        return res.status(500).send('Error writing file');
      }
      res.json(countData);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
