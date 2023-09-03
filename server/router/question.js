const router = require("express").Router();
const Controller = require("../controller/question.controller");

router.post("/", Controller.createQuestion);
router.get("/", Controller.getQuestions);
router.get("/:questionId", Controller.getQuestionById);
router.put("/:questionId", Controller.updateQuestionById);
router.delete("/:questionId", Controller.deleteQuestionById);

module.exports = router;
