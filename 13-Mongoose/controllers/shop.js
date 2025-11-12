const Product = require('../models/product');
// const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product
        .fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            });
        }).catch( err => console.log(err) );
};

exports.getProduct = (req, res, next) => {
    const { productID } = req.params;
    Product.findByID(productID)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                path: '/products',
                pageTitle: product.title,
            });
        }).catch( err => console.log(err) );
};

exports.getIndex = (req, res, next) => {
    Product
        .fetchAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        }).catch( err => console.log(err) );
};

exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(products => {
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products
            });
        }).catch(err => {
            console.log(err);
        });
};

exports.postCart = (req, res, next) => {
    const { productID } = req.body;
    Product.findByID(productID)
        .then(product => {
            return req.user.addToCart(product);
        }).then(_ => {
            res.redirect('/cart');
        }).catch(err => {
            console.log(err);
        });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const { productID } = req.body;
    req.user.deleteItemFromCart(productID)
        .then(_ => {
            res.redirect('/cart');
        }).catch( err => {
            console.log(err);
        });
};

exports.postOrder = (req, res, next) => {
    req.user.addOrder()
        .then(_ => {
            res.redirect('/orders');
        }).catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    req.user.getOrders()
        .then(orders => {
            res.render('shop/orders', {
                pageTitle: 'Your Orders',
                path: '/orders',
                orders
            });
        }).catch(err => console.log(err));
};