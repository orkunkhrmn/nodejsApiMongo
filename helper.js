'use strict'
var DatabaseName = "AddressBook";
var URL = "mongodb://localhost:27017/" + DatabaseName;

module.exports.GetURL = function () {
    return URL;
}

module.exports.GetDatabaseName = function () {
    return DatabaseName;
}