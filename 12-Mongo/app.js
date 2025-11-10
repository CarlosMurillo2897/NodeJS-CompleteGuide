const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const { get404Page } = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user');

const { mongoConnect } = require('./utils/database');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false })); // Middleware to parse the body of incoming requests.

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory.

app.use((req, res, next) => {
    User.findByID('69121077e863db0a5a6cc750')
    .then(user => {
        req.user = user;
        next();
    }).catch(err => console.log(err));
});

app.use('/admin', adminRoutes); // Use the admin routes for any requests to /admin.
app.use(shopRoutes); // Use the shop routes for any requests to /shop.

app.use(get404Page);

mongoConnect(() => {
    console.log('Server is running on port 3000');
    app.listen(3000);
});