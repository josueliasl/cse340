const express = require('express')
const router = new express.Router()
const invController = require('../controllers/invController')
const utilities = require('../utilities/')

// Route to build inventory management view
router.get('/', utilities.handleErrors(invController.buildInventory))

// Route to get inventory by classification
router.get('/type/:classificationId', utilities.handleErrors(invController.getInventoryByClassification))

// Add other inventory routes as needed

module.exports = router