// index.js
const express = require('express');
const app = express();
const port = 5000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to handle the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
