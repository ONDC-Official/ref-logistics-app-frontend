import AgentLeftSection from 'views/inviteScreen/leftSection'
import EmailSentSection from 'views/emailSentSection'
import { InviteMainContainer, EmailRightSection } from 'styles/pages/inviteScreen'
const EmailSent = () => (
  <InviteMainContainer>
    <AgentLeftSection />
    <EmailRightSection>
      <EmailSentSection />
    </EmailRightSection>
  </InviteMainContainer>
)

export default EmailSent
