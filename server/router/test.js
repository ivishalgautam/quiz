const router = require("express").Router();
const Controller = require("../controller/test.controller");

router.post("/", Controller.createTest);
router.get("/", Controller.getTests);
router.get("/:testId", Controller.getTestById);
router.put("/:testId", Controller.updateTestById);
router.delete("/:testId", Controller.deleteTestById);

module.exports = router;
