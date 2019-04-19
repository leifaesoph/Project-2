var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'uoautomailer@gmail.com',
    pass: 'Project2UO'
  }
});

module.exports = transporter;
