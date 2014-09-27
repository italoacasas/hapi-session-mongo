#!/usr/bin/env node

var bcrypt = require('bcrypt');

var Mongo = require('mongodb'),
    Db = Mongo.Db,
    Server = Mongo.Server;

var server = new Server('127.0.0.1', 27017, {ssl: true}),
    db = new Db('test', server, {w: 1});

db.open(function(err, db) {
    if (err) {
        return err;
    }

    db.createCollection('users', function(err, collection) {
        if (err) {
            db.close();
            return err;
        }

        bcrypt.hash('test123', 10, function(err, hash) {
            if (err) {
                db.close();
                return err;
            }

            collection.insert([{_id: 'test@test.com', local: {name: 'test@test.com', pwd: hash}}],
            function(err, data) {
                if (err) {
                    db.close();
                    return err;
                }

                db.close();
                return data;
            });
        });
    });
});
