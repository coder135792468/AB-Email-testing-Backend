import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import Template from "../modal/Template.js";
import View from "../modal/View.js";

//@desc Add a template & send Mail
//@route POST /api/mails/
//@acess public
const sendMail = asyncHandler(async (req, res) => {
  try {
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
          <img src="" style="display:none"/>
      </div>
    `,
    };
    const send = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", send.messageId);

    const template = await new Template();
    template.subject = req.body.subject;
    template.description = req.body.description;
    const savedTemplate = await template.save();
    res.json({
      msg: send.messageId,
      template: savedTemplate,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Server Error");
  }
});

//@desc Increase View
//@droute get /api/mails/:id
//@acess public
const increaseView = asyncHandler(async (req, res) => {
  try {
    const curHr = new Date().getHours();
    const data = await View.find({ hr: curHr });
    let views = 1;
    if (data.length > 0) views += data[0].count;
    if (data.length == 0) {
      const newView = new View();
      newView.count = views;
      await newView.save();
    } else {
      data[0].count = views;
      await data[0].save();
    }

    const template = await Template.findById(req.params.id);
    if (template) {
      template.views = template.views;
      const saved = await template.save();
      return res.json(saved);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Server Error");
  }
});
export { sendMail, increaseView };
