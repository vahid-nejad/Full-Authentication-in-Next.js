import nodemailer from "nodemailer";

export default async function sendMail(
  to: string,
  name: string,
  subject: string,
  html: string
) {
  const {
    SMTP_HOST,
    SMTP_EMAIL,
    SMTP_PASSWORD,
    SMTP_PORT,
  } = process.env;

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b8e1388d807455",
      pass: "9c5d5d75f7ac9f",
    },
  });

  await new Promise((resolve, reject) => {
    transport.verify((error, success) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("server is listening...");
        resolve(success);
      }
    });
  });
  //---------send email
  const options = {
    from: SMTP_EMAIL,
    to,
    subject,
    html,
  };
  await new Promise((resolve, reject) => {
    transport.sendMail(options, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
}
