const { MongoClient } = require('mongodb');
require('dotenv').config();

// .ENV
let host = process.env.HOST;
let port = process.env.PORT;
let dbname = process.env.DB_NAME;

let dbConnection;
module.exports = {
    connection: function(cb) {
        MongoClient.connect(`${host}:${port}/${dbname}`)
        .then(client => {
            dbConnection = client.db();
            return cb()
        }).catch(error => {
            console.log(error);
            return cb(error)
        })
    },

    getDatabase: () => dbConnection
}