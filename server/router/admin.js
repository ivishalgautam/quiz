const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

const Question = require("../controller/question.controller");
const Student = require("../controller/student.controller");
const Test = require("../controller/test.controller");
const Leads = require("../controller/leads.controller");
const Levels = require("../controller/level.controller");
const Result = require("../controller/result.controller");

// leads
router.delete(
  "/leads/:leadId",
  verifyTokenAndAuthorization,
  Leads.deleteLeadById
);
router.get("/leads/:leadId", verifyTokenAndAuthorization, Leads.getLeadById);
router.get("/leads", verifyTokenAndAuthorization, Leads.getAllLeads);

// credentials
router.post(
  "/credentials/:studentId",
  verifyTokenAndAuthorization,
  Student.generateCredentials
);

// students
router.post("/students", verifyTokenAndAuthorization, Student.createStudent);
router.get("/students", verifyTokenAndAuthorization, Student.getStudents);
router.get(
  "/students/:studentId",
  verifyTokenAndAuthorization,
  Student.getStudentById
);
router.put(
  "/students/:studentId",
  verifyTokenAndAuthorization,
  Student.updateStudentById
);
router.delete(
  "/students/:studentId",
  verifyTokenAndAuthorization,
  Student.deleteStudentById
);

// tests
router.get("/tests", verifyTokenAndAuthorization, Test.getAdminTests);
router.post("/tests", verifyTokenAndAuthorization, Test.createTest);
router.get("/tests/:testId", verifyTokenAndAuthorization, Test.getTestById);
router.put("/tests/:testId", verifyTokenAndAuthorization, Test.updateTestById);
router.delete("/tests/:testId", Test.deleteTestById);

// questions
router.post(
  "/questions/",
  verifyTokenAndAuthorization,
  Question.createQuestion
);
router.get("/questions/", verifyTokenAndAuthorization, Question.getQuestions);
router.put(
  "/questions/:questionId",
  verifyTokenAndAuthorization,
  Question.updateQuestionById
);
router.delete(
  "/questions/:questionId",
  verifyTokenAndAuthorization,
  Question.deleteQuestionById
);

// levels
router.post("/levels", Levels.createLevel);
router.get("/levels", Levels.getLevels);
router.get("/levels/:levelId", Levels.getLevelById);
router.delete("/levels/:levelId", Levels.deleteLevelById);
router.put("/levels/:levelId", Levels.updateLevelById);

// student results
router.get("/results", Result.getResults);
router.get("/results/:studentId", Result.getStudentResults);

module.exports = router;
