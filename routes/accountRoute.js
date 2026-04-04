/*
const express = require('express')
const router = new express.Router()
const utilities = require('../utilities/')
const accountController = require('../controllers/accountController')
const regValidate = require('../utilities/account-validation')

// Route to account management view - PROTECTED with checkLogin
router.get('/', utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement))

// Route to build login view
router.get('/login', utilities.handleErrors(accountController.buildLogin))

// Route to build registration view
router.get('/register', utilities.handleErrors(accountController.buildRegister))

// Process the registration data
router.post(
  '/register',
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

module.exports = router
**/

const express = require('express')
const router = new express.Router()
const utilities = require('../utilities/')
const accountController = require('../controllers/accountController')
const regValidate = require('../utilities/account-validation')

// Route to account management view - PROTECTED with checkLogin
router.get('/', utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement))

// Route to build login view
router.get('/login', utilities.handleErrors(accountController.buildLogin))

// Route to build registration view
router.get('/register', utilities.handleErrors(accountController.buildRegister))

// Route to logout
router.get('/logout', utilities.handleErrors(accountController.logout))

// Route to build account update view
router.get('/update/:account_id', utilities.checkLogin, utilities.handleErrors(accountController.buildAccountUpdate))

// Route to process account update
router.post(
  '/update-account',
  regValidate.updateAccountRules(),
  regValidate.checkUpdateAccountData,
  utilities.handleErrors(accountController.updateAccount)
)

// Route to process password update
router.post(
  '/update-password',
  regValidate.passwordUpdateRules(),
  regValidate.checkPasswordUpdateData,
  utilities.handleErrors(accountController.updatePassword)
)

// Process the registration data
router.post(
  '/register',
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

module.exports = router