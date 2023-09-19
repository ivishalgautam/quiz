const router = require("express").Router();
const Controller = require("../controller/test.controller");

// user
router.get("/", Controller.getTests);
router.get("/instructions/:testId", Controller.getTestInstructionsById);
router.get("/:studentId", Controller.getStudentTestsByCategory);

module.exports = router;
