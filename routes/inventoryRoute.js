const express = require('express')
const router = new express.Router()
const invController = require('../controllers/invController')
const utilities = require('../utilities/')
const invValidate = require('../utilities/inventory-validation')
console.log('Inventory route loaded')

// Route to build inventory management view
router.get('/', utilities.handleErrors(invController.buildManagementView))

// Route to get inventory by classification
router.get('/type/:classificationId', utilities.handleErrors(invController.buildByClassificationId))

// Route to get inventory item detail
router.get('/detail/:invId', utilities.handleErrors(invController.getInventoryDetail))

// Route to get inventory by classification as JSON (for AJAX)
router.get('/getInventory/:classification_id', utilities.handleErrors(invController.getInventoryJSON))

// Route to build edit inventory view
router.get('/edit/:inv_id', utilities.handleErrors(invController.editInventoryView))

// Route to update inventory (POST) with validation
router.post(
    '/update',
    invValidate.inventoryValidationRules(),
    invValidate.checkUpdateData,
    utilities.handleErrors(invController.updateInventory)
)

// Routes for add classification
router.get('/add-classification', utilities.handleErrors(invController.buildAddClassificationView))
router.post('/add-classification', invController.addClassification)

// Routes for add inventory
router.get('/add-inventory', utilities.handleErrors(invController.buildAddInventoryView))
router.post('/add-inventory', invController.addInventory)

// Deliver the delete confirmation view
router.get('/delete/:inv_id', utilities.handleErrors(invController.deleteView))

// Process the delete inventory request
router.post('/delete', utilities.handleErrors(invController.deleteItem))

module.exports = router