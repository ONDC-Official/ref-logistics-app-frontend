import { useHistory } from 'react-router-dom'
import { DashboardRoute } from 'constants/routes'
import Button from 'components/Button'
import AgentLeftSection from 'views/inviteScreen/leftSection'
import InviteSection from 'views/inviteScreen/invitationSection'
import Arrow from 'assets/svg/Arrow'
import OndcLogo from 'assets/images/ondc_logo.png'
import { MobileLogoWrapper } from 'styles/views/signin'
import { InviteMainContainer, RightSection, ButtonSection } from 'styles/pages/inviteScreen'

const InviteScreen = () => {
  const router = useHistory()
  const onhandleSkip = () => {
    router.push(`${DashboardRoute.path}`)
  }

  return (
    <InviteMainContainer>
      <AgentLeftSection />
      <RightSection>
        <MobileLogoWrapper>
          <img src={OndcLogo} alt="OndcLogo" />
        </MobileLogoWrapper>
        <ButtonSection>
          <Button label="Skip" variant="outline" onClick={onhandleSkip}>
            <Arrow />
          </Button>
        </ButtonSection>
        <InviteSection />
      </RightSection>
    </InviteMainContainer>
  )
}

export default InviteScreen
