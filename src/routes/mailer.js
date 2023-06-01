const nodemailer = require("nodemailer");
const { mailAddressFromMailer } = require('../config/config');
const { mailPasswordFromMailer } = require('../config/config');

function sendMail(mail, link) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mailAddressFromMailer,
      pass: mailPasswordFromMailer
    }
  });

  const mailOptions = {
    from: 'RELQstore Team',
    to: mail,
    subject: 'Please confirm your email',
    html: `<p>Click <a href="${link}">${link}</a> to verify your email </p>`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { sendMail }