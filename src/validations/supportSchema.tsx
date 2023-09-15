/* eslint-disable no-useless-escape */
import * as Yup from 'yup'
const allowedDomains = process.env.REACT_APP_ALLOWED_DOMAINS ? process.env.REACT_APP_ALLOWED_DOMAINS.split(',') : []

export const SUPPORT_SCHEMA = Yup.object().shape({
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
  uri: Yup.string().required('Please enter URI'),
})
