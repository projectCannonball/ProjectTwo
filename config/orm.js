//imports the connection config
var pool = require('./connection.js');

var orm = {
    selectAll:function(table, func){        
        pool.getConnection().then(function(connection){
            connection.query("SELECT * FROM ??", table, function(error, data){
                if(error) throw error;

                func(data);

                pool.closeConnection(connection);
            });
        });
    },
    insertOne: function(table, cols, values, func){
        pool.getConnection().then(function(connection){
            connection.query("INSERT INTO ?? (??) VALUES (?)", [table, cols, values], function(error, data){
                if(error) throw error;

                func(data);
                pool.closeConnection(connection);
            });
        });
    },
    updateOne: function(table, values, id, func){
        pool.getConnection().then(function(connection){
            connection.query("UPDATE ?? SET ? WHERE id = ?", [table, values, id], function(error, data){
                if(error) throw error;

                func(data);
                pool.closeConnection(connection);
            });
        });
    }
}

module.exports = orm;