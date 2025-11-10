const mongodb = require('mongodb');
const { getDB } = require('../utils/database');

class Product {
    constructor(title, imageUrl, description, price, id, userID) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userID = userID;
    }

    save() {
        const db = getDB();
        let dbOp;
        if(this._id) {            
            // Update the product.
            dbOp = db.collection('products')
            .updateOne({ _id: this._id }, { $set: this });
        } else {
            dbOp = db.collection('products')
                .insertOne(this);
        }
        return dbOp
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
    static deleteByID(productID) {
        const db = getDB();
        return db.collection('products')
            .deleteOne({ _id: new mongodb.ObjectId(productID) })
            .then(_ => {
                console.log('Deleted');
            }).catch(err => {
                console.log(err);
            });
    }
}

module.exports = Product;