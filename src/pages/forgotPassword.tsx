import ForgotPasswordSection from 'views/forgotPassword'
import OndcLogo from 'assets/images/ondc_logo.png'
import CreatePasswordImage from 'assets/images/forgot_password.png'
import {
  LoginMainContainer,
  PasswordLeftSection,
  ImageSection,
  LogoWrapper,
  WecomeInformation,
  ImageWrapSection,
} from 'styles/views/signin'

const ForgotPassword = () => (
  <LoginMainContainer>
    <PasswordLeftSection>
      <ImageSection>
        <LogoWrapper>
          <img src={OndcLogo} alt="OndcLogo" />
        </LogoWrapper>
        <WecomeInformation>
          <ImageWrapSection>
            <img src={CreatePasswordImage} alt="LoginImage" />
          </ImageWrapSection>
        </WecomeInformation>
      </ImageSection>
    </PasswordLeftSection>
    <ForgotPasswordSection />
  </LoginMainContainer>
)

export default ForgotPassword
