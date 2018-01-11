//imports the npm package
var express = require("express");

//creates the router controller from the express servers
var router = express.Router();

// Import the model to use its database functions.
var user = require("../models/userModel.js");
var race = require("../models/raceModel.js");
var user_race = require("../models/userRaceModel.js");
var userRace_history = require("../models/userRaceHistoryModel.js");


//main activity route shows home page
router.get("/:id", function(req, res) {
    user.one(req.params.id, function(data){
        res.render("activity", data);
    });
});

router.get("/:userid/:raceid", function(req, res){
  userRace_history.chartSelectedInfo(["user_id", "race_id"], [req.params.userid, req.params.raceid], function(data){
    res.send(data);
  })
});

//main index route shows home page
router.get("*", function(req, res) {
  res.render("index", {error:false});
});

//main update route for the devour button
router.put("/:id", function(req, res) {
    user.update({
    devoured: true
  }, req.params.id, function() {
    res.redirect("/");
  });
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

//main route to the activity page for sign in
router.post("/activity", function(req, res){
  user.login("userName", req.body.userName, "password", req.body.password,
  function(id){
    if(id)
      res.redirect("/"+id);
    else
      res.render("index", {error:true});
  });
});



// Export routes for server.js to use.
module.exports = router;
