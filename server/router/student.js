const router = require("express").Router();
const Controller = require("../controller/student.controller");

router.post("/", Controller.createStudent);
router.get("/", Controller.getStudents);
router.get("/:studentId", Controller.getStudentById);
router.put("/:studentId", Controller.updateStudentById);
router.delete("/:studentId", Controller.deleteStudentById);

module.exports = router;
