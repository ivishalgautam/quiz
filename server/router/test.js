const router = require("express").Router();
const Controller = require("../controller/test.controller");
const { verifyToken } = require("../middleware/verifyToken");

// user
router.get("/", verifyToken, Controller.getTests);
router.get(
  "/instructions/:testId",
  verifyToken,
  Controller.getTestInstructionsById
);
router.get("/:studentId", verifyToken, Controller.getStudentTestsByCategory);

module.exports = router;
