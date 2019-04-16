var db = require("../models");
var passport = require('passport');
var nodemailer = require('nodemailer');

module.exports = function (app) {
    // Get all examples
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
        // So we're sending the user back the route to the members page because the redirect will happen on the front end
        // They won't get this or even be able to access this page if they aren't authed
        console.log(req.user);
        res.json("/users");
    });

    // Create a new user
    app.post("/api/signup", function (req, res) {
        // res.JSON(alert("email already exist, please try a different one"));
        db.Users.create(req.body).then(function (dbUsers) {
            if (!req.session.passport){
                req.session.passport = {};
            }
            if (!req.session.passport.user){
                req.session.passport.user = {};
            }
            req.session.passport.user.email = dbUsers.dataValues.email;
            passport.serializeUser(function(user, done) { done(null, user); });
            // console.log(req.session.user);
            res.json("/users");
            console.log("OK");
        }).catch(function (err) {
            res.status(500).json(err);
        });
    });

    // logout
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    //catch the user email
    app.get("/api/user_data", function (req, res) {
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
            }).then(function (data) {
                res.json(data);
            });
        }
    });

    app.post("/api/sendTrans", function (req, res) {
        console.log(req.body);
        db.Transactions.create(req.body).then(function (dbTransaction) {
            res.json("/users");
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
  // logout
  app.get("/logout", function (req, res) {
    console.log(req.user);
    req.logout();
    console.log(req.user)
    res.redirect("/");
  });
  //catch the user email
  app.get("/api/user_data", function (req, res) {
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
      }).then(function (data) {
        console.log("KKKKK" + data.name)
        res.json(data);
      });
    }
  });
  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  app.get("/api/user_loans", function (req, res) {
    console.log(req)
    db.Transactions.findAll({
      where: {
        lenderId: userData.id
      }
    });
    //   .then(function(data){
    //     console.log("KKKKK" +data.name)
    //     res.json(data.name);
    //   });
    // });
    app.get("/api/user_debts", function (req, res) {
      console.log(req)
      db.Transactions.findAll({
        where: {
          borrowerId: userData.id
        }
      });
    })
  }
  )
};
