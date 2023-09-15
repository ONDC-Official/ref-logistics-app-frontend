import ResetPasswordSection from 'views/resetPassword'
import OndcLogo from 'assets/images/ondc_logo.png'
import CreatePasswordImage from 'assets/images/create_password.png'
import {
  LoginMainContainer,
  PasswordLeftSection,
  ImageSection,
  LogoWrapper,
  WecomeInformation,
  ImageWrapSection,
} from 'styles/views/signin'

const ResetPassword = () => (
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
    <ResetPasswordSection />
  </LoginMainContainer>
)

export default ResetPassword
