const router = require("express").Router();
const Controller = require("../controller/test.controller");

// user
router.get("/", Controller.getTests);

module.exports = router;
