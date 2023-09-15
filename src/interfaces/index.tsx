import { ReactElement, ReactNode } from 'react'

export interface IButtonProps {
  label: ReactElement | string
  onClick?: () => void
  variant: 'contained' | 'text' | 'outline' | 'disabled'
  type?: 'button' | 'submit' | 'reset'
  children?: any
  ref?: any
  className?: string
}

export interface ISidebarData {
  id: number
  data: string
}

export interface IModalData {
  heading?: string
  detail: string
  url?: string
  span?: string
  icon?: ReactElement | null
}
export interface ITableDetails {
  title?: string
  content?: string
}
export interface ITableData {
  heading?: string
  tableDetails?: ITableDetails[]
}

export interface IDriverData {
  id: number
  driverImage: string
  drivername: string
  inProgress: string
  currentTask: string
  completedTask: string
}

export interface TabItem {
  key: string
  label: string
  children: ReactNode
}

export interface TabItem {
  key: string
  label: string
  children: ReactNode
}
export interface CommonTabsProps {
  items: TabItem[]
  apiRefresh: (key: string) => void
}
export interface IProfileData {
  id: number
  title: string
  description: string
}
export interface IUserRole {
  _id: string
  name: string
}

export interface CustomCollapseProps {
  orderId: string
  orderName: string
  status: string
  pickupLocation: string
  pickupAddress: string
  pickupTimestamp: string
  dropLocation: string
  dropAddress: string
  dropTimestamp: string
}

export interface ICardData {
  id: number
  icon: ReactElement | null
  number: string
  description: string
}

export interface IRole {
  name: string
  _id: string
}
export interface IAdminsInfo {
  name: string
  email: string
  mobile: string
  enabled: boolean
  _id: string
  role: IRole
}
export interface IAdminData {
  users?: IAdminsInfo[]
  setCurrentPage?: any
  setPageSize?: any
  scroll?: number
  currentPage: number
  pageSize: number
  totalCount: number
  searchedText?: any
  fetchAdmin: () => void
}
export interface IUserData {
  users?: IAdminsInfo[]
  setCurrentPage?: any
  setPageSize?: any
  scroll?: number
  currentPage: number
  pageSize: number
  totalCount: number
  searchedText?: any
  fetchDrivers?: any
  // searchDrive?: string
}
//for useFormPost hook
export interface IParam {
  url: string
  payload?: any
  token?: string
  formData: string
}
//For usePost hook
export interface IParams {
  url: string
  payload?: any
  config?: any
}

//For driver/otp-login
export interface IDataProps {
  otp0?: string | any
  otp1?: string
  otp2?: string
  otp3?: string
}
export interface IItemProps {
  name: string
  placeholder: string
}
export interface IStatusProp {
  status?: string
}
