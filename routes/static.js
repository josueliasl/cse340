/* ******************************************
 * static.js
 * Route file for static pages
 ******************************************/

const express = require("express")
const router = express.Router()

/* ******************************
 * Route to build home page
 * ***************************** */
router.get("/", (req, res) => {
  res.render("index", { title: "Home" })
})

module.exports = router

