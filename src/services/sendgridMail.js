import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default {
  sendEmail(from, to, subject, html) {
    return new Promise((resolve, reject) => {
      sgMail.send({ to, subject, from, html }, (err, result) => {
        if (err) reject(err);

        resolve(result);
      });
    });
  },
};
// sgMail.send(msg);
