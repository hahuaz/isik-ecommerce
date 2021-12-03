const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {
  // 1-create transporter(create email sender like gmail,hotmail)

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2-define options
  const mailOptions = {
    from: "Hasan <aziz.biyik46@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    /* html:options.html */
  };

  // 3-send email
  await transporter.sendMail(mailOptions);
};
