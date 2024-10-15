const express = require('express');
const { handler: getVisitorCount } = require('./netlify/functions/getVisitorCount');
const { handler: incrementVisitorCount } = require('./netlify/functions/incrementVisitorCount');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/getVisitorCount', getVisitorCount);
app.post('/api/incrementVisitorCount', incrementVisitorCount);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
