'user strict'
var MongoClient = require('mongodb').MongoClient;
var helper = require('./helper');
var ResultInfo = require('./models/resultInfo');
var UserInfo = require('./models/userInfo');

var tableName = "users";
var DatabaseName = helper.GetDatabaseName();
var url = helper.GetURL();

module.exports.Register = function (db, UserInfo, callback) {
    let result = new ResultInfo(false, null, '', 0);

    checkUsername(db, UserInfo.username, function (err_q, result_q) {
        if (err_q) {
            callback(err_q, result_q);
        }
        else {
            if (result_q.getSuccess() == false) { 
                callback(err_q, result_q);
            }
            else {
                db.collection(tableName).insertOne(UserInfo, function (ins_err, ins_res) {
                    if (ins_err) {
                        result.setMessage('Insert error!');
                        callback(ins_err, result)
                    } else {
                        result.setSuccess(true);
                        result.setMessage('Success!');

                        callback(null, result);
                    }
                });
            }
        }
    });
};

module.exports.Login = function (db, UserInfo, callback) {
    let result = new ResultInfo(false, null, '', 0);

    db.collection(tableName).findOne({ username: UserInfo.username, password: UserInfo.password }, function (err, res) {
        if (err) {
            result.setMessage('Query error!');
            callback(err, result);
        }
        else {
            if (res != '' && res != null) {
                result.setSuccess(true);
                result.setMessage('Success');
                result.setData(res);
                callback(null, result);
            } else {
                result.setSuccess(false);
                result.setData(null);
                result.setMessage('User can not found!');
                callback(null, result);
            }
        }
    });
};

module.exports.GetUsers = function (db, page_number, record_for_page, request, response, callback) {
    let result = new ResultInfo(false, null, '', 0);

    record_for_page = record_for_page * 1;
    let skips = record_for_page * (page_number - 1);

    let total_record = 0;

    db.collection(tableName).find({}).count(function (err_c, res_c) {
        if (err_c) {
            result.setData(null);
            result.setMessage('Query error!');
            result.setSuccess(false);

            callback(err_c, result);
        }
        else {
            total_record = res_c;

            db.collection(tableName).find({}).skip(skips).limit(record_for_page).toArray(function (err_q, res_q) {
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
            });
        }
    });
};

const checkUsername = function (db, username, callback) {
    let result = new ResultInfo(false, null, '');

    db.collection(tableName).findOne({ username: username }, function (err, res) {
        if (err) {
            result.setMessage('Query error!');
            callback(err, result);
        } else {
            if (res != null && res != '') {
                result.setMessage('Username has taken!');
                callback(null, result);
            }
            else {
                result.setSuccess(true);
                result.setMessage('Username is avaible.');
                callback(err, result);
            }
        }
    });
}