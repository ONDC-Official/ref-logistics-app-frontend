import * as Yup from 'yup'
const allowedDomains = process.env.REACT_APP_ALLOWED_DOMAINS ? process.env.REACT_APP_ALLOWED_DOMAINS.split(',') : []

export const DRIVER_DETAILS_SCHEMA1 = Yup.object().shape({
  name: Yup.string()
    .required('Please enter name')
    .matches(/^(?! )[a-zA-Z ]+$/, 'This field only accepts alphabetical characters'),
  phone: Yup.string()
    .required('Mobile Number is required')
    .max(10, 'max 10 digits')
    .matches(/^[6789]\d{9}$/, 'A valid Mobile Number is required'),
  dob: Yup.string().required('Adhaar number is required'),
  adhaar: Yup.string()
    .required('Adhaar number is required')
    .matches(/^[0-9]{4}[0-9]{4}[0-9]{4}$/, 'A valid Adhaar Number is required'),
})
export const DRIVER_DETAILS_SCHEMA = Yup.object().shape({
  vehicleNumber: Yup.string()
    .required('Vehicle Number is required')
    .matches(/^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/, 'A valid Vehicle number is required'),
  makeYear: Yup.string().required('Make Year is required'),
  weight: Yup.number()
    .typeError('Please enter the value')
    .required('Weight is required')
    .max(1000, 'Weight cannot be greater than 1000'),
  brandName: Yup.string(),
  ownerType: Yup.string(),
  intercity: Yup.string(),
  vehicleRegistrationDocument: Yup.string().required('Registration document is required'),
  deliveryType: Yup.array().required('Please select the delivery methods'),
})
export const UPDATE_SCHEMA = Yup.object().shape({
  status: Yup.string(),
})
export const DRIVER_UPDATE_SCHEMA = Yup.object().shape({
  status: Yup.string().required('Please select status'),
  uploadImage: Yup.string().required('Attachment is required'),
  otp: Yup.string(),
})
export const PERSONAL_DETAILS_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .required('Please enter name')
    .matches(/^(?! )[a-zA-Z ]+$/, 'This field only accepts alphabetical characters'),
  email: Yup.string()
    .required('Email is required')
    .trim()
    .email('A valid email address is required')
    .matches(
      new RegExp(`^[a-zA-Z0-9._-]+@(${allowedDomains.map((domain) => domain.replace('.', '\\.')).join('|')})$`),
      `Only specific domains are allowed (i.e ${allowedDomains.join(',')})`,
    ),
  phone: Yup.string()
    .required('Mobile Number is required')
    .max(10, 'max 10 digits')
    .matches(/^[6789]\d{9}$/, 'A valid Mobile Number is required'),
})
export const UPDATE_DETAILS_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .required('Please enter name')
    .max(20, 'max 20 letters')
    .min(5, 'min 5 letters')
    .matches(/^(?! )[a-zA-Z ]+$/, 'This field only accepts alphabetical characters'),
  email: Yup.string().required('Email is required').trim().email('A valid email address is required'),
  phone: Yup.string()
    .required('Mobile Number is required')
    .max(10, 'max 10 digits')
    .matches(/^[6789]\d{9}$/, 'A valid Mobile Number is required'),
})

export const OTP_LOGIN_VALIDATION = Yup.object().shape({
  otp0: Yup.string().required(),
  otp1: Yup.string().required(),
  otp2: Yup.string().required(),
  otp3: Yup.string().required(),
})

export const ACTION_SCHEMA = Yup.object().shape({
  shortDescription: Yup.string()
    .required('Please enter your short description')
    .max(50, 'max 50 letters')
    .matches(/^(?! )[\w. ]+$/, 'First character cannot be space ')
    .min(3, 'min 3 letters'),
  longDescription: Yup.string(),
  refundAmount: Yup.string().matches(/^\d+(\.\d{2})?$/, 'Refund amount should be valid '),
})

//Refund schema Validation
export const ACTION_SCHEMA_2 = Yup.object().shape({
  shortDescription: Yup.string()
    .required('Please enter your short description')
    .max(50, 'max 50 letters')
    .matches(/^(?! )[\w. ]+$/, 'First character cannot be space ')
    .min(3, 'min 3 letters'),
  longDescription: Yup.string(),
  refundAmount: Yup.string()
    .required('Please enter Refund Amount')
    .matches(/^\d+(\.\d{2})?$/, 'Refund amount should be valid '),
})
