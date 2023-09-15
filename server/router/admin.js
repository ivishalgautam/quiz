const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

const Question = require("../controller/question.controller");
const Student = require("../controller/student.controller");
const Test = require("../controller/test.controller");
const Leads = require("../controller/leads.controller");
const Levels = require("../controller/level.controller");
const Result = require("../controller/result.controller");
const { getDashboardDetails } = require("../controller/dashboard.controller");

// dashboard
router.get("/dashboard/details", getDashboardDetails);

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
router.post("/levels", verifyTokenAndAuthorization, Levels.createLevel);
router.get("/levels", verifyTokenAndAuthorization, Levels.getLevels);
router.get(
  "/levels/:levelId",
  verifyTokenAndAuthorization,
  Levels.getLevelById
);
router.delete(
  "/levels/:levelId",
  verifyTokenAndAuthorization,
  Levels.deleteLevelById
);
router.put(
  "/levels/:levelId",
  verifyTokenAndAuthorization,
  Levels.updateLevelById
);

// student results
router.get("/results", verifyTokenAndAuthorization, Result.getResults);
router.get(
  "/results/:studentId",
  verifyTokenAndAuthorization,
  Result.getStudentResults
);

module.exports = router;
