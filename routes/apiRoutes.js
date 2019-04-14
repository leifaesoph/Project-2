var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new user
  app.post("/api/users", function(req, res) {
    db.Users.create(req.body).then(function(dbUsers){
      // res.json(dnUser) just for test
      res.json(dbUsers);
      // nees to create the routs to user page
      // res.redirect("/api/users/:id");
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
