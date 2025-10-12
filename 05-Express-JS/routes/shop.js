const path = require('path');

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    // dirname is a global, the current directory of this file.
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); // Send a response to the client.
});

module.exports = router;