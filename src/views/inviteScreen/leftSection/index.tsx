import logo from 'assets/images/ondc_logo.png'
import agentImage from 'assets/images/select_image.png'
import { LeftSection, LogoContainer, LogoWrapper, LogoImage, ImageWrapper } from 'styles/views/inviteScreen'

const AgentLeftSection = () => (
  <LeftSection>
    <LogoContainer>
      <LogoWrapper>
        <LogoImage src={logo} alt="ONDC-logo" />
      </LogoWrapper>
    </LogoContainer>

    <ImageWrapper>
      <img src={agentImage} alt="agent-image" />
    </ImageWrapper>
  </LeftSection>
)

export default AgentLeftSection
