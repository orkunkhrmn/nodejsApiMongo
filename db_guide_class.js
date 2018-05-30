'use strict'
var helper = require('./helper');
var MongoClient = require('mongodb').MongoClient;

var tableName = "guides";
var databaseName = helper.GetDatabaseName();
var url = helper.GetURL();

var objectId = require('mongodb').ObjectId;

var ResultInfo = require('./models/resultInfo');

module.exports.GetUsersGuides = function (db, user_id, page_number, record_for_page, require, response, callback) {

    let result = new ResultInfo(false, null, '', 0);

    record_for_page = record_for_page * 1;
    let skips = record_for_page * (page_number - 1);

    let totalRecord = 0;

    db.collection(tableName).find({ user_id: objectId(user_id) }).count(function (err_c, res_c) {
        if (err_c) {
            result.setData(null);
            result.setMessage('Query error!');
            result.setSuccess(false);

            callback(err_c, result);
        }
        else {
            totalRecord = res_c;
            db.collection(tableName).find({ user_id: objectId(user_id) }).skip(skips).limit(record_for_page).toArray(function (err_q, res_q) {
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
                    result.setTotalRecord(total_record);

                    callback(null, result);
                }
            })
        }
    })

}