const router = require("express").Router();
const {
  updatePassword,
  sendResetPasswordAndLink,
} = require("../controller/password.controller");
const Controller = require("../controller/student.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/import", upload.single("csvFile"), Controller.importStudents);
router.post("/", Controller.createStudent);
router.get("/:studentId", Controller.getStudentById);
router.put("/:studentId", Controller.updateStudentById);
router.post("/send-reset-mail", sendResetPasswordAndLink);
router.post("/reset-password/:studentId", updatePassword);
// router.put("/update-password/:studentId", sendResetPasswordAndLink);

module.exports = router;
