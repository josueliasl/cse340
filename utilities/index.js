const invModel = require("../models/inventory-model")
const Util = {}

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
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + ' details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
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
Util.buildItemDetail = function(itemData) {
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

module.exports = Util
