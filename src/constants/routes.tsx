// import { ReactElement } from 'react'
import Login from 'views/login'
import Dashboard from 'pages/dashboard'
import InviteScreen from 'pages/inviteScreen'
import InviteAdmin from 'pages/inviteAdmin'
import InviteEmail from 'pages/emailSent'
import CreatePassword from 'pages/createPassword'
import ForgotPassword from 'pages/forgotPassword'
import ResetPassword from 'pages/resetPassword'
import ResetSuccessfullyPassword from 'pages/resetSuccessfully'
import InviteAgent from 'pages/inviteAgentScreen'
import ForgotEmailSent from 'pages/forgotEmailSent'
import UsersDetail from 'pages/usersData'
import TaskDetails from 'pages/tasksData'
import IssuesDetails from 'pages/issuesData'
import DriverHome from 'pages/driverHome'
import HistoryScreen from 'pages/driverHome/historyScreen'
import ProfileScreen from 'pages/driverHome/profileScreen'
import OrderStateScreen from 'pages/driverHome/orderState'
import EditDetails from 'views/editDetails'
import ChangePassword from 'pages/changePassword'
import AddTask from 'pages/addTask'
import GPSTracker from 'pages/gpsTracker'
import DriverLogin from 'pages/driverHome/driverLogin'
import OTPLogin from 'pages/driverHome/otpLogin'
import UpdateProfile from 'pages/driverHome/updateProfile'
import OrderTrackingDetail from 'pages/orderTrackingDetail'
import NotificationScreen from 'pages/notificationScreen'
import TrackingDetail from 'pages/trackOrder'
import OrderCompletionState from 'views/driverFlowHome/orderCompletionState'
import IssueSummary from 'pages/issueSummary'
import DriverProfile from 'pages/driverProfile'
import GPSIssueTracker from 'pages/issueTaskTracker'
import HUbsDetails from 'pages/hubsData'
import HubDetail from 'pages/hubDetail'
import RequestLogs from 'pages/requestLogs'

export const LoginRoute = {
  component: Login,
  path: '/',
  exact: true,
  restricted: false,
}
export const DashboardRoute = {
  component: Dashboard,
  path: '/dashboard',
  exact: true,
  restricted: true,
}
export const InviteScreenRoute = {
  component: InviteScreen,
  path: '/invite-screen',
  exact: true,
  restricted: true,
}
export const InviteAdminRoute = {
  component: InviteAdmin,
  path: '/invite-admin',
  exact: true,
  restricted: true,
}
export const InviteEmailRoute = {
  component: InviteEmail,
  path: '/invite-email',
  exact: true,
  restricted: true,
}
export const ForgotEmailRoute = {
  component: ForgotEmailSent,
  path: '/forgot-email',
  exact: true,
  restricted: true,
}
export const CreatePasswordRoute = {
  component: CreatePassword,
  path: '/create-password/:token',
  exact: true,
  restricted: false,
}
export const ForgotPasswordRoute = {
  component: ForgotPassword,
  path: '/forgot-password',
  exact: true,
  restricted: false,
}
export const ResetPasswordRoute = {
  component: ResetPassword,
  path: '/reset-password',
  exact: true,
  restricted: false,
}
export const ChangePasswordRoute = {
  component: ChangePassword,
  path: '/change-password',
  exact: true,
  restricted: true,
}
export const ResetSuccessfullyPasswordRoute = {
  component: ResetSuccessfullyPassword,
  path: '/reset-successfully',
  exact: true,
  restricted: true,
}
export const InviteAgentRoute = {
  component: InviteAgent,
  path: '/invite-driver',
  exact: true,
  restricted: true,
}

export const UserRoute = {
  component: UsersDetail,
  path: '/driver',
  exact: true,
  restricted: true,
}
export const TasksRoute = {
  component: TaskDetails,
  path: '/tasks',
  exact: true,
  restricted: true,
}
export const HubsRoute = {
  component: HUbsDetails,
  path: '/hubs',
  exact: true,
  restricted: true,
}
export const IssuesRoutes = {
  component: IssuesDetails,
  path: '/complaints',
  exact: true,
  restricted: true,
}
export const IssuesSummaryRoute = {
  component: IssueSummary,
  path: '/complaints/issues-summary/:id',
  exact: true,
  restricted: true,
}
export const DriverLoginRoutes = {
  component: DriverLogin,
  path: '/driver/login',
  exact: true,
  restricted: false,
}
export const HomeRoutes = {
  component: DriverHome,
  path: '/home',
  exact: true,
  restricted: true,
}
export const HistoryRoutes = {
  component: HistoryScreen,
  path: '/history',
  exact: true,
  restricted: true,
}
export const ProfileRoutes = {
  component: ProfileScreen,
  path: '/profile',
  exact: true,
  restricted: true,
}
export const OrderStateRoutes = {
  component: OrderStateScreen,
  path: '/order/pickup/:id',
  exact: true,
  restricted: true,
}
export const SettingsRoute = {
  component: EditDetails,
  path: '/settings',
  exact: true,
  restricted: true,
}
export const AddTasksRoute = {
  component: AddTask,
  path: '/tasks/add-task',
  exact: true,
  restricted: true,
}
export const GPSTrackerRoute = {
  component: GPSTracker,
  path: '/tasks/gps-tracker/:id',
  exact: true,
  restricted: true,
}
export const GPSIssueTrack = {
  component: GPSIssueTracker,
  path: '/tasks/gps-issuetracker/:id',
  exact: true,
  restricted: true,
}
export const OTPLoginRoute = {
  component: OTPLogin,
  path: '/driver/otp-login',
  exact: true,
  restricted: false,
}
export const UpdateProfileRoute = {
  component: UpdateProfile,
  path: '/profile/update',
  restricted: true,
}

export const OrderTrackingDetailRoute = {
  component: OrderTrackingDetail,
  path: '/order-tracking/:id',
  exact: true,
  restricted: true,
}
export const OrderTrackingDetailRoutes = {
  component: TrackingDetail,
  path: '/order/status/:id',
  exact: true,
  restricted: false,
}
export const NotificationScreenRoute = {
  component: NotificationScreen,
  path: '/notifications',
  exact: true,
  restricted: true,
}
export const OrderCompletionStateRoute = {
  component: OrderCompletionState,
  path: '/order-complete/:id',
  exact: true,
  restricted: true,
}
export const DriverProfileRoute = {
  component: DriverProfile,
  path: '/driver/driver-profile/:id',
  exact: true,
  restricted: true,
}
export const HubsProfileDetails = {
  component: HubDetail,
  path: '/hubs/hub-details/:id',
  exact: true,
  restricted: true,
}
export const RequestLogsDetails = {
  component: RequestLogs,
  path: '/request-log/:id',
  exact: true,
  restricted: true,
}

const ROUTES = [
  LoginRoute,
  DashboardRoute,
  InviteScreenRoute,
  InviteAdminRoute,
  InviteEmailRoute,
  CreatePasswordRoute,
  InviteAgentRoute,
  ForgotPasswordRoute,
  ResetPasswordRoute,
  ResetSuccessfullyPasswordRoute,
  ForgotEmailRoute,
  UserRoute,
  TasksRoute,
  IssuesRoutes,
  HubsRoute,
  SettingsRoute,
  HomeRoutes,
  HistoryRoutes,
  ProfileRoutes,
  ChangePasswordRoute,
  AddTasksRoute,
  GPSTrackerRoute,
  GPSIssueTrack,
  OrderStateRoutes,
  DriverLoginRoutes,
  OTPLoginRoute,
  UpdateProfileRoute,
  OrderTrackingDetailRoute,
  OrderTrackingDetailRoutes,
  NotificationScreenRoute,
  OrderCompletionStateRoute,
  IssuesSummaryRoute,
  DriverProfileRoute,
  HubsProfileDetails,
  RequestLogsDetails,
]

export default ROUTES
