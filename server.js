/* ******************************************
 * server.js
 ******************************************/

const session = require("express-session")
const pool = require('./database/')
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const path = require("path")
const bodyParser = require("body-parser")  // Added
require("dotenv").config()

const inventoryRoute = require("./routes/inventoryRoute")
const staticRoutes = require("./routes/static")
const accountRoute = require("./routes/accountRoute")
const utilities = require("./utilities/")

const app = express()

/* Middleware */
app.use(express.static(path.join(__dirname, "public")))

/* ***********************
 * Middleware
 * ************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))

// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res)
  next()
})

// Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

/* View Engine */
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(expressLayouts)
app.set("layout", "layouts/layout")

/* Routes */
// Inventory routes
app.use("/inv", inventoryRoute)

// Account routes
app.use("/account", accountRoute)

// Static routes (home, trigger-error, etc.)
app.use("/", staticRoutes)

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' })
})

/***************************
 * Express Error Handler
 * Place after all other middleware

app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: ${req.originalUrl}: ${err.message}`)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})
 **************************/

app.use(async (err, req, res, next) => {
  console.error('===== FULL ERROR =====')
  console.error(err)
  let nav = ''
  try {
    nav = await utilities.getNav()
  } catch (navError) {
    console.error('Nav error:', navError)
  }
  res.status(err.status || 500).render("errors/error", {
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
