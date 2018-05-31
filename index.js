'use strict'
var cors = require('cors');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;

var userClass = require('./db_user_class');
var guideClass = require('./db_guide_class');
var helper = require('./helper');
var UserInfo = require('./models/userInfo');
var ResultInfo = require('./models/resultInfo');

var mongoURL = helper.GetURL();
var databaseName = helper.GetDatabaseName();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));


mongoClient.connect(mongoURL, { useNewUrlParser: true }, function (err, db) {
    if (err) {
        throw 'Error connecting to database - ' + err;
    }

    var dbo = db.db(databaseName);

    app.post('/api/register', function (request, response, next) {
        //console.log('register');
        next()
    }, function (request, response, next) {

        if (!request.body) {
            response.status(400).send("Please send user information!");
        }
        else {

            //console.log(request.body);

            if (!request.body.username || !request.body.fullname || !request.body.password) {

                let resultInfo = new ResultInfo(false, null, 'Please send user information!', 0);

                response.status(400).send(resultInfo);
            }
            else {
                let userInfo = new UserInfo(request.body.username, request.body.fullname, request.body.password);

                userClass.Register(dbo, userInfo, function (err, result) {
                    if (err) {
                        response.status(500).send(result);
                    }
                    else {
                        response.status(201).send(result);
                    }
                })
            }
        }
    });

    app.post('/api/login', function (request, response, next) {
        //console.log('login');
        next()
    }, function (request, response, next) {

        if (!request.body) {
            response.status(400).send("Please send user information!");
        }
        else {
            if (!request.body.username || !request.body.password) {
                let resultInfo = new ResultInfo(false, null, 'Please send user information!', 0);
                response.status(400).send(resultInfo);
            }
            else {
                let userInfo = new UserInfo(request.body.username, '', request.body.password);

                userClass.Login(dbo, userInfo, function (err, result) {
                    if (err) {
                        response.status(500).send(result);
                    }
                    else {
                        response.status(201).send(result);
                    }
                });
            }
        }
    });

    app.get('/api/users', function (request, response, next) {
        //console.log('users');
        next()
    }, function (request, response, next) {

        if (!request.query["page_number"] || !request.query["record_for_page"]) {
            response.status(400).send("Parameter is missing!");
        }
        else {
            let page_number = request.query["page_number"];
            let record_for_page = request.query["record_for_page"];

            userClass.GetUsers(dbo, page_number, record_for_page, request, response, function (err, res) {
                if (err) {
                    response.status(500).send(res);
                }
                else {
                    response.status(201).send(res);
                }
            });
        }
    });

    app.get('/api/guide', function (request, response, next) {
        next()
    }, function (request, response, next) {
        if (!request.query["page_number"] || !request.query["record_for_page"]) {
            response.status(400).send("Parameter is missing!");
        }
        else {
            let page_number = request.query["page_number"];
            let record_for_page = request.query["record_for_page"];

            guideClass.GetUsersGuides(dbo, page_number, record_for_page, request, response, function (err, res) {
                if (err) {
                    response.status(500).send(res);
                }
                else {
                    response.status(201).send(res);
                }
            });
        }
    });

    app.post('/api/guide', function (request, response, next) {
        next()
    }, function (request, response, next) {
        if (!request.body) {
            response.status(400).send("Please send user information!");
        }
        else {
            if (!request.body.fullname || !request.body.address || !request.body.user_id) {
                let resultInfo = new ResultInfo(false, null, 'Please send user information!', 0);
                response.status(400).send(resultInfo);
            }
            else {
                let guideInfo = new GuideInfo(request.body.fullname, request.body.address, request.body.user_id);

                guideClass.InsertGuide(dbo, guideInfo, function (err, result) {
                    if (err) {
                        response.status(500).send(result);
                    }
                    else {
                        response.status(201).send(result);
                    }
                });
            }
        }
    });

    app.listen(3000, function () {
        console.log('Listening on port 3000');
    });
});