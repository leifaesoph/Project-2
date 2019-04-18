var db = require("../models");
var path = require("path");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    console.log("req.session: ", req.session);
    res.sendFile(path.join(_dirname, "../public/index.html"));
  });
  app.get("/users",isLoggedIn, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/user.html"));
    console.log("req.session: ", req.session)
  })
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
  //need to add check login function
  function isLoggedIn(req, res, next) {
    if (req.user !== undefined) {
      next();
    } else {
      res.redirect("/");
    }
  }
};
