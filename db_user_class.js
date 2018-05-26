'user strict'
var MongoClient = require('mongodb').MongoClient;
var helper = require('./helper');
var ResultInfo = require('./models/resultInfo');
var UserInfo = require('./models/userInfo');

var tableName = "users";
var DatabaseName = helper.GetDatabaseName();
var url = helper.GetURL();

module.exports.Register = function (db, UserInfo, callback) {
    let result = new ResultInfo(false, null, '');

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

module.exports.Login= function(db, UserInfo, callback){
    let result = new ResultInfo(false, null, '');

    db.collection(tableName).findOne({username : UserInfo.username, password : UserInfo.password},function(err, res){
        if(err){
            result.setMessage('Query error!');
            callback(err, result);
        }
        else{
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