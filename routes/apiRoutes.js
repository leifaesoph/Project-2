var db = require("../models");
var passport = require('passport');
module.exports = function (app) {
  // Get all examples
  app.get("/api/logout", function(req, res){
    console.log("TEST");
    res.json("/");
    // res.redirect("/");
  });

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/users");
  });

  // Create a new user
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.Users.create(req.body).then(function (dbUsers) {
      res.json("/users");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });
// logout
  app.get("/logout", function(req, res) { 
    console.log(req.user);
    req.logout();
    console.log(req.user)
    res.redirect("/");
  });
  //catch the user email
  app.get("/api/user_data", function(req, res) {
    console.log(req.user)
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      db.Users.findOne({
        where: {
          email: req.user.email
        }
      }).then(function(data){
        console.log("KKKKK" +data.name)
        res.json(data.name);
      });
    }
  });
  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};
