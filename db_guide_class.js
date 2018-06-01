'use strict'
var helper = require('./helper');
var MongoClient = require('mongodb').MongoClient;

var tableName = "guides";
var databaseName = helper.GetDatabaseName();
var url = helper.GetURL();

var objectId = require('mongodb').ObjectId;

var ResultInfo = require('./models/resultInfo');

module.exports.GetUsersGuides = function (db, user_id, page_number, record_for_page, request, response, callback) {

    let result = new ResultInfo(false, null, '', 0);

    record_for_page = record_for_page * 1;
    let skips = record_for_page * (page_number - 1);

    let totalRecord = 0;

    db.collection(tableName).find({ user_id: user_id }).count(function (err_c, res_c) {
        if (err_c) {
            result.setData(null);
            result.setMessage('Query error!');
            result.setSuccess(false);

            callback(err_c, result);
        }
        else {
            totalRecord = res_c;
            db.collection(tableName).find({ user_id: user_id }).skip(skips).limit(record_for_page).toArray(function (err_q, res_q) {
                if (err_q) {
                    result.setData(null);
                    result.setMessage('Query error!');
                    result.setSuccess(false);

                    callback(err_q, result);
                }
                else {
                    result.setSuccess(true);
                    result.setMessage('Success');
                    result.setData(res_q);
                    result.setTotalRecord(totalRecord);

                    callback(null, result);
                }
            })
        }
    })

}

module.exports.InsertGuide = function (db, guideInfo, request, response, callback) {
    let result = new ResultInfo(false, null, '', 0);

    db.collection(tableName).insertOne(guideInfo, function (err, res) {
        if (err) {
            result.setMessage('Insert error!');
            callback(err, result);
        }
        else {
            result.setSuccess(true);
            result.setMessage('Success!');
            callback(null, result);
        }
    })
}

module.exports.UpdateGuide = function (db, guideInfo, request, response, callback) {
    let result = new ResultInfo(false, null, '', 0);

    let updateQuery = { _id: objectId(guideInfo._id) };

    let newValues = { $set: { fullname: guideInfo.fullname, address: guideInfo.address } };

    db.collection(tableName).updateOne(updateQuery, newValues, function (err, res) {
        if (err) {
            result.setMessage('Update error!');
            callback(err, result);
        }
        else {
            result.setSuccess(true);
            result.setMessage('Success!');

            callback(null, result);

            //console.log(res.result.nModified);
        }
    })
}

module.exports.GetGuideByID = function (db, _id, request, response, callback) {
    let result = new ResultInfo(false, null, '', 0);

    db.collection(tableName).findOne({ _id: objectId(_id) }, function (err, res) {
        if (err) {
            result.setMessage('Query error!');
            callback(err, result)
        }
        else {
            result.setSuccess(true);
            result.setData(res);
            result.setMessage('Success!');

            callback(null, result);
        }
    });
}

module.exports.DeleteGuideByID = function (db, _id, request, response, callback) {
    let result = new ResultInfo(false, null, '', 0);

    let query = { _id: objectId(_id) };

    db.collection(tableName).deleteOne(query, function (err, res) {
        if (err) {
            result.setMessage('Query error!');
            callback(err, result)
        }
        else {
            result.setSuccess(true);
            result.setData(null);
            result.setMessage('Success!');

            callback(null, result);
        }
    });
}