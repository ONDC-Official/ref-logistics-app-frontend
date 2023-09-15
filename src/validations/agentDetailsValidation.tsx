import * as Yup from 'yup'

const allowedDomains = process.env.REACT_APP_ALLOWED_DOMAINS ? process.env.REACT_APP_ALLOWED_DOMAINS.split(',') : []

export const AGENTDETAILSVALIDATION_SCHEMA = Yup.object().shape({
  admins: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required('Name is required')
        .matches(/^(?! )[a-zA-Z ]+$/, 'This field only accepts alphabetical characters'),
      email: Yup.string()
        .required('Email is required')
        .trim()
        .email('A valid email address is required')
        .matches(
          new RegExp(`^[a-zA-Z0-9._-]+@(${allowedDomains.map((domain) => domain.replace('.', '\\.')).join('|')})$`),
          `Only specific domains are allowed (i.e ${allowedDomains.join(',')})`,
        )
        .test('unique-emails', 'Emails must be unique', function (value) {
          const admins = (this as any).from
          const checkAdmins = admins.flatMap((admin: { value: { admins: any } }) => admin?.value?.admins ?? [])

          const emailCount = checkAdmins.reduce((count: number, admin: { email: string | undefined }) => {
            if (admin.email === value) {
              count += 1
            }

            return count
          }, 0)
          return emailCount <= 1
        }),

      mobile: Yup.string()
        .required('Mobile Number is required')
        .max(10, 'max 10 digits')
        .matches(/^[6789]\d{9}$/, 'A valid Mobile Number is required')
        .test('unique-phones', 'Mobile Numbers must be unique', function (value) {
          const admins = (this as any).from
          const checkAdmins = admins[1]?.value?.admins
          const mobileCount = checkAdmins.reduce((count: number, admin: { mobile: string | undefined }) => {
            if (admin.mobile === value) {
              count += 1
            }

            return count
          }, 0)
          return mobileCount <= 1
        }),
    }),
  ),
})

export const AGENTKYCDETAILSVALIDATION_SCHEMA = Yup.object().shape({
  panNumber: Yup.string(),
  aadhaarNumber: Yup.string()
    .required('Driving Licence number is required')
    .matches(
      /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/,
      'A valid Driving Licence Number is required',
    ),
  drivingLicense: Yup.string().required('Please upload the license'),
})

export const AGENT_KYC_SCHEMA_STEP1 = Yup.object().shape({
  name: Yup.string()
    .required('Please enter name')
    .matches(/^(?! )[a-zA-Z ]+$/, 'This field only accepts alphabetical characters'),
  email: Yup.string().required('Email is required').trim().email('A valid email address is required'),
  phone: Yup.string()
    .required('Mobile Number is required')
    .max(10, 'max 10 digits')
    .matches(/^[6789]\d{9}$/, 'A valid Mobile Number is required'),
})

export const KYC_DOCUMENTS_SCHEMA = Yup.object().shape({
  addressProof: Yup.string().required('Please upload address proof'),
  IDproof: Yup.string().required('Please upload ID proof'),
  PANcard: Yup.string().required('Please upload PAN card'),
})

export const BANKDETAILSVALIDATION_SCHEMA = Yup.object().shape({
  bankName: Yup.string().required('Invalid IFSC Code'),
  branchName: Yup.string().required('Invalid IFSC Code'),
  name: Yup.string()
    .required('Please enter account holder name')
    .matches(/^(?! )[a-zA-Z ]+$/, 'A valid account holder name is required'),
  accountNumber: Yup.string()
    .required('Please enter account number')
    .matches(/^\d{9,18}$/, 'A valid account number is required'),
  code: Yup.string()
    .required('Please enter IFSC Code')
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'A valid IFSC Code is required'),
  cancelledCheque: Yup.string().required('Please upload cancelled cheque'),
})

const DRIVER_DETAIL_SCHEMA = Yup.object().shape({
  firstName: Yup.string()
    .required('Please enter the first name ')
    .matches(/^[A-Za-z'-]{1,50}$/, 'This field only accepts alphabetical characters'),
  lastName: Yup.string()
    .required('Please enter the last name ')
    .matches(/^(?! )[a-zA-Z ]+$/, 'This field only accepts alphabetical characters'),
  email: Yup.string()
    .required('Email is required')
    .trim()
    .email('A valid email address is required')
    .matches(
      new RegExp(`^[a-zA-Z0-9._-]+@(${allowedDomains.map((domain) => domain.replace('.', '\\.')).join('|')})$`),
      `Only specific domains are allowed (i.e ${allowedDomains.join(',')})`,
    ),
  mobile: Yup.string()
    .required('Mobile Number is required')
    .max(10, 'Maximun 10 digits are required')
    .matches(/^[6789]\d{9}$/, 'A valid Mobile Number is required'),
  dob: Yup.string().required('Please select DOB').nullable(),
  deliveryExperience: Yup.number()
    .positive()
    .typeError('This field cannot be empty')
    .min(1, 'Experience cannot be less than 1')
    .max(35, 'Experience cannot be greater than 35')
    .required('Experience is required'),
  building: Yup.string().required('Please enter the building'),
  pincode: Yup.string()
    .required('Please enter the pincode')
    .matches(/^\d{6,6}$/, 'A valid pincode is required'),
  city: Yup.string(),
  state: Yup.string(),
  locality: Yup.string().required('Please select the locality'),
})
export const UPDATE_DRIVER_DETAIL_SCHEMA = Yup.object().shape({
  firstName: Yup.string()
    .required('Please enter the first name ')
    .matches(/^[A-Za-z'-]{1,50}$/, 'This field only accepts alphabetical characters'),
  lastName: Yup.string()
    .required('Please enter the last name ')
    .matches(/^[A-Za-z'-]{1,50}$/, 'This field only accepts alphabetical characters'),

  deliveryExperience: Yup.number()
    .positive()
    .typeError('This field cannot be empty')
    .min(1, 'Experience cannot be less than 1')
    .max(35, 'Experience cannot be greater than 35')
    .required('Experience is required'),
  holderName: Yup.string()
    .required('Please enter account holder name')
    .matches(/^(?! )[a-zA-Z ]+$/, 'A valid account holder name is required'),
  accountNumber: Yup.string()
    .required('Please enter account number')
    .matches(/^\d{9,18}$/, 'A valid account number is required'),
  IFSCcode: Yup.string()
    .required('Please enter IFSC Code')
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'A valid IFSC Code is required'),
  bankName: Yup.string().required('Please enter the bank name'),
  branchName: Yup.string().required('Please enter the branch name'),
  building: Yup.string().required('Please enter the building'),
  pincode: Yup.string()
    .required('Please enter the pincode')
    .matches(/^\d{6,6}$/, 'A valid pincode is required'),
  city: Yup.string(),
  state: Yup.string(),
  locality: Yup.string().required('Please select the locality'),
  vehicleNumber: Yup.string()
    .required('Vehicle Number is required')
    .matches(/^[a-zA-Z]{2}[ -][0-9]{1,2}(?: [a-zA-Z])?(?: [a-zA-Z]*)? [0-9]{4}$/, 'A valid Vehicle Number is required'),
  makeYear: Yup.string().required('Make Year is required'),
  weight: Yup.number()
    .typeError('Please enter the max. weight capacity')
    .required('Weight is required')
    .max(1000, 'Weight cannot be greater than 1000'),
  deliveryType: Yup.array().required('Please select the delivery methods'),
})

export { DRIVER_DETAIL_SCHEMA }
