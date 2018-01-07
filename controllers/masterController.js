//imports the npm package
var express = require("express");

//creates the router controller from the express servers
var router = express.Router();

// Import the model to use its database functions.
var user = require("../models/userModel.js");
var race = require("../models/raceModel.js");
var user_race = require("../models/userRaceHistoryModel.js");
var userRace_history = require("../models/userRaceModel.js");

//main activity route shows home page
router.get("/:id", function(req, res) {
    user.one(req.params.id, function(data){
        res.render("activity", {user: data});
    });
});

//main index route shows home page
router.get("*", function(req, res) {
  res.render("index");
});

//main post route that creates the new user
router.post("/", function(req, res) {
    user.insert([
    "userName", "firstName", "lastName", "password",
    "city", "state", "email"
  ], [
    req.body.userName, req.body.firstName, req.body.lastName, req.body.password,
    req.body.city, req.body.state, req.body.email
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
