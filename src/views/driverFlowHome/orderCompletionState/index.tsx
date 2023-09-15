import TrackOrder from 'views/driverFlowHome/trackOrder'
import ViewMapSection from 'views/driverFlowHome/viewMapSection'
import TickIcon from 'assets/svg/TickIcon'
import { OrderStateWrapper, CompletionWrapper, ViewWrapper } from 'styles/views/driverFlowHome'

const OrderCompletionState = () => (
  <OrderStateWrapper>
    <CompletionWrapper>
      <TickIcon />
      <ViewWrapper>
        <ViewMapSection />
      </ViewWrapper>
    </CompletionWrapper>
    <TrackOrder buttonStatus={false} />
  </OrderStateWrapper>
)

export default OrderCompletionState
