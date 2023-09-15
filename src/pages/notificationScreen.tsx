import DriverLayout from 'components/Layouts/driverLayout'
import NotificationSection from 'views/driverFlowHome/notificationSection'
import { ProfileScreenWrapper } from 'styles/views/driverFlowHome'

const NotificationScreen = () => (
  <DriverLayout>
    <ProfileScreenWrapper>
      <NotificationSection />
    </ProfileScreenWrapper>
  </DriverLayout>
)

export default NotificationScreen
