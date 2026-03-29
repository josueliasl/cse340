const express = require('express')
const router = new express.Router()
const invController = require('../controllers/invController')
const utilities = require('../utilities/')

// Route to build inventory management view
router.get('/', utilities.handleErrors(invController.buildManagementView))

// Route to get inventory by classification
router.get('/type/:classificationId', utilities.handleErrors(invController.buildByClassificationId))

// Route to get inventory item detail
router.get('/detail/:invId', utilities.handleErrors(invController.getInventoryDetail))

// Routes for add classification
router.get('/add-classification', utilities.handleErrors(invController.buildAddClassificationView))
router.post('/add-classification', invController.addClassification) 

// Routes for add inventory
router.get('/add-inventory', utilities.handleErrors(invController.buildAddInventoryView))
router.post('/add-inventory', invController.addInventory)

module.exports = router