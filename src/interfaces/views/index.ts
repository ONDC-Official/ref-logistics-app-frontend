import { IModalData } from 'interfaces'

//For Admin Modal & Invite-admin Section
export interface IAdmin {
  email: string
  mobile: string
  name: string
}

export interface IAdminsData {
  admins: IAdmin[]
}

//For Admin Modal &  Invite-admin Section Form Values
export interface IFormValues {
  admins: {
    name: string
    mobile: string
    email: string
  }[]
}

//For All Modals
export interface IModalProps {
  showModal(value: boolean): void
}

//For assignTaskModal
export interface IAssignModalProps {
  showModal(value: boolean): void
  activeTask: string
  refetchTask: () => void
}

//For Success Modal
export interface ISuccessModalProps {
  showModal(value: boolean): void
  modalData: IModalData
  action?: boolean
}

//For DriverUpdateStatusModal
export interface IDriverUpdateStatusModalProps {
  showModal(value: boolean): void
  handleClick: (e: any) => void
  orderDetail: string
  task: any
  getTask: () => void
  taskStatus: any
}
//For deActivateDriver
export interface IDeactiveModalProps {
  showModal(value: boolean): void
  id: string
  title?: string
  subTitle?: string
  value?: number
  fetchAdmin: () => void
}
export interface IHubModalProps {
  showModal(value: boolean): void
  singleHubDetail: () => void
  id: string
  title?: string
  subTitle?: string
  value?: string
}
export interface IDeleteModalProps {
  showModal(value: boolean): void
  id: string
  title?: string
  value?: number
  fetchDrivers?: any
}
export interface IDeleteHubModalProps {
  showModal(value: boolean): void
  id: string
  title?: string
  value?: number
  getHubs?: any
}
export interface ILogoutModalProps {
  showModal(value: boolean): void
}

//For IButtonData
export interface IButtonData {
  buttonStatus?: boolean
}
//For ForgotPassword
export interface IPayloadData {
  email: string
}

//For Login section
export interface ILoginData {
  email: string
  password: string
  captcha?: string
}
//For Login section
export interface IResetPasswordData {
  password: string
  confirmPassword: string
}

//For OrderStatus Modal
export interface IImageData {
  imgSrc?: string
  title?: any
}

//For Order Tracking
export interface TaskStatus {
  status: string
  createdAt: string
  link?: string
}

interface TrackingDetails {
  data: {
    taskStatus: TaskStatus[]
  }
}

export interface OrderStepperProps {
  trackingDetails: TrackingDetails
}

interface Descriptor {
  code: string
}

interface Time {
  label: string
  duration: string
  timestamp: string
}

interface Item {
  descriptor: Descriptor
  time: Time
  id: string
  fulfillment_id: string
  category_id: string
  _id: string
}
export interface Task {
  createdAt: string
  status: string
  task_id: string
  items?: Item[]
  // Other properties for task
}

//For OrderTable
export interface OrderTableItem {
  status: string
  createdAt: string
  // Other properties for each item in the table
}

export interface OrderTableProps {
  details: OrderTableItem[]
}

//For RecordSection
export interface RecordSectionProps {
  totalDriverCount: number
  totalIssueCount: number
  totalTaskCount: number
  totalOnlineDriver: number
}

//For TaskDetails
export interface ITaskDetailsData {
  orderNumber: string
  pickLocation: string
  dropLocation: string
  allocation: string
  pickDate: null | string
  dropDate: null | string
}

//For TasksData
export interface ITasksData {
  scroll?: number
  search?: boolean
  assignedData?: any
  unassignedData?: any
  pageSize: number
  currentPage: number
  currentAssignedPage: number
  totalUnAssignedCount: number
  totalAssignedCount: number
  searchedText?: any
  setPageSize?: any
  setCurrentPage?: any
  setCurrentAssignedPage?: any
  getUnassigned: () => void
  getassigned: () => void
}
//For IssuesTable
export interface IIssuesData {
  scroll?: number
  issueDetails?: any
  getIssues: () => void
  pageSize: number
  currentPage: number
  totalCount: number
  searchedText?: any
  setPageSize?: any
  setCurrentPage?: any
}
export interface IHubsData {
  // scroll?: number
  hubsDetails?: any
  getHubs: () => void
  pageSize: number
  currentPage: number
  totalCount: number
  setPageSize?: any
  setCurrentPage?: any
  searchedText?: any
}

export interface IssueTrackingProps {
  singleIssueDetail: any
}

//For ActionModal

export interface IActionIssueModal {
  shortDescription?: string
  longDescription?: string
  actionTriggered?: string
  refundAmount?: string
}
export interface IActionModalProps {
  showModal(value: boolean): void
  id?: string
  getIssues: () => void
}
export interface IHubActionModalProps {
  showModal(value: boolean): void
  id?: string
  getHubDetails: () => void
  singleHubDetail: any
}

//For UpdateModal
export interface IUpdateStatusData {
  status: string
}

//For CancelOrderModal
export interface ICancelModalProps {
  showModal(value: boolean): void
  task: any
  getTask: () => void
}
//For vehicleDetails
export interface VehicleDetailsProps {
  next: () => void
  showModal?: any
}

export interface IVehicleDetailsData {
  vehicleNumber: string
  makeYear: string
  weight: string
  brandName: string
  ownerType: string
  intercity: string
  vehicleRegistrationDocument: string
  unit: string
}
export interface IDriverDetails {
  building: string
  city: string
  country: string
  deliveryExperience: string
  dob: string
  email: string
  emailNotification?: boolean
  firstName: string
  lastName: string
  locality: string
  mobile: string
  pincode: string
  state: string
  whatsAppNotification?: boolean
}
export interface IHubsDetails {
  serviceablePincode: any
  building: string
  city: string
  country: string
  name: string
  locality: string
  pincode: string
  state: string
  value?: string
}

export interface IVehicleDetails {
  brandName?: string
  deliveryType: string
  intercity?: string
  makeYear: string
  ownerType?: string
  unit: string
  vehicleNumber: string
  vehicleRegistrationDocument: string
  weight: string
}

export interface IKYCDetailsProps {
  next: () => void
}
export interface IKYCData {
  panNumber?: string
  aadhaarNumber: string
  drivingLicense: string
}

export interface IAccData {
  accountNumber: string
  code: string
  cancelledCheque: string
  branchName: string
  bankName: string
  name: string
}
interface IDriverUser {
  email: string
  name: string
  mobile: string
  _id: string
}
export interface IDriversInfo {
  userId: IDriverUser
  _id: string
}

//For Task Details
interface ITaskInfo {
  start: {
    location: {
      address: {
        name: string
        building: string
        city: string
        state: string
        area_code: string
      }
    }
    contact: { phone: string }
  }
}
export interface IItemInfo {
  record: { fulfillments: ITaskInfo[]; linked_order: { items: [] } }
}
export interface IUpdateModalProps {
  showModal(value: boolean): void
  singleDriverDetail: any
  getDriverDetails: () => void
}

// Driver interface
export interface IDriverDataData {
  isActive: boolean
  data: any
}
//  for order tracking

export interface ITrackingDetails {
  data: {
    task: Task
    taskStatus: TaskStatus[]
  }
}

export interface IOrderTrackingProps {
  trackingDetails: ITrackingDetails
}
