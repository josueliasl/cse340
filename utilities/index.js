/*

const invModel = require("../models/inventory-model")
const Util = {}
const jwt = require("jsonwebtoken")
require("dotenv").config()

*/

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */

/*

Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = '<nav class="navigation">'
  list += '<a href="/" title="Home page">Home</a>'
  data.rows.forEach((row) => {
    list += `<a href="/inv/type/${row.classification_id}" title="See our inventory of ${row.classification_name} vehicles">${row.classification_name}</a>`
  })
  list += "</nav>"
  return list
}

*/

/* **************************************
 * Build the classification view HTML
 * ************************************ */

/*

Util.buildClassificationGrid = async function (data) {
  let grid
  if (data.length > 0) {
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => {
      grid += '<li>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id
        + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
        + ' details"><img src="' + vehicle.inv_thumbnail
        + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
        + ' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$'
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

*/

/* **************************************
 * Build the inventory item detail HTML
 * ************************************ */

/*

Util.buildItemDetail = function (itemData) {
  try {
    // Format price as USD
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(itemData.inv_price)

    // Format mileage with commas
    const formattedMiles = new Intl.NumberFormat('en-US').format(itemData.inv_miles)

    let detailHTML = `
      <div class="detail-container">
        <div class="detail-image">
          <img src="${itemData.inv_image}" alt="${itemData.inv_make} ${itemData.inv_model}">
        </div>
        <div class="detail-info">
          <h2>${itemData.inv_year} ${itemData.inv_make} ${itemData.inv_model}</h2>
          <p class="detail-price">${formattedPrice}</p>
          <p class="detail-miles">Mileage: ${formattedMiles}</p>
          <p class="detail-color">Color: ${itemData.inv_color}</p>
          <p class="detail-description">${itemData.inv_description}</p>
        </div>
      </div>
    `
    return detailHTML
  } catch (error) {
    console.error("buildItemDetail error: " + error)
    return "<p>Sorry, unable to display item details.</p>"
  }
}

*/

/* **************************************
 * Build classification dropdown select list
 * ************************************ */

/*

Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}

*/

/* **************************************
 * Error handling wrapper
 * ************************************ */

/*

Util.handleErrors = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

*/

/* ****************************************
* Middleware to check token validity
**************************************** */

/*

Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, accountData) {
        if (err) {
          req.flash("notice", "Please log in")
          res.clearCookie("jwt")
          return res.redirect("/account/login")
        }
        res.locals.accountData = accountData
        res.locals.loggedin = 1
        next()
      })
  } else {
    next()
  }
}

*/

/* ****************************************
 *  Check Login
 * ************************************ */

/*

Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
}

module.exports = Util
*/

const invModel = require("../models/inventory-model")
const Util = {}
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = '<nav class="navigation">'
  list += '<a href="/" title="Home page">Home</a>'
  data.rows.forEach((row) => {
    list += `<a href="/inv/type/${row.classification_id}" title="See our inventory of ${row.classification_name} vehicles">${row.classification_name}</a>`
  })
  list += "</nav>"
  return list
}

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid
  if (data.length > 0) {
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => {
      grid += '<li>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id
        + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
        + ' details"><img src="' + vehicle.inv_thumbnail
        + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
        + ' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$'
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
 * Build the inventory item detail HTML
 * ************************************ */
Util.buildItemDetail = function (itemData) {
  try {
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(itemData.inv_price)

    const formattedMiles = new Intl.NumberFormat('en-US').format(itemData.inv_miles)

    let detailHTML = `
      <div class="detail-container">
        <div class="detail-image">
          <img src="${itemData.inv_image}" alt="${itemData.inv_make} ${itemData.inv_model}">
        </div>
        <div class="detail-info">
          <h2>${itemData.inv_year} ${itemData.inv_make} ${itemData.inv_model}</h2>
          <p class="detail-price">${formattedPrice}</p>
          <p class="detail-miles">Mileage: ${formattedMiles}</p>
          <p class="detail-color">Color: ${itemData.inv_color}</p>
          <p class="detail-description">${itemData.inv_description}</p>
        </div>
      </div>
    `
    return detailHTML
  } catch (error) {
    console.error("buildItemDetail error: " + error)
    return "<p>Sorry, unable to display item details.</p>"
  }
}

/* **************************************
 * Build classification dropdown select list
 * ************************************ */
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}

/* **************************************
 * Error handling wrapper
 * ************************************ */
Util.handleErrors = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, accountData) {
        if (err) {
          req.flash("notice", "Please log in")
          res.clearCookie("jwt")
          return res.redirect("/account/login")
        }
        res.locals.accountData = accountData
        res.locals.loggedin = 1
        next()
      })
  } else {
    next()
  }
}

/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
}

/* ****************************************
 *  Check Account Type (Employee or Admin only)
 * ************************************ */
Util.checkAccountType = (req, res, next) => {
  if (res.locals.loggedin && (res.locals.accountData.account_type === 'Employee' || res.locals.accountData.account_type === 'Admin')) {
    next()
  } else {
    req.flash("notice", "You do not have permission to access this area.")
    return res.redirect("/account/login")
  }
}

module.exports = Util