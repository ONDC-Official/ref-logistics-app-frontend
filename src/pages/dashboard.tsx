import DashboardDetail from 'views/dashboard'
import AdminPrivateLayout from 'components/Layouts/adminPrivateLayout'

const Dashboard = () => (
  <AdminPrivateLayout>
    <DashboardDetail />
  </AdminPrivateLayout>
)

export default Dashboard
