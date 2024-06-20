import NoTaskIcon from 'assets/svg/NoTaskIcon'
import { ContentWrapper, HeadingWrapper } from 'styles/views/driverFlowHome'

const NoTaskSection = () => (
  <ContentWrapper>
    <NoTaskIcon />
    <HeadingWrapper>No Task Assigned to you</HeadingWrapper>
  </ContentWrapper>
)

export default NoTaskSection
