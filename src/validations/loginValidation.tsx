import * as Yup from 'yup'
const allowedDomains = process.env.REACT_APP_ALLOWED_DOMAINS ? process.env.REACT_APP_ALLOWED_DOMAINS.split(',') : []

export const VALIDATION_SCHEMA_EMAIL = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .trim()
    .email('A valid email address is required')
    .matches(
      new RegExp(`^[a-zA-Z0-9._-]+@(${allowedDomains.map((domain) => domain.replace('.', '\\.')).join('|')})$`),
      `Only specific domains are allowed (i.e ${allowedDomains.join(',')})`,
    ),
})
const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .trim()
    .email('A valid email address is required')
    .matches(
      new RegExp(`^[a-zA-Z0-9._-]+@(${allowedDomains.map((domain) => domain.replace('.', '\\.')).join('|')})$`),
      `Only specific domains are allowed (i.e ${allowedDomains.join(',')})`,
    ),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
      'Password must contain atleast 1 uppercase, 1 lowercase, 1 special character and 1 numerical character',
    ),
  captcha: Yup.string().required('Captcha is required'),
})
const DRIVER_LOGIN_VALIDATION_SCHEMA = Yup.object().shape({
  mobile: Yup.string()
    .required('Mobile Number is required')
    .max(10, 'max 10 digits')
    .matches(/^[6789]\d{9}$/, 'A valid Mobile Number is required'),
})
const VALIDATION_SCHEMA_CREATE = Yup.object().shape({
  password: Yup.string()
    .trim()
    .label('Password')
    .required('Password is required')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
      'Password must contain atleast 1 uppercase, 1 lowercase, 1 special character and 1 numerical character',
    ),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match.'),
})
const VALIDATION_SCHEMA_CHANGE = Yup.object().shape({
  currentPassword: Yup.string()
    .trim()
    .label('Password')
    .required('Current Password is required')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
      'Password must contain atleast 1 uppercase, 1 lowercase, 1 special character and 1 numerical character',
    ),
  newPassword: Yup.string()
    .trim()
    .label('Password')
    .required('New Password is required')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
      'Password must contain atleast 1 uppercase, 1 lowercase, 1 special character and 1 numerical character',
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match.'),
})

export { VALIDATION_SCHEMA, VALIDATION_SCHEMA_CREATE, VALIDATION_SCHEMA_CHANGE, DRIVER_LOGIN_VALIDATION_SCHEMA }
