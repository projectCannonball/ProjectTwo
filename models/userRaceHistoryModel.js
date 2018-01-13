// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");
var pool = require("../config/connection.js");

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
            for (i in res) {
                results.x.push(res[i].activityDt);
                results.y.push(res[i].distance);
            }
            cb(results);
        })
    },
    //gets the total distances user covered
    getTotalDistance: function(userId, cb){
        orm.sumCol("USERRACE_HISTORY", "distance", "user_id", userId, function(result){
            cb(result);
        });
    },
    //get sum stats of selected race for a given user
    getSumStatsOfRaceUser: function(userId, raceId, cb){
        pool.getConnection().then(function(connection){
            connection.query("SELECT sum(urh.distance) as totDistance, sum(urh.time) as totTime, r.distance- sum(urh.distance) as distRemaining, "+
            "sum(urh.distance)/sum(urh.time) as avgSpeed, sum(urh.time)/sum(urh.distance) as avgPace "+
            "FROM userRace_History urh INNER JOIN races r ON urh.race_id = r.id WHERE user_id = ? AND race_id = ?;", [userId, raceId], function(error, results){
                if(error) throw error;

                pool.closeConnection(connection);

                cb(results[0]);
            });
        });
    }
};

// Export the database functions for the controller 
module.exports = userRace_history;