const express = require("express");
const router = express.Router();

const regionController = require("../controllers/region");

router.get("/:region", regionController.getDungeonsAndBosses)

router.put('/markComplete', regionController.markComplete)
router.put('/getCompleted', regionController.getCompleted)



module.exports = router;
