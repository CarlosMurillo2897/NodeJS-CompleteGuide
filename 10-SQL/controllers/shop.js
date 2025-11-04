const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    });
};

exports.getProduct = (req, res, next) => {
    const { productID } = req.params;
    Product.findById(productID, (product) => {
        res.render('shop/product-detail', {
            product,
            path: '/products',
            pageTitle: product.title,
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
};

exports.getCart = (req, res, next) => {
    Cart.getProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (let product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: cartProducts
            });
        });
    });
};

exports.postCart = (req, res, next) => {
    const { productID } = req.body;
    Product.findById(productID, product => {
        Cart.addProduct(productID, product.price);
    });
    res.redirect('/cart');  
};

exports.postCartDeleteProduct = (req, res, next) => {
    const { productID } = req.body;
    Product.findById(productID, product => {
        Cart.deleteProduct(productID, product.price);
        res.redirect('/cart');
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
};


exports.getOrders = (req, res, next) => {
    res.render('shop/Orders', {
        pageTitle: 'Your Orders',
        path: '/orders'
    });
};