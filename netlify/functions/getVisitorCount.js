const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const filePath = path.join(__dirname, '../../visitorCount.json');
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return resolve({ statusCode: 500, body: JSON.stringify({ error: 'Error reading file' }) });
      }
      resolve({ statusCode: 200, body: data });
    });
  });
};
