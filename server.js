/* ******************************************
 * server.js
 ******************************************/

const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const path = require("path")
require("dotenv").config()

const inventoryRoute = require("./routes/inventoryRoute")
const staticRoutes = require("./routes/static")
const utilities = require("./utilities/")

const app = express()

/* View Engine */
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(expressLayouts)
app.set("layout", "layouts/layout")

/* Middleware */
app.use(express.static(path.join(__dirname, "public")))

/* Routes */
// Inventory routes
app.use("/inv", inventoryRoute)

// Static routes (home, trigger-error, etc.)
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