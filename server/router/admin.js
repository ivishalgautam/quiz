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
  getAdminTests,
  createTest,
  getTestById,
  updateTestById,
  deleteTestById,
} = require("../controller/test.controller");
const router = require("express").Router();

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

module.exports = router;
