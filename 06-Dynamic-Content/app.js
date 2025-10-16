const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')

const app = express();

// TODO: Install ejs, pug, express-handlebars
app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false })); // Middleware to parse the body of incoming requests.

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory.

app.use('/admin', adminData.routes); // Use the admin routes for any requests to /admin.
app.use(shopRoutes); // Use the shop routes for any requests to /shop.

app.use((req, res, next) => {
    res.status(404)
        .render('404', {
            pageTitle: 'Page Not Found'
        }); // Send a response to the client.
});

app.listen(3000);