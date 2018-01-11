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
    },
    chartSelectedInfo: function(conCols, conds, cb){
        orm.selectAllwTwoCon("USERRACE_HISTORY", conCols[0], conds[0], conCols[1], conds[1], function(res){
            var results = {'x':[],'y':[]};
            for (i in data) {
                results.x.push(data[i].activityDt);
                results.y.push(data[i].distance);
            }
            cb(results);
        })
    }
};

// Export the database functions for the controller 
module.exports = userRace_history;