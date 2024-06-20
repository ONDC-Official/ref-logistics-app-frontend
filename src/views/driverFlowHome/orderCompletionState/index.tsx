import TrackOrder from 'views/driverFlowHome/trackOrder'
import ViewMapSection from 'views/driverFlowHome/viewMapSection'
import TickIcon from 'assets/svg/TickIcon'
import { TrackOrderStateWrapper, CompletionWrapper, ViewWrapper } from 'styles/views/driverFlowHome'

const OrderCompletionState = () => (
  <TrackOrderStateWrapper>
    <CompletionWrapper>
      <TickIcon />
      <ViewWrapper>
        <ViewMapSection />
      </ViewWrapper>
    </CompletionWrapper>
    <TrackOrder buttonStatus={false} />
  </TrackOrderStateWrapper>
)

export default OrderCompletionState
