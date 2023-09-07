const router = require("express").Router();
const Controller = require("../controller/level.controller");

router.get("/", Controller.getLevels);
router.post("/", Controller.createLevel);
router.get("/:levelId", Controller.getLevelById);
router.put("/:levelId", Controller.updateLevelById);
router.delete("/:levelId", Controller.deleteLevelById);

module.exports = router;
