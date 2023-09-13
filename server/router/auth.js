const { login, adminLogin } = require("../controller/auth.controller");

const router = require("express").Router();

router.post("/login", login);
router.post("/admin/login", adminLogin);

module.exports = router;
