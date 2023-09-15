import AgentLeftSection from 'views/inviteScreen/leftSection'
import ResetSuccessfulSection from 'views/resetSuccessFullSection'
import { InviteMainContainer, EmailRightSection } from 'styles/pages/inviteScreen'

const ResetSuccessfully = () => (
  <InviteMainContainer>
    <AgentLeftSection />
    <EmailRightSection>
      <ResetSuccessfulSection />
    </EmailRightSection>
  </InviteMainContainer>
)

export default ResetSuccessfully
