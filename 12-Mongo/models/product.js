const mongodb = require('mongodb');
const { getDB } = require('../utils/database');

class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        const db = getDB();
        return db.collection('products')
            .insertOne(this)
            .then(result => {
                console.log(result);
            }).catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDB();
        return db.collection('products')
            .find() // Returns cursor.
            .toArray()
            .then(products => {
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findByID(productID) {
        const db = getDB();
        return db.collection('products')
            .find({ _id: new mongodb.ObjectId(productID) })
            .next()
            .then(product => {
                return product;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Product;