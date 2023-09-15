require("dotenv").config();
let nodemailer = require("nodemailer");

async function sendEmail(email, username, password) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vishal.gautam.5812@gmail.com",
      pass: process.env.GMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "NLA Creadentials",
    html: `
    <h1>NLA ACADEMY</h1>
    <p>
    Your username and password are below:
        <div>
            Your username is: ${username}
        </div>
        <div>
            Your password is: ${password}
        </div>
    </p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

async function sendResetPasswordMail(email, link) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vishal.gautam.5812@gmail.com",
      pass: process.env.GMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "NLA Creadentials",
    html: `
    <h1>NLA ACADEMY</h1>
    <p>
      Your reset password link:
    </p> 
    <a style="border-radius:8px; padding:4px 12px; background-color:red" href='${link}'>Reset password</a>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { sendEmail, sendResetPasswordMail };
