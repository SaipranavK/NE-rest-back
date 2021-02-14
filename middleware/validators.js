/**
Author: Koyyada Sai Pranav
Last modified: 13/02/2021 
*/

const { body, validationResult } = require('express-validator')

// validating request payload 
// returns array of checks
const validate_document = () => {
    return [
    body('opening_hours', 'Opening hours must be an array of days with their corresponding opening and closing hours').isArray().notEmpty(),
    body('address', 'Address cannot be empty').notEmpty(),
    body('phone_number', 'Phone number cannot be empty').notEmpty(),
    body('location.lat', 'Lat must be a valid latitude value').isNumeric(),
    body('location.lat', 'Lng must be a valid longitude value').isNumeric(),
    body('name', 'Name cannot be empty').notEmpty(),
    body('icon', 'Icon must be an URL').isURL(),
    body('google_maps_url', 'Google maps url must be an URL').isURL(),
    body('photo', 'Photo must be an URL').isURL(),
    body('website', 'Website must be an URL').isURL(),
    body('rating', 'Rating must be a number').optional().isNumeric(),
    body('price_level', 'Price Level must be a number').optional().isNumeric().bail(),
   ]
}

// Return errors if any
const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
    })
}
  

module.exports = {
    validate_document,
    validate,
}