import NoTaskIcon from 'assets/svg/NoTaskIcon'
import { LogoWrapper, ModalWrapper, TitleWrapper } from 'styles/components/RecordNotFound'

const NoRecords = () => (
  <ModalWrapper>
    <LogoWrapper>
      <NoTaskIcon />
    </LogoWrapper>
    <TitleWrapper>No Data Found</TitleWrapper>
  </ModalWrapper>
)

export default NoRecords
