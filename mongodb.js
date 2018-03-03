'use strict'

const mongoClient   = require('mongodb').MongoClient;
const assert        = require('assert');

class MongoDB {
    constructor (url, database, collection) {
        this.url = url;
        this.database = database;
        this.collection = collection;
        this.db = {};
        return this;
    }

    connect () {
        return new Promise((resolve, reject) => {
            // Use connect method to connect to the server
            mongoClient.connect(this.url, (err, client) => {
                if (err) {
                    reject(err);
                }
                assert.equal(null, err);
                this.db = client.db(this.database);
                resolve(this);
            });
        });
    }

    findUser(user, password) {
        return new Promise((resolve, reject) => {
            this.db.collection(this.collection).find({user: user, password: password}).toArray((err, docs) => {
                if (err) {
                    reject(err);
                }
                assert.equal(err, null);
                resolve(docs);
            });
        });
    }
}

module.exports = MongoDB;