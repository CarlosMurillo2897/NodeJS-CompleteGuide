const path = require('path');

const express = require('express');
const rootDir = require('../utils/path');
const router = express.Router();

router.get('/', (req, res, next) => {
    // dirname is a global, the current directory of this file.
    res.sendFile(path.join(rootDir, 'views', 'shop.html')); // Send a response to the client.
});

module.exports = router;