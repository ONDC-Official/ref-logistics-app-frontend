import { useHistory } from 'react-router'
import { DashboardRoute } from 'constants/routes'
import Button from 'components/Button'
import InviteAdminSection from 'views/inviteAdminSection'
import AgentLeftSection from 'views/inviteScreen/leftSection'
import { MobileLogoWrapper } from 'styles/views/signin'
import Arrow from 'assets/svg/Arrow'
import OndcLogo from 'assets/images/ondc_logo.png'
import { InviteMainContainer, AdminRightSection, ButtonSection } from 'styles/pages/inviteScreen'

const InviteAdmin = () => {
  const router = useHistory()
  const onHandleSkip = () => {
    router.push(`${DashboardRoute.path}`)
  }

  return (
    <InviteMainContainer>
      <AgentLeftSection />
      <AdminRightSection>
        <MobileLogoWrapper>
          <img src={OndcLogo} alt="OndcLogo" />
        </MobileLogoWrapper>
        <ButtonSection>
          <Button label="Skip" variant="outline" onClick={onHandleSkip}>
            <Arrow />
          </Button>
        </ButtonSection>
        <InviteAdminSection />
      </AdminRightSection>
    </InviteMainContainer>
  )
}

export default InviteAdmin
