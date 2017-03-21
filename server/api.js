const express = require('express');
const multer  = require('multer');
const fs = require('fs');

const api = express.Router();
const upload = multer({ dest: 'uploads/' });

api.post('/uploadFiles', upload.array('files'), (req, res) => {
    res.sendStatus(200);
});

api.use('*', (req, res) => {
    res.sendStatus(501);
});

module.exports = api;
