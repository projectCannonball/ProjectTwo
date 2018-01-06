// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var user = {
    //selectAll() 
    all: function(cb) {
        orm.selectAll("USERS", function(res) {
            cb(res);
        });
    },
    // The variables cols and vals are arrays.
    //insertOne()
    insert: function(cols, vals, cb) {
        orm.insertOne("USERS", cols, vals, function(res) {
            cb(res);
        });
    },
    //updateOne()
    update: function(objColVals, condition, cb) {
        orm.updateOne("USERS", objColVals, condition, function(res) {
            cb(res);
        });
    }
};

// Export the database functions for the controller 
module.exports = user;
