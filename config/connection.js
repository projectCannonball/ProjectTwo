// Set up MySQL connection.
var mysql = require("mysql");

if (process.env.CLEARDB_DATABASE_URL) {
  pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL);
} else {
  var pool = mysql.createPool({
    port: 3306,
    host: "localhost",
    user: "cb_user",
    password: "abc123",
    database: "cannonball_db",
    connectionLimit: 1
  });
};

// Make connection.
var getConnection = function(){
  return new Promise(function(resolve, reject){
    pool.getConnection(function(error, connection){
      if(error){
        console.error("error connecting: " + error);
        return reject();
      }

      return resolve(connection);
    });
  });
}

//closes the connection
var closeConnection = function(connection){
  connection.release();
}

// Export connection for our ORM to use.
module.exports = {getConnection: getConnection,
  closeConnection: closeConnection};
