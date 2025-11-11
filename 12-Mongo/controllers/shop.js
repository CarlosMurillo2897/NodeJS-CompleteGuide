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
        .then(cart => {
            return cart.getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        pageTitle: 'Your Cart',
                        path: '/cart',
                        products
                    });
                });
        }).catch(err => console.log(err));
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
    // let fetchedCart;
    // let newQuantity = 1;

    // req.user.getCart()
    //     .then(cart => {
    //         fetchedCart = cart;
    //         return cart.getProducts({ where: { id: productID } })
    //     }).then(products => {
    //         let product;
    //         if(products.length > 0) {
    //             product = products[0];
    //         }
    //         if(product) {
    //             const oldQuantity = product.cartItem.quantity;
    //             newQuantity = oldQuantity + 1;
    //             return product;
    //         }
    //         return Product.findByPk(productID);
    //     }).then(product => {
    //         return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
    //     }).then(() => {
    //         res.redirect('/cart');
    //     }).catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const { productID } = req.body;
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: productID } });
        }).then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        }).then(_ => {
            res.redirect('/cart');
        }).catch( err => console.log(err) );
};

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        }).then(products => {
            return req.user.createOrder()
                .then(order => {
                    return order.addProducts(products.map(product => {
                        product.orderItem = { quantity: product.cartItem.quantity };
                        return product;
                    }));
                }).catch(err => console.log(err));
        }).then(_ => {
            return fetchedCart.setProducts(null);
        }).then(_ => {
            res.redirect('/orders');
        }).catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    req.user.getOrders({ include: ['products'] })
        .then(orders => {
            res.render('shop/orders', {
                pageTitle: 'Your Orders',
                path: '/orders',
                orders
            });
        }).catch(err => console.log(err));
};