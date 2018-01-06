// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var userRace_history = {
    //selectAll() 
    all: function(cb) {
        orm.selectAll("USERRACE_HISTORY", function(res) {
            cb(res);
        });
    },
    // The variables cols and vals are arrays.
    //insertOne()
    insert: function(cols, vals, cb) {
        orm.insertOne("USERRACE_HISTORY", cols, vals, function(res) {
            cb(res);
        });
    },
    //updateOne()
    update: function(objColVals, condition, cb) {
        orm.updateOne("USERRACE_HISTORY", objColVals, condition, function(res) {
            cb(res);
        });
    }
};

// Export the database functions for the controller 
module.exports = userRace_history;