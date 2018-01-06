var orm = require("../config/orm.js");

var race = {
	// Select All Data
	selectAll: (cb) => {
		orm.selectAll("races",(res) => {
			cb(res);
		});
	},
	// Create a Single Entry
	insertOne: (cols, vals, cb) => {
		orm.insertOne("races", cols, vals, (res) => {
			cb(res);
		});
	},
	// Update a Single Entry
	updateOne: (objColVals, condition, cb) => {
		orm.updateOne("races", objColVals, condition, (res) => {
			cb(res);
		});
	}
};

module.exports = race;