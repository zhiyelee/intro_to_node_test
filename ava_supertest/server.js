'use strict';
let express = require('express');

const app = express();

app.get('/foo', (req, res) => {
  res.json('foo from the server');
});
app.get('/foo/:id', (req, res) => {
  res.json(req.params.id);
});

module.exports = app;
