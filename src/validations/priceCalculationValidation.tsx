import * as Yup from 'yup'

const validatePercentage = (value: any) => {
  if (value === null || value === undefined || isNaN(value)) {
    return false // Invalid if the value is null, undefined, or NaN
  }

  if (typeof value !== 'number') {
    return false // Invalid if the value is not a number
  }

  // Use a regular expression to validate the percentage value
  return /^(100(\.0+)?|\d{1,2}(\.\d{1,2})?)$/.test(value.toString())
}

export const PRICE_CALCULATION_SCHEMA = Yup.object().shape({
  inter_city: Yup.object().shape({
    packing_charges: Yup.number()
      .required('Please enter the packing charges')
      .positive()
      .typeError('This field cannot be empty.')
      .max(100, 'Packing charges cannot be greater than 100')
      .min(1, 'Packing charges must be greater than 1'),

    rto_charges: Yup.number()
      .required('Please enter the rto charges')
      .positive()
      .typeError('This field cannot be empty.')
      .max(100, 'Percentage cannot be greater than 100')
      .min(1, 'Percentage must be greater than 1')
      .test('is-valid-percentage', 'Invalid percentage, percentage must be between 1 and 100', validatePercentage),

    reverse_qc_charges: Yup.number()
      .required('Please enter the reverse QC charges')
      .positive()
      .typeError('This field cannot be empty.')
      .max(100, 'Percentage cannot be greater than 100')
      .min(1, 'Percentage must be greater than 1')
      .test('is-valid-percentage', 'Invalid percentage, percentage must be between 1 and 100', validatePercentage),

    igst: Yup.number()
      .required('Please enter the CGST and SGST (%)')
      .positive()
      .typeError('This field cannot be empty.')
      .max(100, 'Percentage cannot be greater than 100')
      .min(1, 'Percentage must be greater than 1')
      .test('is-valid-percentage', 'Invalid percentage, percentage must be between 1 and 100', validatePercentage),
  }),
})

// export const PRICE_CALCULATION_SCHEMA = Yup.object().shape({
//   'inter_city.packing_charges': Yup.number()
//     .required('Please enter the packing charges')
//     .positive()
//     .typeError('This field cannot be empty.')
//     .max(100, 'Packing charges cannot be greater than 100')
//     .min(1, 'Packing charges must be greater than 1'),

//   'inter_city.rto_charges': Yup.number()
//     .required('Please enter the rto charges')
//     .positive()
//     .typeError('This field cannot be empty.')
//     .max(100, 'Percentage cannot be greater than 100')
//     .min(1, 'Percentage must be greater than 1')
//     .concat(percentageValidation)
//     .nullable(),

//   'inter_city.reverse_qc_charges': Yup.number()
//     .required('Please enter the reverse QC charges')
//     .positive()
//     .typeError('This field cannot be empty.')
//     .max(100, 'Percentage cannot be greater than 100')
//     .min(1, 'Percentage must be greater than 1')
//     .concat(percentageValidation)
//     .nullable(),

//   'inter_city.igst': Yup.number()
//     .required('Please enter the CGST and SGST (%)')
//     .positive()
//     .typeError('This field cannot be empty.')
//     .max(100, 'Percentage cannot be greater than 100')
//     .min(1, 'Percentage must be greater than 1')
//     .concat(percentageValidation),
// })
export const HYPERLOCAL_PRICE_CALCULATION_SCHEMA = Yup.object().shape({
  basePrice: Yup.number()
    .required('Please enter the base price')
    .positive()
    .typeError('This field cannot be empty.')
    .max(500, 'Base price cannot be greater than 500')
    .min(1, 'Base price must be greater than 1'),
  cgst_sgst: Yup.number()
    .nullable()
    .required('Please enter the CGST and SGST (%)')
    .positive('Percentage must be a positive number.')
    .max(100, 'Percentage cannot be greater than 100.')
    .min(1, 'Percentage must be greater than 1.')
    .typeError('This field cannot be empty.'),
  additional_charges: Yup.number()
    .positive('Additional charges must be a positive number')
    .max(100, 'Additional charges cannot be greater than 100.')
    .min(1, 'Additional charges must be greater than 1.')
    .required('Please enter the  per additional charges as (price per kilometer)')
    .typeError('This field cannot be empty'),
})
