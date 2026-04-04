/*

const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const accountModel = require("../models/account-model")

*/

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */

/*

validate.registrationRules = () => {
    return [
        // firstname is required and must be string
        body("account_firstname")
            .trim()
            .escape()
            .notEmpty().bail()
            .isLength({ min: 1 })
            .withMessage("Please provide a first name."),

        // lastname is required and must be string
        body("account_lastname")
            .trim()
            .escape()
            .notEmpty().bail()
            .isLength({ min: 2 })
            .withMessage("Please provide a last name."),

        // valid email is required and cannot already exist in the DB
        body("account_email")
            .trim()
            .isEmail()
            .normalizeEmail() // refer to validator.js docs
            .withMessage("A valid email is required.")
            .custom(async (account_email) => {
                const emailExists = await accountModel.checkExistingEmail(account_email)
                if (emailExists) {
                    throw new Error("Email exists. Please log in or use different email")
                }
            }),

        // password is required and must be strong password
        body("account_password")
            .trim()
            .notEmpty().bail()
            .isStrongPassword({
                minLength: 12,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage("Password does not meet requirements."),
    ]
}

*/

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */

/*

validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("account/register", {
            errors,
            title: "Registration",
            nav,
            account_firstname,
            account_lastname,
            account_email,
        })
        return
    }
    next()
}

*/

/* ******************************
* Login form validation: checks email format and required password
* ***************************** */

/*
validate.loginRules = () => {
    return [
        body("account_email")
            .trim()
            .isEmail()
            .withMessage("Please provide a valid email."),
 
        body("account_password")
            .trim()
            .notEmpty()
            .withMessage("Please provide a password.")
    ]
}
 
*/

/* ******************************
* Validate login credentials and re-render view if errors exist
* ***************************** */

/*

validate.checkLoginData = async (req, res, next) => {
    const { account_email } = req.body
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        return res.render("account/login", {
            errors,
            title: "Login",
            nav,
            account_email
        })
    }
    next()
}

module.exports = validate

*/

const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const accountModel = require("../models/account-model")

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
validate.registrationRules = () => {
    return [
        body("account_firstname")
            .trim()
            .escape()
            .notEmpty().bail()
            .isLength({ min: 1 })
            .withMessage("Please provide a first name."),

        body("account_lastname")
            .trim()
            .escape()
            .notEmpty().bail()
            .isLength({ min: 2 })
            .withMessage("Please provide a last name."),

        body("account_email")
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage("A valid email is required.")
            .custom(async (account_email) => {
                const emailExists = await accountModel.checkExistingEmail(account_email)
                if (emailExists) {
                    throw new Error("Email exists. Please log in or use different email")
                }
            }),

        body("account_password")
            .trim()
            .notEmpty().bail()
            .isStrongPassword({
                minLength: 12,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage("Password does not meet requirements."),
    ]
}

/* ******************************
 * Check registration data and return errors or continue
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("account/register", {
            errors,
            title: "Registration",
            nav,
            account_firstname,
            account_lastname,
            account_email,
        })
        return
    }
    next()
}

/* ******************************
 * Login form validation
 * ***************************** */
validate.loginRules = () => {
    return [
        body("account_email")
            .trim()
            .isEmail()
            .withMessage("Please provide a valid email."),
 
        body("account_password")
            .trim()
            .notEmpty()
            .withMessage("Please provide a password.")
    ]
}
 
/* ******************************
 * Validate login credentials
 * ***************************** */
validate.checkLoginData = async (req, res, next) => {
    const { account_email } = req.body
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        return res.render("account/login", {
            errors,
            title: "Login",
            nav,
            account_email
        })
    }
    next()
}

/* ******************************
 * Account Update Validation Rules
 * ***************************** */
validate.updateAccountRules = () => {
    return [
        body("account_firstname")
            .trim()
            .escape()
            .notEmpty().bail()
            .isLength({ min: 1 })
            .withMessage("Please provide a first name."),

        body("account_lastname")
            .trim()
            .escape()
            .notEmpty().bail()
            .isLength({ min: 2 })
            .withMessage("Please provide a last name."),

        body("account_email")
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage("A valid email is required.")
            .custom(async (account_email, { req }) => {
                const account_id = req.body.account_id
                const existingAccount = await accountModel.getAccountByEmail(account_email)
                if (existingAccount && existingAccount.account_id != account_id) {
                    throw new Error("Email already exists. Please use a different email.")
                }
            }),
    ]
}

/* ******************************
 * Check update account data
 * ***************************** */
validate.checkUpdateAccountData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email, account_id } = req.body
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        const accountData = await accountModel.getAccountById(account_id)
        res.render("account/update-account", {
            errors,
            title: "Update Account Information",
            nav,
            account_firstname,
            account_lastname,
            account_email,
            account_id,
            accountData
        })
        return
    }
    next()
}

/* ******************************
 * Password Update Validation Rules
 * ***************************** */
validate.passwordUpdateRules = () => {
    return [
        body("account_password")
            .trim()
            .notEmpty().bail()
            .isStrongPassword({
                minLength: 12,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage("Password does not meet requirements. Must be at least 12 characters, include 1 number, 1 capital letter, and 1 special character."),
    ]
}

/* ******************************
 * Check password update data
 * ***************************** */
validate.checkPasswordUpdateData = async (req, res, next) => {
    const { account_password, account_id } = req.body
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        const accountData = await accountModel.getAccountById(account_id)
        res.render("account/update-account", {
            errors,
            title: "Update Account Information",
            nav,
            account_id,
            accountData,
            passwordError: true
        })
        return
    }
    next()
}

module.exports = validate