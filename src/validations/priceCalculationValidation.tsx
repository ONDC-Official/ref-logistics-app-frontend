import * as Yup from 'yup'

const validatePercentage = (value: number | undefined) => {
  if (value === null || value === undefined || isNaN(value)) {
    return false // Invalid if the value is null, undefined, or NaN
  }

  if (typeof value !== 'number') {
    return false // Invalid if the value is not a number
  }

  // Use a regular expression to validate the percentage value
  return /^(100(\.0+)?|\d{1,2}(\.\d{1,2})?)$/.test(value.toString())
}

// Create a separate validation schema
const percentageValidation = Yup.number().test(
  'is-valid-percentage',
  'Invalid percentage, percentage must be between 1 and 100',
  validatePercentage,
)

export const PRICE_CALCULATION_SCHEMA = Yup.object().shape({
  packingCharges: Yup.number()
    .required('Please enter the packing charges')
    .positive()
    // .typeError('This field cannot be empty')
    .max(100, 'Packing charges cannot be greater than 100')
    .min(1, 'Packing charges must be greater than 1'),

  rtoCharges: Yup.number()
    .required('Please enter the rto charges')
    .positive()
    // .typeError('This field cannot be empty')
    .max(100, 'Percentage cannot be greater than 100')
    .min(1, 'Percentage must be greater than 1')
    .concat(percentageValidation)
    .nullable(),

  qcCharges: Yup.number()
    .required('Please enter the reverse QC charges')
    .positive()
    // .typeError('This field cannot be empty')
    .max(100, 'Percentage cannot be greater than 100')
    .min(1, 'Percentage must be greater than 1')
    .concat(percentageValidation)
    .nullable(),

  igst: Yup.number()
    .required('Please enter the CGST and SGST (%)')
    .positive()
    // .typeError('This field cannot be empty')
    .max(100, 'Percentage cannot be greater than 100')
    .min(1, 'Percentage must be greater than 1')
    .concat(percentageValidation),
})
export const HYPERLOCAL_PRICE_CALCULATION_SCHEMA = Yup.object().shape({
  basePrice: Yup.number()
    .required('Please enter the base price')
    .positive()
    // .typeError('This field cannot be empty')
    .max(500, 'Base price cannot be greater than 500')
    .min(1, 'Base price must be greater than 1'),
  cgst_sgst: Yup.number()
    .required('Please enter the CGST and SGST (%)')
    .positive()
    // .typeError('This field cannot be empty')
    .max(100, 'Percentage cannot be greater than 100')
    .min(1, 'Percentage must be greater than 1')
    .concat(percentageValidation)
    .nullable(),
  additional_charges: Yup.number().required('Please enter the  per additional charges as (price per kilometer)'),
})
