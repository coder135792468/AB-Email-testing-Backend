import mongoose from "mongoose";

const view = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
  hr: {
    type: Number,
    default: new Date().getHours(),
  },
});
const View = mongoose.model("View", view);

export default View;
