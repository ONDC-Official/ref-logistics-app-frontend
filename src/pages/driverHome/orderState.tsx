import MapComponent from 'components/MapComponent/index'
import ViewMapSection from 'views/driverFlowHome/viewMapSection'
import TrackOrder from 'views/driverFlowHome/trackOrder'
import { TrackOrderStateWrapper, MapWrapper, ViewWrapper } from 'styles/views/driverFlowHome'

const OrderState = () => (
  <TrackOrderStateWrapper>
    <MapWrapper>
      <MapComponent />
      <ViewWrapper>
        <ViewMapSection />
      </ViewWrapper>
    </MapWrapper>
    <TrackOrder buttonStatus={true} />
  </TrackOrderStateWrapper>
)

export default OrderState
