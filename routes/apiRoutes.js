var db = require("../models");
var passport = require('passport');
var transporter = require('../nodemailer/');
var moment = require('moment');
var currentDate = moment().format('"YYYY-MM-DD');
module.exports = function (app) {

//for login
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/users");
  });
  // Create a new user
  app.post("/api/signup", function (req, res) {
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
//post the new trans to db
  app.post("/api/sendTrans", function (req, res) {
    console.log(req.body);
    db.Users.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (data) {
      if (data != null) {
       
        var transaction = {
          borrowerEmail: data.email,
          borrowerName: data.name,
          borrowerId: data.id,
          lenderName: req.body.lenderName,
          lenderId: req.body.lenderId,
          lenderEmail: req.body.lenderEmail,
          currentDate: currentDate,
          amount: req.body.amount,
          dueDate: req.body.dueDate,
          message: req.body.message
        }

        var mailOptions = {
          from: "uoautomailer@gmail.com",
          to: data.email,
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
//find the loans trans
  app.get("/api/user_loans", function (req, res) {
    console.log(req.user);
    db.Transactions.findAll({
      where: {
        lenderId: req.user.id,
        borrowerApproval: true,
      }
    }).then(function (data) {
      res.json(data)
    });
  });
//find the debts trans
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
  app.get("/api/lender_id", function (req, res) {
  
    db.Users.findOne({
      where: {
        id: req.query.id
      }
    }).then(function (data) {
      res.json(data);
    })
  })

//approve the new trans
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

  //delete the rejected trans
  app.delete("/api/deleteTrans/:id", function (req, res) {
    
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

  //update the trans borrowerapproved 
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
          to: data.lenderEmail,
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

  //for update the payStatus to pending
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

    db.Transactions.findOne({
      where: {
        lenderName: req.user.name,
        payStatus: "pending"
      }
    }).then(function (data) {
      if (data !== null) {
        res.json(data);
        var mailOptions = {
          from: "uoautomailer@gmail.com",
          to: data.lenderEmail,
          subject: "Did you get your money?",
          text: "Hey, " + data.lenderName + ". " + data.borrowerName + " Notified us that they repaid you $" + data.amount +
            ". Log in to confirm or reject that you got your payment. Thanks for using UO!"
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          };
        });
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
      {
        payStatus: "paid",
        payDate: currentDate
      },
      { where: { id: req.body.id } }
    ).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });

  //update the payStatus from pending to unpaid
  app.put("/api/payreject", function (req, res) {

    db.Transactions.update(
      { payStatus: "unpaid" },
      { where: { id: req.body.id } }
    ).then(function (data) {
      if (data !== null) {
        res.json(data);
        var mailOptions = {
          from: "uoautomailer@gmail.com",
          to: data.borrowerEmail,
          subject: "Payment unapproved by " + data.lenderName,
          text: "Hey, " + data.borrowerName + ". " + data.borrowerName + "did not confirm that you repaid the $" + data.amount +
            ". You are welcome to resubmit this transaction as paid, but this transaction will remain as unpaid until you can get confirmation from the lender. Thanks for using UO."
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        }
        )
      };
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });
}
