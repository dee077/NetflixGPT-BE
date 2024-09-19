const { Router } = require("express");
const signup = require("../controllers/signup");
const login = require("../controllers/login");

const router = Router();

router.post("/signup", signup);
router.post("/login", login);


module.exports = router;
