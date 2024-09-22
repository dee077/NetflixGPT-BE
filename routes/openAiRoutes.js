const { Router } = require("express");
const openAi = require("../controllers/openAi")
const router = Router();


router.post('/prompt', openAi);


module.exports = router;
