const {
  createLevel,
  getLevelById,
  updateLevelById,
  deleteLevelById,
} = require("../controller/level.controller");
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
} = require("../controller/student.controller");
const {
  getAdminTests,
  createTest,
  getTestById,
  updateTestById,
  deleteTestById,
} = require("../controller/test.controller");
const router = require("express").Router();

// credentials
router.post("/credentials/:studentId", generateCredentials);

// students
router.post("/students", createStudent);
router.get("/students", getStudents);
router.delete("/students/:studentId", deleteStudentById);

// tests
router.get("/tests", getAdminTests);
router.post("/tests", createTest);
router.get("/tests/:testId", getTestById);
router.put("/tests/:testId", updateTestById);
router.delete("/tests/:testId", deleteTestById);

// questions
router.post("/questions/", createQuestion);
router.get("/questions/", getQuestions);
router.put("/questions/:questionId", updateQuestionById);
router.delete("/questions/:questionId", deleteQuestionById);

// student results
router.get("/results");
router.get("/results/:studentId");

module.exports = router;
