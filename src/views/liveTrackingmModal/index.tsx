import CloseIcon from 'assets/svg/CloseIcon'
import OrderTrackingMapComponent from 'components/MapComponent/orderTracking'
import { MainContainer, CloseButton, Wrapper, Heading } from 'styles/views/liveTackingModal'

interface ITrack {
  showModal(value: boolean): void
  trackingDetails: any
}

const LiveTrackingModal = ({ showModal, trackingDetails }: ITrack) => {
  const endPoints = trackingDetails?.data?.task?.fulfillments[0]?.start?.location?.gps.split(',')
  return (
    <MainContainer>
      <Wrapper>
        <Heading>Live Tracking</Heading>
        <CloseButton onClick={() => showModal(false)}>
          <CloseIcon />
        </CloseButton>
      </Wrapper>
      <OrderTrackingMapComponent taskEndpoints={endPoints} />
    </MainContainer>
  )
}

export default LiveTrackingModal
