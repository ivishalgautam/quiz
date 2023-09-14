const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

const Question = require("../controller/question.controller");
const Student = require("../controller/student.controller");
const Test = require("../controller/test.controller");
const Leads = require("../controller/leads.controller");

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
  generateCredentials
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
  deleteStudentById
);

// tests
router.get("/tests", verifyTokenAndAuthorization, Test.getAdminTests);
router.post("/tests", verifyTokenAndAuthorization, Test.createTest);
router.get("/tests/:testId", verifyTokenAndAuthorization, Test.getTestById);
router.put("/tests/:testId", verifyTokenAndAuthorization, Test.updateTestById);
router.delete("/tests/:testId", deleteTestById);

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

// student results
// router.get("/results");
// router.get("/results/:studentId");

module.exports = router;
