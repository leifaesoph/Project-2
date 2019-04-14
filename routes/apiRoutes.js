var db = require("../models");
var passport = require('passport');
module.exports = function (app) {
  // Get all examples
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    
    res.json("/users");
  });

  // Create a new user
  app.post("/api/signup", function (req, res) {
    db.Users.create(req.body).then(function (dbUsers) {
      // res.json(dnUser) just for test

      // res.redirect(307, "/api/login");
      console.log("KKKKK");
      res.json(dbUsers);
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};
