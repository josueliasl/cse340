/* ******************************************
 * server.js
 ******************************************/

const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const path = require("path")
require("dotenv").config()

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
app.use("/", staticRoutes)

/* Server */
const port = process.env.PORT || 5500

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})