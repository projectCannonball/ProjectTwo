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
    selectAllwTwoCon:function(table, conCol1, cond1, conCol2, cond2, func){
        pool.getConnection().then(function(connection){
            connection.query("SELECT * FROM ?? WHERE ?? = ? AND ?? = ?",
                [table, conCol1, cond1, conCol2, cond2], function(error, data){
                if(error) throw error;

                if(data)
                    func(data);
                else
                    func(null);

                pool.closeConnection(connection);
            });
        });
    },
    selectOne:function(table, conCol, condition, func){
        pool.getConnection().then(function(connection){
            connection.query("SELECT * FROM ?? WHERE ?? = ?", [table, conCol, condition], function(error, data){
                if(error) throw error;
                
                func(data[0]);

                pool.closeConnection(connection);
            });
        });
    },
    selectId:function(table, conCol1, cond1, conCol2, cond2, func){
        pool.getConnection().then(function(connection){
            connection.query("SELECT id FROM ?? WHERE ?? = ? AND ?? = ?",
                [table, conCol1, cond1, conCol2, cond2], function(error, data){
                if(error) throw error;

                if(data[0])
                    func(data[0].id);
                else
                    func(null);

                pool.closeConnection(connection);
            });
        });
    },
    insertOne: function(table, cols, values, func){
        pool.getConnection().then(function(connection){
            var query = connection.query("INSERT INTO ?? (??) VALUES (?)", [table, cols, values], function(error, data){
                if(error){console.log(query.sql); throw error};

                func(data.insertId);
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
    },
    countCol: function(table, col, condCol, condVal, func){
        pool.getConnection().then(function(connection){
            connection.query("SELECT COUNT(??) as count FROM ?? WHERE ?? = ?", [col, table, condCol, condVal], function(error, data){
                if(error) throw error;

                func(data[0]);
                pool.closeConnection(connection);
            });
        });
    },
    countColwith2Con: function(table, col, condCol, condVal, func){
        pool.getConnection().then(function(connection){
            connection.query("SELECT COUNT(??) as count FROM ?? WHERE ?? = ? AND ?? = ?", [col, table, condCol[0], condVal[0], condCol[1], condVal[1]], function(error, data){
                if(error) throw error;

                func(data[0]);
                pool.closeConnection(connection);
            });
        });
    },
    sumCol: function(table, col, condCol, condVal, func){
        pool.getConnection().then(function(connection){
            connection.query("SELECT SUM(??) as sum FROM ?? WHERE ?? = ?", [col, table, condCol, condVal], function(error, data){
                if(error) throw error;

                func(data[0]);
                pool.closeConnection(connection);
            });
        });
    }
}

module.exports = orm;