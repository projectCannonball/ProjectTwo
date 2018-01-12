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
    insert: function(cols, vals, cb) {
        orm.insertOne("USER_RACE", cols, vals, function(res) {
            cb(res.insertId);
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
            var q = connection.query("SELECT MAX(race_id) as race_id FROM USER_RACE WHERE status = 'active' AND user_id = ?", [userId], function(error, results){
                if(error) throw error;

                var id = null;
                if(results[0])
                    id = results[0].race_id;
                console.log("userRace result: "+results)
                console.log("userRace result: "+JSON.stringify(results[0]))
                pool.closeConnection(connection);

                cb(id);
            });
            console.log(q.sql)
        });
    }
};

// Export the database functions for the controller 
module.exports = user_race;
