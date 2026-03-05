/* ******************************************
 * server.js
 * Main server file for the application
 ******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()

const app = express()

/* ***********************
 * Routes
 *************************/
const staticRoutes = require("./routes/static")

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")
app.set("views", "./views")

/* ***********************
 * Middleware
 *************************/
app.use(express.static("public"))

/* ***********************
 * Routes
 *************************/
app.use("/", staticRoutes)

/* ***********************
 * Server Information
 *************************/
const port = process.env.PORT || 5500

/* ***********************
 * Start Server
 *************************/
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})