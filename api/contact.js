import express from 'express';
import nodemailer from 'nodemailer';
import * as dotenv from "dotenv";

dotenv.config();
const router = express.Router();

  export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", 
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  export default router.post("/contact", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var message = req.body.message;
    var content = `name: ${name} \n email: ${email} \n subject: ${subject} \n message: ${message} `;
    var mail = {
      from: name,
      to: 'davidhanlon23@gmail.com',
      subject: subject,
      text: content
    }
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
  });