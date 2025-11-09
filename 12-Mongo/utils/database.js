const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
// TODO: Use .env variables to hide credentials.
const mongoConnect = callback => MongoClient
    .connect('mongodb+srv://cmb2808:root@common.b7p2yss.mongodb.net/?appName=common?retryWrites=true')
    .then(client => {
        console.log('Connected');
        _db = client.db();
        callback();
    }).catch(err => {
        console.log(err);
        throw err;
    });

const getDB = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;