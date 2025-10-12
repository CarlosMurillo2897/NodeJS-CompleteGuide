const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false })); // Middleware to parse the body of incoming requests.

app.use('/admin', adminRoutes); // Use the admin routes for any requests to /admin.
app.use(shopRoutes); // Use the shop routes for any requests to /shop.

app.use((req, res, next) => {
    res.status(404)
        .sendFile(path.join(__dirname, 'views', '404.html')); // Send a response to the client.
});

app.listen(3000);