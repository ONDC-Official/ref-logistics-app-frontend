import OndcLogo from 'assets/images/ondc_logo.png'
import { LogoWrapper } from 'styles/views/signin'
import { TopBar } from 'styles/views/driverFlowHome'

const MobileTopbar = () => (
  <TopBar>
    <LogoWrapper>
      <img src={OndcLogo} alt="OndcLogo" />
    </LogoWrapper>
  </TopBar>
)

export default MobileTopbar
