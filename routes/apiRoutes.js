var db = require("../models");
var passport = require('passport');
var nodemailer = require('nodemailer');
var moment = require('moment');
 var currentDate= moment().format('"YYYY-MM-DD');
//  console.log("DATE: " + currentDate);
 

module.exports = function (app) {
  // Get all examples
  app.get("/api/logout", function (req, res) {
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

    //DMS UPDATED THIS MONDY PM-----------------------------------
    db.Users.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (data) {
      if (data === null) {

        db.Users.create(req.body).then(function (dbUsers) {
          res.json("/users");
        }).catch(function (err) {
          console.log(err);
          res.json(err);
        });
      } else {
        res.status(400);
        res.send('Email Already Exists');
      }

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
        res.json(data);
      });
    }
  });


    //DMS UPDATED THIS MONDY MN-----------------------------------

  app.post("/api/sendTrans", function (req, res) {
    console.log(req.body);

    db.Users.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (data) {
      if (data != null) {
        console.log("BORROWERINF" +data);
        // console.log(req.body);

        var transaction = {
          borrowerName: data.name,
          borrowerId: data.id,
          lenderName: req.body.lenderName,
          lenderId: req.body.lenderId,
          currentDate: currentDate,
          amount: req.body.amount,
          dueDate: req.body.dueDate,
          message: req.body.message
        }

        db.Transactions.create(transaction).then(function (transaction) {
          
          res.json("/users");
        }).catch(function (err) {
          console.log(err);
          res.json(err);
        });
      } else {
        res.status(400);
        res.send('Email Already Exists');
      }

    });

  });

  //--------------------------------------------------

  // Delete an example by id
  // app.delete("/api/examples/:id", function (req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  app.get("/api/user_loans", function (req, res) {
    console.log(req)
    console.log(req.user);
    db.Transactions.findAll({
      where: {
        lenderId: req.user.id
      }
    }).then(function (data) {
      res.json(data)
    });
  });

  app.get("/api/user_debts", function (req, res) {
    console.log(req);
    db.Transactions.findAll({
      where: {
        borrowerId: req.user.id
      }
    }).then(function (data) {
      res.json(data)
    });
  });

  // app.get("/api/new_debt_approve", function (req, res) {
  //   console.log(req)
  //   db.Transactions.findAll({
  //     where: {
  //       [Op.or]: [{BorrowerId: user.id}, {BorrowerApproval: null}]
  //     }
  //   })
  // });

  // app.put("/api/new_debt_confirm"), function (req, res) {
  //   console.log(req)
  //   db.Transaction.update({
  //     where: {

  //     }
  //   })
  // }

  // app.get("/api/new_payment_approve", function (req, res) {
  //   console.log(req)
  //   db.Transactions.findAll({
  //     where: {
  //       [Op.or]: [{lenderId: userData.id}, {PayDate: notNull}]
  //     }
  //   })
  // });


};
