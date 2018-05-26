'use strict'
var cors = require('cors');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;

var userClass = require('./db_user_class');
var helper = require('./helper');

var mongoURL = helper.GetURL();
var databaseName = helper.GetDatabaseName();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));

mongoClient.connect(mongoURL, { useNewUrlParser: true } , function (err, db) {
    if (err) {
        throw 'Error connecting to database - ' + err;
    }

    var dbo = db.db(databaseName);

    app.post('/api/register', function (request, response) {

        if (!request.body) {
            response.status(400).send("Please send user information!");
        }
        else {
            let userInfo = request.body;
            userClass.Register(dbo, userInfo, function (err, result) {
                if (err) {
                    response.status(500).send(result);
                }
                else {
                    response.status(201).send(result);
                }
            })
        }
    });

    app.post('/api/login',function(request, response){
        if (!request.body) {
            response.status(400).send("Please send user information!");
        }
        else {
            let userInfo = request.body;

            userClass.Login(dbo, userInfo, function (err, result) {
                if (err) {
                    response.status(500).send(result);
                }
                else {
                    response.status(201).send(result);
                }
            })
        }
    });

    app.listen(3000, function () {
        console.log('Listening on port 3000');
    });
});