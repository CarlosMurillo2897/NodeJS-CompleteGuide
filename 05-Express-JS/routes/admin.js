const path = require('path');

const express = require('express');
const rootDir = require('../utils/path');
const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html')); // Send a response to the client.
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/'); // Redirect to another route.
});

module.exports = router;