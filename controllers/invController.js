const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");
const { body, validationResult } = require("express-validator");

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
  return;
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

/* ***************************
 *  Build management view
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav();
  // Build the classification select list
  const classificationSelect = await utilities.buildClassificationList();
  const flashMessage = req.flash("success")[0] || req.flash("error")[0] || req.flash("notice")[0];
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
    classificationSelect,
    flashMessage,
    errors: null,
  });
};

/* ***************************
 *  Build add classification view (GET)
 * ************************** */
invCont.buildAddClassificationView = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
    flashMessage: req.flash("error")[0] || null,
    classification_name: "",
  });
};

/* ***************************
 *  Validation rules for classification
 * ************************** */
const classificationValidationRules = [
  body("classification_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Classification name is required.")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("No spaces or special characters allowed."),
];

/* ***************************
 *  Process add classification (POST)
 * ************************** */
invCont.addClassification = [
  classificationValidationRules,
  async function (req, res, next) {
    const { classification_name } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let nav = await utilities.getNav();
      res.status(400).render("inventory/add-classification", {
        title: "Add New Classification",
        nav,
        errors: errors.array(),
        flashMessage: null,
        classification_name,
      });
      return;
    }

    try {
      await invModel.addClassification(classification_name);
      req.flash("success", `Classification "${classification_name}" added successfully.`);
      res.redirect("/inv");
      return;
    } catch (error) {
      console.error("Error adding classification:", error);
      req.flash("error", "Failed to add classification. Please try again.");
      let nav = await utilities.getNav();
      res.status(500).render("inventory/add-classification", {
        title: "Add New Classification",
        nav,
        errors: [{ msg: "Database error. Please try again." }],
        flashMessage: null,
        classification_name,
      });
    }

  },
];

/* ***************************
 *  Build add inventory view (GET)
 * ************************** */
invCont.buildAddInventoryView = async function (req, res, next) {
  let nav = await utilities.getNav();
  let classificationList = await utilities.buildClassificationList();
  res.render("inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    classificationList,
    errors: null,
    flashMessage: null,
    inv_make: "",
    inv_model: "",
    inv_year: "",
    inv_description: "",
    inv_image: "",
    inv_thumbnail: "",
    inv_price: "",
    inv_miles: "",
    inv_color: "",
    classification_id: "",
  });
};

/* ***************************
 *  Validation rules for inventory
 * ************************** */
const inventoryValidationRules = [
  body("inv_make").trim().notEmpty().withMessage("Make is required."),
  body("inv_model").trim().notEmpty().withMessage("Model is required."),
  body("inv_year")
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage("Year must be a 4-digit number."),
  body("inv_description").trim().notEmpty().withMessage("Description is required."),
  body("inv_image").optional().trim(),
  body("inv_thumbnail").optional().trim(),
  body("inv_price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number."),
  body("inv_miles")
    .isInt({ min: 0 })
    .withMessage("Miles must be a positive integer."),
  body("inv_color").trim().notEmpty().withMessage("Color is required."),
  body("classification_id")
    .isInt()
    .withMessage("Please select a classification."),
];

/* ***************************
 *  Process add inventory (POST)
 * ************************** */
invCont.addInventory = [
  inventoryValidationRules,
  async function (req, res, next) {
    const errors = validationResult(req);
    const {
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    } = req.body;

    if (!errors.isEmpty()) {
      let nav = await utilities.getNav();
      let classificationList = await utilities.buildClassificationList(classification_id);
      res.status(400).render("inventory/add-inventory", {
        title: "Add New Vehicle",
        nav,
        classificationList,
        errors: errors.array(),
        flashMessage: null,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
        classification_id,
      });
      return;
    }

    try {
      const invData = {
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image: inv_image || "/images/no-image.png",
        inv_thumbnail: inv_thumbnail || "/images/no-image-tn.png",
        inv_price,
        inv_miles,
        inv_color,
        classification_id,
      };
      await invModel.addInventory(invData);
      req.flash("success", `Vehicle "${inv_make} ${inv_model}" added successfully.`);
      res.redirect("/inv");
      return;
    } catch (error) {
      console.error("Error adding inventory:", error);
      req.flash("error", "Failed to add vehicle. Please try again.");
      let nav = await utilities.getNav();
      let classificationList = await utilities.buildClassificationList(classification_id);
      res.status(500).render("inventory/add-inventory", {
        title: "Add New Vehicle",
        nav,
        classificationList,
        errors: [{ msg: "Database error. Please try again." }],
        flashMessage: null,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
        classification_id,
      });
    }
  },
];

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0] && invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.editInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}

/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body

  const updateResult = await invModel.updateInventory(
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("success", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("error", "Sorry, the update failed.")
    res.status(501).render("inventory/edit-inventory", {
      title: "Edit " + itemName,
      nav,
      classificationSelect: classificationSelect,
      errors: null,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    })
  }
}

/* ***************************
 *  Build delete confirmation view
 * ************************** */
invCont.deleteView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/delete-confirm", {
    title: "Delete " + itemName,
    nav,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_price: itemData.inv_price,
  })
}

/* ***************************
 *  Delete Inventory Item
 * ************************** */
invCont.deleteItem = async function (req, res, next) {
  let nav = await utilities.getNav()
  const inv_id = parseInt(req.body.inv_id)
  const deleteResult = await invModel.deleteInventoryItem(inv_id)

  if (deleteResult.rowCount > 0) {
    req.flash("success", "The deletion was successful.")
    res.redirect('/inv/')
  } else {
    req.flash("error", "Sorry, the delete failed.")
    res.redirect("/inv/delete/" + inv_id)
  }
}

module.exports = invCont