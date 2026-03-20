const express = require("express")
const router = express.Router()
const baseController = require("../controllers/baseController")

router.get("/", baseController.buildHome)
router.get("/trigger-error", baseController.triggerError)

module.exports = router

