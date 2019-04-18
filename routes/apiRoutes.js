var db = require("../models");
var passport = require('passport');
var transporter = require('../nodemailer/');
var moment = require('moment');
var currentDate = moment().format('"YYYY-MM-DD');
//  console.log("DATE: " + currentDate);


module.exports = function (app) {
  // Get all examples
  app.get("/api/logout", function (req, res) {
    // console.log("TEST");
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
    // console.log(req.user);
    req.logout();
    // console.log(req.user)
    res.redirect("/");
  });
  //catch the user email
  app.get("/api/user_data", function (req, res) {
    // console.log(req.user)
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
        console.log("BORROWERINF" + data);
        // console.log(req.body);

        var transaction = {
          borrowerEmail: data.email,
          borrowerName: data.name,
          borrowerId: data.id,
          lenderName: req.body.lenderName,
          lenderId: req.body.lenderId,
          currentDate: currentDate,
          amount: req.body.amount,
          dueDate: req.body.dueDate,
          message: req.body.message
        }

        var mailOptions = {
          from: "uoautomailer@gmail.com",
          to: "uoautomailer@gmail.com",
          subject: "New Transaction Logged by " + req.body.lenderName,
          text: "Hey, " + data.name + ". A new Transaction has been logged by " + req.body.lenderName + " for $" + req.body.amount + ". "
            + req.body.lenderName + " has set a due date of " + req.body.dueDate + ". Please login to UO to confirm this transaction. Thank you, UO."
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

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
    console.log(req.user);
    db.Transactions.findAll({
      where: {
        lenderId: req.user.id,
        borrowerApproval: true
      }
    }).then(function (data) {
      res.json(data)
    });
  });

  app.get("/api/user_debts", function (req, res) {
    db.Transactions.findAll({
      where: {
        borrowerId: req.user.id,
        borrowerApproval: true
      }
    }).then(function (data) {
      res.json(data)
    });
  });


  //----------------------------------DMS----------------

  app.get("/api/lender_id", function (req, res) {
    console.log("FIND ID OOOoOOOOOOOO")
    console.log(req);
    db.Users.findOne({
      where: {
        id: req.query.id
      }
    }).then(function (data){
      res.json(data);
    })
  })

  //-----------------------------------------------

  

  app.get("/api/approve", function (req, res) {
    db.Transactions.findOne({
      where: {
        borrowerEmail: req.user.email,
        borrowerApproval: null
      }
    }).then(function (data) {
      if (data != null) {
        res.json(data)
      }
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });
  app.delete("/api/deleteTrans/:id", function (req, res) {
    // console.log("IDhere");
    console.log("ID" + req.params.id);
    db.Transactions.destroy({
      where: { id: req.params.id }
    }).then(function (data) {
      console.log("END");
      if (data !== null) {
        res.json(data);
      };
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });
  app.put("/api/update", function (req, res) {
    console.log(req.body);
    db.Transactions.update(
      { borrowerApproval: true },
      { where: { id: req.body.id } }
    ).then(function (data) {
      res.json(data)
      db.Transactions.findOne(
        { where: { id: req.body.id } }
      ).then(function (data) {
        var mailOptions = {
          from: "uoautomailer@gmail.com",
          to: "uoautomailer@gmail.com",
          subject: "Your UO transaction was approved by " + data.borrowerName,
          text: "Hey, " + data.lenderName + ". Your transaction for $" + data.amount + " was approved by "
            + data.borrowerName + ". You will find the transaction in your U section when you log in next."
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }
      )
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });
  //for update to pending
  app.put("/api/payPending", function (req, res) {
    console.log("STTT");
    console.log(req.body);
    console.log("KKKK");
    db.Transactions.update(
      { payStatus: "pending" },
      { where: { id: req.body.id } }
    ).then(function (data) {
      res.json(data)
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });
  //check the pay approve notice
  app.get("/api/payNotice", function (req, res) {
    console.log("NOTICE1")
    // console.log(req.user.name);
    db.Transactions.findOne({
      where: {
        lenderName: req.user.name,
        payStatus: "pending"
      }
    }).then(function (data) {
      console.log("NOTICE")
      console.log(data)
      if (data !== null) {
        res.json(data)
      }
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });
  //for confor the pay and update the paydate in db
  app.put("/api/paid", function (req, res) {
    console.log("T1ST");
    console.log(req.body);
    db.Transactions.update(
      { payStatus: "paid" ,
       payDate: currentDate },
      { where: { id: req.body.id } }
    ).then(function (data) {
      res.json(data)
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });

  app.put("/api/payreject", function (req, res) {
    console.log("NOTICE1")
    // console.log(req.user.name);
    db.Transactions.update(
      {  payStatus: "unpaid"},
      {where: {id: req.body.id}}
    ).then(function (data) {
      console.log("NOTICE")
      console.log(data)
      if (data !== null) {
        res.json(data)
      }
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });
}
