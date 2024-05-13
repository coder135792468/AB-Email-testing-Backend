import mongoose from "mongoose";

const template = new mongoose.Schema({
  views: {
    type: Number,
    default: 0,
  },
  subject: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Template = mongoose.model("Template", template);

export default Template;
