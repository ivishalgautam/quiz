const router = require("express").Router();
const Controller = require("../controller/student.controller");

router.post("/students", Controller.createStudent);
router.get("/:studentId", Controller.getStudentById);
router.put("/:studentId", Controller.updateStudentById);
router.put("/update-password/:studentId", Controller.updatePassword);

module.exports = router;
