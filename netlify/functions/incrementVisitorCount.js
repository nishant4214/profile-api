const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const filePath = path.join(__dirname, '../../visitorCount.json');
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return resolve({ statusCode: 500, body: JSON.stringify({ error: 'Error reading file' }) });
      }
      const countData = JSON.parse(data);
      countData.count += 1;

      fs.writeFile(filePath, JSON.stringify(countData), (err) => {
        if (err) {
          return resolve({ statusCode: 500, body: JSON.stringify({ error: 'Error writing file' }) });
        }
        resolve({ statusCode: 200, body: JSON.stringify(countData) });
      });
    });
  });
};
