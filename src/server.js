const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());

app.get('/proxy', (req, res) => {
  const targetUrl = req.query.url;
  fetch(targetUrl)
    .then(response => response.text())
    .then(body => res.send(body))
    .catch(err => res.status(500).send(err));
});

app.listen(3000, () => {
  console.log('CORS Proxy running on port 3000');
});
