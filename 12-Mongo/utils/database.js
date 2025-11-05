const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => MongoClient
    .connect('mongodb+srv://cmb2808:root@common.b7p2yss.mongodb.net/?appName=common?retryWrites=true')
    .then(client => {
        console.log('Connected');
        callback(client);
    }).catch(err => console.log(err));

module.exports = mongoConnect;