import * as Yup from 'yup'

export const ADD_TASK_VALIDATION = Yup.object().shape({
  pickLocation: Yup.string().required('Please select pickup location'),
  dropLocation: Yup.string().required('Please select drop location'),
  pickDate: Yup.string().required('Please select the pick date'),
  dropDate: Yup.string().required('Please select the drop date'),
  allocation: Yup.string().required('Please select the driver'),
})
