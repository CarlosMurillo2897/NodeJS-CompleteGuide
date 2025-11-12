const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { get404Page } = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false })); // Middleware to parse the body of incoming requests.

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory.

// app.use((req, res, next) => {
//     User.findByID('69121077e863db0a5a6cc750')
//     .then(user => {
//         req.user = new User(user.name, user.email, user.cart, user._id);
//         next();
//     }).catch(err => console.log(err));
// });

app.use('/admin', adminRoutes); // Use the admin routes for any requests to /admin.
app.use(shopRoutes); // Use the shop routes for any requests to /shop.

app.use(get404Page);

mongoose.connect(
    'mongodb+srv://cmb2808:root@common.b7p2yss.mongodb.net/shop?appName=common?retryWrites=true'
).then(_ => {
    console.log('Server is running on port 3000');
    app.listen(3000);
}).catch(err => {
    console.log(err);
});