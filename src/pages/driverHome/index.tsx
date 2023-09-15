import DriverLayout from 'components/Layouts/driverLayout'
import DriverFlowHome from 'views/driverFlowHome'
import { HomeScreenWrapper } from 'styles/views/driverFlowHome'

const HomeScreen = () => (
  <DriverLayout>
    <HomeScreenWrapper>
      <div>
        <DriverFlowHome />
      </div>
    </HomeScreenWrapper>
  </DriverLayout>
)

export default HomeScreen
