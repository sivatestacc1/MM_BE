import { body, validationResult } from 'express-validator';

const orderValidationRules = [
  body('customer.name').trim().notEmpty().withMessage('Customer name is required'),
  body('customer.address').trim().notEmpty().withMessage('Address is required'),
  body('customer.city').trim().notEmpty().withMessage('City is required'),
  body('customer.state').trim().notEmpty().withMessage('State is required'),
  body('customer.pincode').trim().notEmpty().withMessage('Pincode is required'),
  body('customer.phone').trim().notEmpty().withMessage('Phone number is required'),
  body('logistics.parcelServiceName').trim().notEmpty().withMessage('Parcel service name is required'),
  body('logistics.branch').trim().notEmpty().withMessage('Branch is required'),
  body('items').isArray().notEmpty().withMessage('Items are required'),
  body('items.*.name').trim().notEmpty().withMessage('Item name is required'),
  body('items.*.weight').isNumeric().withMessage('Weight must be a number'),
  body('items.*.bagSize').trim().notEmpty().withMessage('Bag size is required')
];

export const validateOrder = [
  orderValidationRules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];