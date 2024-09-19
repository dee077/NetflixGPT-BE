const { Router } = require("express");
const test = require("../controllers/test");

const router = Router();

router.get("/test", test);

module.exports = router;