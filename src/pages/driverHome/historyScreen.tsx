import DriverLayout from 'components/Layouts/driverLayout'
import MobileTopbar from 'components/MobileTopbar'
import HistoryScreenSection from 'views/driverFlowHome/historyScreenSection'
import { DriverHomeWrapper } from 'styles/views/driverFlowHome'

const HistoryScreen = () => (
  <DriverLayout>
    <DriverHomeWrapper>
      <MobileTopbar />
      <HistoryScreenSection />
    </DriverHomeWrapper>
  </DriverLayout>
)

export default HistoryScreen
