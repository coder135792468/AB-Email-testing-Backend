import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import Template from "../modal/Template.js";
import schedule from "node-schedule";

//@desc Increase View
//@droute get /api/mails/getmax
//@acess public
const setUpJob = asyncHandler(async (req, res) => {
  try {
    // Schedule the job to run every night at 11:59 PM
    schedule.scheduleJob("59 23 * * *", async function () {
      const template = await new Template();
      template.subject = req.body.subject;
      template.description = req.body.description;
      const savedTemplate = await template.save();

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.USER,
          pass: process.env.PASSWORD,
        },
      });

      var mailOptions = {
        from: process.env.USER,
        to: req.body.receiver,
        subject: req.body.subject,
        html: `
      <div>
          ${req.body.description}
          <img src="https://ab-email-testing-backend.onrender.com/api/mail/view.png?id=${savedTemplate._id}" style="display:none"/>
      </div>
    `,
      };
      await transporter.sendMail(mailOptions);

      res.json("Job scheduled at every night");
    });
    res.json("Job scheduled at every night");
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Server Error");
  }
});

export { setUpJob };
