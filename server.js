/* ******************************************
 * server.js
 ******************************************/

/*

const cookieParser = require("cookie-parser")
const session = require("express-session")
const pool = require('./database/')
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const path = require("path")
const bodyParser = require("body-parser")
require("dotenv").config()

const inventoryRoute = require("./routes/inventoryRoute")
const staticRoutes = require("./routes/static")
const accountRoute = require("./routes/accountRoute")
const utilities = require("./utilities/")

const app = express()

*/

/* ***********************
 * Middleware
 * ************************/

/*

app.use(express.static(path.join(__dirname, "public")))

// Session middleware
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

// Flash middleware
app.use(require('connect-flash')())

// Custom flash messages middleware - FIXED
app.use(function (req, res, next) {
  res.locals.messages = function (type = 'notice') {
    const msgs = req.flash(type)
    if (msgs && msgs.length) {
      return msgs.map(msg => `<div class="flash-${type}">${msg}</div>`).join('')
    }
    return ''
  }
  next()
})

// Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Cookie parser middleware
app.use(cookieParser())

// JWT Token check middleware
app.use(utilities.checkJWTToken)

*/

/* View Engine */

/*

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(expressLayouts)
app.set("layout", "layouts/layout")

*/

/* Routes */

/*

app.use("/inv", inventoryRoute)
app.use("/account", accountRoute)
app.use("/", staticRoutes)

*/

/* ***********************
 * Error Handlers
 * ************************/

/*

app.use(async (req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' })
})

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

*/

/* Server */

/*

const port = process.env.PORT || 5500

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

*/

/* ******************************************
 * server.js
 ******************************************/
const cookieParser = require("cookie-parser")
const session = require("express-session")
const pool = require('./database/')
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const path = require("path")
const bodyParser = require("body-parser")
require("dotenv").config()

const inventoryRoute = require("./routes/inventoryRoute")
const staticRoutes = require("./routes/static")
const accountRoute = require("./routes/accountRoute")
const utilities = require("./utilities/")

const app = express()

/* ***********************
 * Middleware
 * ************************/
app.use(express.static(path.join(__dirname, "public")))

// Session middleware
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

// Flash middleware
app.use(require('connect-flash')())

// Custom flash messages middleware
app.use(function (req, res, next) {
  res.locals.messages = function (type = 'notice') {
    const msgs = req.flash(type)
    if (msgs && msgs.length) {
      return msgs.map(msg => `<div class="flash-${type}">${msg}</div>`).join('')
    }
    return ''
  }
  next()
})

// Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Cookie parser middleware
app.use(cookieParser())

// JWT Token check middleware - runs on every request
app.use(utilities.checkJWTToken)

/* View Engine */
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(expressLayouts)
app.set("layout", "layouts/layout")

/* Routes */
app.use("/inv", inventoryRoute)
app.use("/account", accountRoute)
app.use("/", staticRoutes)

/* ***********************
 * Error Handlers
 * ************************/
app.use(async (req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' })
})

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