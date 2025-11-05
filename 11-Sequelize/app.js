const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const { get404Page } = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const db = require('./utils/database');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false })); // Middleware to parse the body of incoming requests.

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory.

app.use('/admin', adminRoutes); // Use the admin routes for any requests to /admin.
app.use(shopRoutes); // Use the shop routes for any requests to /shop.

app.use(get404Page);

app.listen(3000);