const express = require('express');
const api = require('./api');

const server = express();

server.use('/api', api);

server.use('*', (req, res) => {
  res.sendStatus(404);
});

server.listen(4000, function () {
  console.log('Mock server started on port 4000!');
});
