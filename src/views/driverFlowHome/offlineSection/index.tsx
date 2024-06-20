import OfflineIcon from 'assets/svg/OfflineIcon'
import { ContentWrapper, HeadingWrapper } from 'styles/views/driverFlowHome'

const OfflineSection = () => (
  <ContentWrapper>
    <OfflineIcon />
    <HeadingWrapper>No Task visible Since you&apos;re offline</HeadingWrapper>
  </ContentWrapper>
)

export default OfflineSection
