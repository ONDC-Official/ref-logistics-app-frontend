import * as Yup from 'yup'

export const PRICE_CALCULATION_SCHEMA = Yup.object().shape({
  packingCharges: Yup.string().required('Please enter the packing charges'),
  rtoCharges: Yup.string().required('Please enter the rto charges'),
  qaCharges: Yup.string().required('Please enter the reverse QA charges'),
  igst: Yup.string().required('Please enter the IGST'),
})
export const HYPERLOCAL_PRICE_CALCULATION_SCHEMA = Yup.object().shape({
  basePrice: Yup.string().required('Please enter the base price'),
  cgst_sgst: Yup.string().required('Please enter the CGST and SGST'),
  additional_charges: Yup.number()
    .positive()
    .typeError('This field cannot be empty')
    .max(99, 'price cannot be greater than 99')
    .required('Please enter the  per kilometre price'),
})
