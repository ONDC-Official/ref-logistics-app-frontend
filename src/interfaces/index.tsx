import { ReactElement, ReactNode } from 'react'
import { FieldError } from 'react-hook-form'

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
export interface IShowModalProps {
  showModal(value: boolean): void
  singleHubDetail?: any
}
export interface IAddHUbModalProps {
  showModal(value: boolean): void
  singleHubDetail?: any
  getHubs: () => void
}
export interface IUpdateModalProps {
  showModal(value: boolean): void
  id: string
  getHubs: () => void
  hubDetails: any
}

export interface IModalProps {
  isOpen: boolean
  children?: JSX.Element
  className?: string
}

// Drag Component
export interface IDragModalProps {
  dragData: IModalData
  Upload?: any
  name: string
}

// Select Field component

export interface SelectFieldProps {
  options: any[]
  defaultValue?: any
  control: any
  name: string
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  props?: any
  mode?: string
  loading?: boolean
  onSearch?: (value: string) => void
  placeholder?: string
  handleValue?: (value: any) => void
  error?: FieldError
  value?: string
  suffixIcon?: ReactElement
  onChange?: any
  disabled?: boolean
  showSearch?: boolean
}

// UploadButton component
export interface UploadButtonProps {
  customRequest: (options: any) => void
  onRemove: any
  onPreview: any
}
// TextInput component
export interface ITeaxtinputContainer {
  placeholder: string
  required?: boolean
  value?: string
  onChange?: (e: any) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  type?: string
  onWheel?: (e: any) => void
  control: any
  name: string
  disabled?: boolean
  prefix?: any
  error?: FieldError
  className?: string
  handleInputChange?: any
  maxLength?: number
  onKeyDown?: any
  inputRef?: any
  onKeyUp?: any
  autocomplete?: string
}
export interface INumberInputContainer {
  placeholder: string
  control: any
  name: string
  error?: FieldError
  className?: string
  maxLength?: number
  formatter?: any
  value?: any
}
export interface ITableDetails {
  title?: string
  content?: string
}
export interface ITableData {
  heading?: string
  tableDetails?: ITableDetails[]
}

// Map Component
export interface IOrderMap {
  taskStartPoints: any
  taskEndPoints: any
}
export interface ICoordinates {
  liveAgentTracking?: any
  taskEndpoints?: any
}

export interface IOrderTrackingCoordinates {
  taskEndpoints?: any
}

export interface IDriverData {
  id: number
  driverImage: string
  drivername: string
  inProgress: string
  currentTask: string
  completedTask: string
}

//Tabs Component
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

//for constants
export interface IRoute {
  component: () => ReactElement
  path: string
  exact: boolean
  restricted: boolean
}
export interface ItemData {
  key: string
  name: string
  age: string
  address: string
}

export interface EditableRowProps {
  index: number
}

export interface DataType {
  key: React.Key
  lesEq_1: number
  lesEq_3: number
  lesEq_5: number
  lesEq_7: number
  lesEq_10: number
  gtr_10: number
}
export interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof ItemData
  record: ItemData
  handleSave: (record: ItemData) => void
}
