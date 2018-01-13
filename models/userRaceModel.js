// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");
var pool = require("../config/connection.js");

var user_race = {
    //selectAll() 
    all: function(cb) {
        orm.selectAll("USER_RACE", function(res) {
            cb(res);
        });
    },
    //selectOne()
    selectOne: function(cb) {
        orm.selectOne("USER_RACE", "status", condition, function(res){
            cb(res);
        });
    },
    // The variables cols and vals are arrays.
    //insertOne()
    insert: function(userId, raceId, cb) {
        pool.getConnection().then(function(connection){
            connection.query("INSERT INTO user_race (user_id, race_id, status, entryDate) VALUES (?,?, 'active', NOW())", [userId,raceId], function(error, results){
                if(error) throw error;

                var id = null;
                if(results[0])
                    id = results[0].race_id;
                pool.closeConnection(connection);

                cb(id);
            });
        });
    },
    //updateOne()
    update: function(objColVals, condition, cb) {
        orm.updateOne("USER_RACE", objColVals, condition, function(res) {
            cb(res);
        });
    },
    //get most recent active race
    getActiveRace: function(userId, cb){
        pool.getConnection().then(function(connection){
            connection.query("SELECT MAX(race_id) as race_id FROM USER_RACE WHERE status = 'active' AND user_id = ?", [userId], function(error, results){
                if(error) throw error;

                var id = null;
                if(results[0])
                    id = results[0].race_id;
                pool.closeConnection(connection);

                cb(id);
            });
        });
    },
    //get the number of races a user has/is in
    getNumOfRaces: function(userId, cb){
        orm.countCol("USER_RACE", "race_id", "user_id", userId, function(res){
            cb(res);
        });
    },
    //get the number of 1st placeraces a user is in a race
    getNumOf1st: function(userId, cb){
        orm.countColwith2Con("USER_RACE", "race_id", ["user_id", "finishPlace"], [userId, 1], function(res){
            cb(res);
        });
    }
};

// Export the database functions for the controller 
module.exports = user_race;
