const router = require("express").Router();
const Controller = require("../controller/test.controller");

// user
router.get("/:studentId", Controller.getStudentTestsByCategory);

module.exports = router;
