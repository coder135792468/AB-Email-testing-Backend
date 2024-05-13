import Template from "../modal/Template.js";
import asyncHandler from "express-async-handler";

//@desc get All templates
//@route GET /api/templates/
//@acess public
const getAllTemplates = asyncHandler(async (req, res) => {
  try {
    const templates = await Template.find({});

    res.json(templates);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Server Error");
  }
});

//@desc Get template
//@route GET /api/templates/:id
//@acess public
const getTemplateById = asyncHandler(async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (template) {
      return res.json(template);
    } else {
      return res.status(404).json({ message: "Template not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Server Error");
  }
});

//@desc Delete a Template
//@droute DELETE /api/templates/:id
//@acess public
const deleteTemplate = asyncHandler(async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (template) {
      await template.deleteOne({ _id: req.params.id });
      res.json({ message: "Template removed sucessfully!!!" });
    } else {
      return res.status(404).json({ message: "Template not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Server Error");
  }
});
export { getAllTemplates, getTemplateById, deleteTemplate };
