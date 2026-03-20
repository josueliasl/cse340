const invModel = require("../models/inventory-model")

/* ************************
 *  Builds the navigation dynamically
 * ************************ */
async function getNav() {
  try {
    const data = await invModel.getClassifications()
    let list = "<ul>"
    list += '<li><a href="/" title="Home page">Home</a></li>'
    data.rows.forEach((row) => {
      list += `<li><a href="/inv/type/${row.classification_id}" title="View our ${row.classification_name} lineup of vehicles">${row.classification_name}</a></li>`
    })
    list += "</ul>"
    return list
  } catch (error) {
    console.error("getNav error: " + error)
  }
}

/* **************************************
 *  Build the classification view HTML
 * ************************************ */
async function buildClassificationGrid(data) {
  try {
    let grid = '<ul id="inv-display">'
    data.forEach(vehicle => {
      grid += '<li>'
      grid += `<a href="../../inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">`
      grid += `<img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors">`
      grid += '<hr>'
      grid += `<h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>`
      grid += '</a>'
      grid += '<span>$' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</li>'
    })
    grid += '</ul>'
    return grid
  } catch (error) {
    console.error("buildClassificationGrid error: " + error)
  }
}

/* **************************************
 *  Build the inventory item detail HTML
 * ************************************ */
function buildItemDetail(itemData) {
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

module.exports = { 
  getNav, 
  buildClassificationGrid,
  buildItemDetail 
}

