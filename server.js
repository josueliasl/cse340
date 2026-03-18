/* ******************************************
 * server.js
 ******************************************/

const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const path = require("path")
require("dotenv").config()

const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities/")  // ADD THIS LINE for error handler

const app = express()

/* Routes */
const staticRoutes = require("./routes/static")

/* View Engine */
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(expressLayouts)
app.set("layout", "layouts/layout")

/* Middleware */
app.use(express.static(path.join(__dirname, "public")))

/* Routes */
// Index route
app.get("/", baseController.buildHome)

// Inventory routes
app.use("/inv", inventoryRoute)

app.use("/", staticRoutes)

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/***************************
 * Express Error Handler
 * Place after all other middleware
 **************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: ${req.originalUrl}: ${err.message}`)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})

/* Server */
const port = process.env.PORT || 5500

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})