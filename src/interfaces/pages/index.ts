import { RouteComponentProps } from 'react-router-dom'
export interface Props {
  history: RouteComponentProps['history']
}

export interface IPayloadData {
  mobile: string
}

//For UpdateProfile
export interface IUpdateProfile {
  name: string
  email: string
  phone: string
}

//For Modal
export interface IModalProps {
  showModal(value: boolean): void
}

//For ChangePassword
export interface IChangePassword {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

//For Param Id
export interface IParamId {
  id: string
}
