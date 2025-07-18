import { body, validationResult } from 'express-validator';

const logisticValidationRules = [
  body('parcelService').trim().notEmpty().withMessage('Parcel service name is required'),
  body('branch').trim().notEmpty().withMessage('Branch is required'),
];

export const validateLogistic = [
  logisticValidationRules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];