import LINKS from 'constants/link'
import { IModalData } from 'interfaces'

export const modalData: {
  accountCreate: IModalData
  taskCreate: IModalData
  driverAdded: IModalData
  passwordChange: IModalData
  passwordReset: IModalData
  orderDeliver: IModalData
  cancelOrder: IModalData
} = {
  accountCreate: {
    heading: 'Account created successfully!',
    detail: 'Your account is created with us. Please login with this email ID.',
    url: LINKS.LOGIN,
  },
  taskCreate: {
    heading: 'Task created successfully!',
    detail: '',
    url: LINKS.LOGIN,
  },
  driverAdded: {
    heading: 'Driver Added successfully!',
    detail: '',
    url: LINKS.LOGIN,
  },
  passwordChange: {
    heading: 'Password Changed Successfully!',
    detail: '',
    url: LINKS.LOGIN,
  },
  passwordReset: {
    heading: 'Password Reset Successfully!',
    detail: '',
    url: LINKS.LOGIN,
  },
  orderDeliver: {
    heading: 'Order Delivered Successfully!',
    detail: '',
    url: LINKS.LOGIN,
  },
  cancelOrder: {
    heading: 'Order Cancelled Successfully!',
    detail: '',
    url: LINKS.DRIVER,
  },
}
