const mongodb = require('mongodb');
const { getDB } = require('../utils/database');

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
    }

    save() {
        const db = getDB();
        return db.collection('users').insertOne(this);
    }

    static findByID(userId) {
        const db = getDB();
        return db.collection('users')
            .find({ _id: new ObjectId(userId) })
            .next()
            .then(user => {
                console.log(user);
                return user;
            }).catch(error => {
                console.log(error);
            });
    }
}
module.exports = User;