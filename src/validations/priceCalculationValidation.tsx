import * as Yup from 'yup'

export const PRICE_CALCULATION_SCHEMA = Yup.object().shape({
  distance: Yup.string().required('Please enter the distance'),
  kilometrePrice: Yup.number()
    .positive()
    .typeError('This field cannot be empty')
    .max(99, 'price cannot be greater than 99')
    .required('Please enter the price'),
  weight: Yup.string().required('Please enter the weight'),
  kilogramPrice: Yup.number()
    .positive()
    .typeError('This field cannot be empty')
    .max(99, 'price cannot be greater than 99')
    .required('Please enter the price'),
})
