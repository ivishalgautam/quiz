const {
  createQuestion,
  getQuestions,
  updateQuestionById,
  deleteQuestionById,
} = require("../controller/question.controller");
const {
  deleteStudentById,
  getStudents,
  createStudent,
  generateCredentials,
  getStudentById,
  updateStudentById,
} = require("../controller/student.controller");
const {
  getAdminTests,
  createTest,
  getTestById,
  updateTestById,
  deleteTestById,
} = require("../controller/test.controller");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");
const router = require("express").Router();

// credentials
router.post(
  "/credentials/:studentId",
  verifyTokenAndAuthorization,
  generateCredentials
);

// students
router.post("/students", verifyTokenAndAuthorization, createStudent);
router.get("/students", verifyTokenAndAuthorization, getStudents);
router.get("/students/:studentId", verifyTokenAndAuthorization, getStudentById);
router.put(
  "/students/:studentId",
  verifyTokenAndAuthorization,
  updateStudentById
);
router.delete(
  "/students/:studentId",
  verifyTokenAndAuthorization,
  deleteStudentById
);

// tests
router.get("/tests", verifyTokenAndAuthorization, getAdminTests);
router.post("/tests", verifyTokenAndAuthorization, createTest);
router.get("/tests/:testId", verifyTokenAndAuthorization, getTestById);
router.put("/tests/:testId", verifyTokenAndAuthorization, updateTestById);
router.delete("/tests/:testId", deleteTestById);

// questions
router.post("/questions/", verifyTokenAndAuthorization, createQuestion);
router.get("/questions/", verifyTokenAndAuthorization, getQuestions);
router.put(
  "/questions/:questionId",
  verifyTokenAndAuthorization,
  updateQuestionById
);
router.delete(
  "/questions/:questionId",
  verifyTokenAndAuthorization,
  deleteQuestionById
);

// student results
// router.get("/results");
// router.get("/results/:studentId");

module.exports = router;
