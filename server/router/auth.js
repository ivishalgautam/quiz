const { login, adminLogin } = require("../controller/auth.controller");
const { isLoggedIn } = require("../middleware/verifyToken");

const router = require("express").Router();

router.post("/login", login);
router.post("/admin/login", adminLogin);

module.exports = router;
