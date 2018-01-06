//imports the npm package
var express = require("express");

//creates the router controller from the express servers
var router = express.Router();

// Import the model to use its database functions.
var user = require("../models/userModel.js");
var race = require("../models/raceModel.js");
var user_race = require("../models/userRaceHistoryModel.js");
var userRace_history = require("../models/userRaceModel.js");

//main index route that grabs all the info
router.get("/:id?", function(req, res) {
    user.one(req.params.id, function(data){
        res.render("index", {user: data});
    });
});

//main post route that creates the new user
router.post("/", function(req, res) {
    user.create([
    "userName", "firstName", "lastName", "password",
    "height", "weight", "race", "age", "sex",
    "city", "state"
  ], [
    req.body
  ], function(id) {
    res.redirect("/"+id);
  });
});

//main update route for the devour button
router.put("/:id", function(req, res) {
    user.update({
    devoured: true
  }, req.params.id, function() {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;
