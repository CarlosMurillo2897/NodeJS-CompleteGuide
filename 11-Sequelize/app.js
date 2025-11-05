const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const { get404Page } = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const sequelize = require('./utils/database');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false })); // Middleware to parse the body of incoming requests.

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory.

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    }).catch(err => console.log(err));
});

app.use('/admin', adminRoutes); // Use the admin routes for any requests to /admin.
app.use(shopRoutes); // Use the shop routes for any requests to /shop.

app.use(get404Page);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize.
// sync({ force: true })
sync()
.then(result => {
    return User.findByPk(1);
}).then(user => {
    if (!user) {
        return User.create({ name: 'CMB', email: 'mail@mail.com',  });
    }
    return Promise.resolve(user);
}).then(user => {
    console.log(user);
    app.listen(3000);
}).catch(err => {
    console.log(err);
});