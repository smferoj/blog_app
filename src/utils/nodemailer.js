const nodemailer = require("nodemailer");
// create a nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'jessy48@ethereal.email',
    pass: 'xcCUcYN558AvQd9xhJ',
  },
  tls: {
    rejectUnauthorized: false 
  }
});

module.exports = transporter;

