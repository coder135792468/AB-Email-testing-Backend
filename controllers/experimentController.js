import asyncHandler from "express-async-handler";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const getAllExperiments = asyncHandler(async (req, res) => {
  res.json({
    _id: "testid",
  });
});

export { getAllExperiments };
