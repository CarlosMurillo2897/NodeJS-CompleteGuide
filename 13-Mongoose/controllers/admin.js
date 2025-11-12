const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, description, price } = req.body;
    const product = new Product({ title, imageUrl, description, price });
    product.save()
        .then(_ => {
            console.log('Created Product');
            res.redirect('/admin/products');
        }).catch(err => {
            console.log(err);
        });
}; 

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const { productID } = req.params;
    Product.findById(productID)
    // Product.findByPk(productID)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product
            });
        }).catch(err => {
            console.log(err);
        });
};

exports.postEditProduct = (req, res, next) => {
    const {
        productID,
        title, 
        price, 
        imageUrl,
        description, 
    } = req.body;
    Product.findById(productID)
        .then(product => {
            product.title = title;
            product.imageUrl = imageUrl;
            product.description = description;
            product.price = price;
            return product.save()
        }).then(
            _ => {
                console.log('Product Updated');
                res.redirect('/admin/products');
            }
        ).catch(err => {
            console.log(err);
        });
};

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        }).catch(err => {
            console.log(err);
        });
};

exports.postDeleteProduct = (req, res, next) => {
    const { productID } = req.body;
    Product.findByIdAndRemove(productID)
        .then( _ => {
            console.log('Product Deleted');
            res.redirect('/admin/products');
        }).catch(err => {
            console.log(err);
        });
}