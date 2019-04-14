var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
      res.sendFiles(path.join(_dirname, "../public/index.html"));
  });
  // app.get("/api/users/:id", function(req, res){

  // })
  // Load example page and pass in an example by id
  app.post("/api/users", function(req, res) {
    db.Users.create(req.body).then(function(dbUsers){
      // res.json(dnUser) just for test
      res.json(dbUsers);
      // nees to create the routs to user page
      // res.redirect("/api/users/:id");
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
