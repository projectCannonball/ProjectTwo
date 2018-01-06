var orm = require("../config/orm.js");

var race = {
	// Select All Data
	selectAll: (cb) => {
		orm.selectAll("USERS",(res) => {
			cb(res);
		});
	},
	// Create a Single Entry
	insertOne: (cols, vals, cb) => {
		orm.insertOne("USERS", cols, vals, (res) => {
			cb(res);
		});
	},
	// Update a Single Entry
	updateOne: (objColVals, condition, cb) => {
		orm.updateOne("USERS", objColVals, condition, (res) => {
			cb(res);
		});
	}
};

module.exports = race;