const {
  getStudentResults,
  createResult,
} = require("../controller/result.controller");

const router = require("express").Router();

router.post("/", createResult);
router.get("/:studentId", getStudentResults);

module.exports = router;
