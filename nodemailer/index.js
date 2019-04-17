var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'uoautomailer@gmail.com',
    pass: 'Project2UO'
  }
});

// var mailOptions = {
//   from: 'uoautomailer@gmail.com',
//   to: 'micahrabinowitz@gmail.com',
//   subject: 'Tester Email',
//   text: 'A New Transaction has been logged!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

module.exports = transporter;
