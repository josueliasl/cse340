const utilities = require("../utilities/")

const baseController = {}

/* ***************************
 *  Build home page
 * ************************** */
baseController.buildHome = async function(req, res) {
  const nav = await utilities.getNav()
  req.flash("notice", "This is a flash message.")  // ← Move this INSIDE the function
  res.render("index", {title: "Home", nav})
}

/* ***************************
 *  Trigger intentional 500 error
 * ************************** */
baseController.triggerError = async function(req, res, next) {
  try {
    // This will cause an error
    throw new Error("Intentional 500 error for testing")
  } catch (error) {
    error.status = 500
    next(error)
  }
}

module.exports = baseController