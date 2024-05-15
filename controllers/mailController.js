import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import Template from "../modal/Template.js";
import View from "../modal/View.js";
import path from "path";

//@desc Add a template & send Mail
//@route POST /api/mails/
//@acess public
const sendMail = asyncHandler(async (req, res) => {
  try {
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
    const send = await transporter.sendMail(mailOptions);

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
//@droute get /api/mails/view.png?id=
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

    const template = await Template.findById(req.query.id);
    if (template) {
      template.views = template.views + 1;
      await template.save();
    }

    const filePath = path.join(path.resolve(), "/public/view.png");
    res.sendFile(filePath, {}, (err) => {
      if (err) {
        res.status(500).send("Something wents wrong");
      } else {
        res.status(500).send("Send successfully");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Server Error");
  }
});

//@desc Increase View
//@droute get /api/mails/getmax
//@acess public
const getMaxViewTime = asyncHandler(async (req, res) => {
  try {
    const maxView = await View.find({}).sort({ count: -1 }).limit(1);
    res.json(maxView[0]);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Server Error");
  }
});
export { sendMail, increaseView, getMaxViewTime };
