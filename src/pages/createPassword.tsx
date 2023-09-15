import { useEffect } from 'react'
import CreatePasswordSection from 'views/createPassword'
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

export interface IModalProps {
  showModal(value: boolean): void
}

const CreatePassword = () => {
  useEffect(() => {
    localStorage.removeItem('accessToken')
  }, [])

  return (
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
      <CreatePasswordSection />
    </LoginMainContainer>
  )
}

export default CreatePassword
