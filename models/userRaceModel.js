// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var user_race = {
    //selectAll() 
    all: function(cb) {
        orm.selectAll("USER_RACE", function(res) {
            cb(res);
        });
    },
    // The variables cols and vals are arrays.
    //insertOne()
    insert: function(cols, vals, cb) {
        orm.insertOne("USER_RACE", cols, vals, function(res) {
            cb(res);
        });
    },
    //updateOne()
    update: function(objColVals, condition, cb) {
        orm.updateOne("USER_RACE", objColVals, condition, function(res) {
            cb(res);
        });
    }
};

// Export the database functions for the controller 
module.exports = user_race;
