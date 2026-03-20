const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

/* ***************************
 *  Build inventory item detail view
 * ************************** */
invCont.getInventoryDetail = async function (req, res, next) {
    try {
        const invId = req.params.invId
        const itemData = await invModel.getInventoryById(invId)
        
        if (!itemData) {
            let error = new Error("No vehicle found with that ID")
            error.status = 404
            return next(error)
        }
        
        let nav = await utilities.getNav()
        const itemDetailHTML = utilities.buildItemDetail(itemData)
        
        res.render("./inventory/detail", {
            title: `${itemData.inv_make} ${itemData.inv_model}`,
            nav,
            itemDetailHTML,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = invCont
