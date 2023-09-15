import styled from 'styled-components'
import { theme } from 'styles/theme'

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  padding-top: 47px;
`
export const ForgotMainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    gap: 80px;
    padding: 10px 24px;
  }
`
export const LoginMainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  @media (max-width: 767px) {
    min-height: calc(100vh - 60px);
  }
`

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 90px;
  padding: 40px;
  width: 40%;
  background: ${theme.LIGHTBLUECOLOR};
  border-radius: 8px;
  @media (max-width: 1068px) {
    display: none;
  }
`
export const PasswordLeftSection = styled.div`
  padding: 40px 40px 0px 40px;
  width: 50%;
  margin-left: 14px;
  background: ${theme.LIGHTBLUECOLOR};
  border-radius: 8px;
  min-height: 92vh;
  @media (max-width: 1068px) {
    display: none;
  }
`
export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  gap: 32px;
  padding: 20px;
  @media (max-width: 767px) {
    width: 100%;
    gap: 100px;
  }
`
export const LoginRightSection = styled(RightSection)`
  @media (max-width: 767px) {
    gap: 20px;
  }
`
export const ForgotRightSection = styled(RightSection)`
  @media (max-width: 767px) {
    width: 100%;
    gap: 12px;
    min-height: calc(100vh - 145px);
    padding: 24px;
  }
`
export const MobileRightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 32px;
  @media (max-width: 767px) {
    padding-top: 47px;
  }
`
export const ChangePasswordContainer = styled(RightSection)`
  align-items: flex-start;
  padding: 0;
  @media (max-width: 767px) {
    max-width: 343px;
    gap: 20px;
  }
`
export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 165px;
`
export const LogoWrapper = styled.div`
  width: 116.84px;
  height: 60px;
  cursor: pointer;
  img {
    width: 100%;
  }
`
export const MobileLogoWrapper = styled.div`
  display: none;

  @media (max-width: 1068px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    img {
      width: 100%;
      max-width: 116.84px;
      height: 50px;
    }
  }
`
export const DriverMobileLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  img {
    width: 100%;
    max-width: 116.84px;
    height: 50px;
  }
`
export const WecomeInformation = styled.div`
  display: flex !important;
  align-items: center;
  flex-direction: column;
  gap: 134px;
`
export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const ImageWrapSection = styled.div`
  width: 100%;
  max-width: 515px;
  img {
    width: 100%;
  }
`
export const ImageWrap = styled.div`
  width: 100%;
  max-width: 532px;
  height: 335px;
  img {
    width: 100%;
    height: auto;
  }
`
export const WelComeTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  width: 100%;
  max-width: 424px;
  text-align: center;
`
export const WelcomeHeading = styled.h3`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: ${theme.PRIMARYCOLOR};
`
export const WelcomeDetail = styled.p`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
`

export const LogInMainWrapper = styled.div`
  width: 100%;
  max-width: 296px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`
export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 438px;
  gap: 36px;
  margin: 0 auto;
  @media (max-width: 767px) {
    gap: 16px;
  }
`
export const DriverLoginContainer = styled(LoginContainer)`
  align-items: center;
`
export const ForgotContainer = styled(LoginContainer)``
export const LoginTextDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (max-width: 767px) {
    width: 100%;
    max-width: 326px;
  }
`
export const OtpTextDetail = styled(LoginTextDetail)`
  width: unset;
`
export const ResetTextDetail = styled(LoginTextDetail)`
  @media (max-width: 767px) {
    max-width: unset;
  }
`
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const ForgotScreenContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const LoginOptionsContainer = styled.div`
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .captcha-container > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Inter';
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 5px;
  }
  @media (max-width: 767px) {
    .captcha-container > div {
      font-size: 12px;
    }
  }
  canvas#canv {
    text-align: start;
  }
`
export const LoginText = styled.h3`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
`
export const ChangePasswordHeading = styled.h3`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 24px;
  line-height: 40px;
`
export const PasswordHeading = styled.h3`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 16px;
  line-height: 40px;
`
export const LogInSubText = styled.p`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`
export const PasswordSubHeading = styled.p`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
`
export const LoginFormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  button {
    margin-top: 30px;
  }
  .pwd {
    margin-top: 50px;
  }
  @media (max-width: 767px) {
    width: 100%;
    max-width: 326px;
  }
`
export const MainLoginFormWrapper = styled(LoginFormWrapper)`
  width: 100%;
  max-width: 100%;
`
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 70px;
  text-align: start;
  .ant-space-item {
    width: 100%;
  }
  .ant-picker .ant-picker-input > input {
    font-family: 'Inter';
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
  input {
    width: 100%;
  }
  #rc_select_1_list {
    text-transform: capitalize !important;
  }

  .ant-select-selection-item {
    text-transform: capitalize;
  }
  svg {
    cursor: pointer;
  }
  .ant-select-selector {
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`
export const PasswordTextWrapper = styled(TextWrapper)`
  min-height: 82px;
`
export const TextWrap = styled(TextWrapper)`
  display: flex;
  flex-direction: column;
  min-height: 86px;
  @media (max-width: 767px) {
    min-height: 80px;
  }
`
export const PasswordTextWrap = styled(TextWrap)`
  svg {
    cursor: pointer;
  }
`
export const InputWrapper = styled.div<{ error: any }>`
  display: flex;
  flex-direction: column;
  min-height: 84px;
  position: relative;
  svg {
    height: 18px;
    position: absolute;
    right: 10px;
    top: 40px;
  }
`
export const ErrorMessage = styled.div`
  color: ${theme.ERROR};
  font-weight: 400;
  font-family: 'Inter';
  font-size: 12px;
  line-height: 16px;
  padding: 2px 0;
  text-align: start;
`
export const FileWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  svg {
    cursor: pointer;
  }
`
export const FileIconWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
export const FileName = styled.span`
  color: ${theme.PRIMARYBLACKCOLOR};
  font-weight: 400;
  font-family: 'Inter';
  font-size: 12px;
  line-height: 16px;
  padding: 5px 0;
  text-align: start;
`
export const Label = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  padding-bottom: 4px;
  color: ${theme.PRIMARYBLACKCOLOR};
`

export const ConditionalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
export const PasswordStrengthText = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`

export const ForgotText = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  color: ${theme.PRIMARYCOLOR};
  span {
    cursor: pointer;
  }
`

export const PasswordValidationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  margin-top: 30px;
  @media (max-width: 767px) {
    margin-top: 4px;
    row-gap: 8px;
  }
`
export const SvgWrapper = styled.div`
  width: 100%;
  max-width: 343px;
  text-align: start;
  svg {
    cursor: pointer;
  }
`
export const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${theme.PROGRESSBARBACKGROUND};
  border-radius: 10px;
`

const ProgressBarWidth = (width: string) => {
  switch (true) {
    case width <= '100' && width > '50':
      return `${theme.SUCCESS}`
    case width <= '50' && width > '25':
      return `${theme.PROGRESS}`
    case width <= '25':
      return `${theme.RED}`
    default:
      return
  }
}

export const Progress = styled.div<{ width: string }>`
  background-color: ${({ width }) => ProgressBarWidth(width)};
  width: ${(props) => `${props.width}%`};
  height: 4px;
`
export const ValidationCotainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
export const ValidationWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  svg {
    width: 14px;
    height: 14px;
  }
`
export const ValidationText = styled.div`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  color: ${theme.BLACKCOLOR};
`
export const LoginOptions = styled.div`
  display: flex;
  gap: 20px;
  border-top: 1px solid ${theme.NEUTRALGREYCOLOR};
  padding-top: 23px;
  position: relative;
`
export const OrText = styled.div`
  position: absolute;
  top: -10px;
  left: 45%;
  font-family: 'Inter';
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${theme.TITLECOLOR};
  padding: 0 12px;
  background-color: ${theme.WHITE};
`

export const LinkOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  width: 100%;
  max-width: 439px;
  cursor: pointer;

  .google-button {
    max-width: 432px;
    width: 100%;
    box-shadow: unset !important;
    justify-content: center;
    span {
      font-weight: 600 !important;
      font-family: 'Inter';
      font-size: 14px;
      line-height: 20px;
      color: ${theme.BLACKCOLOR};
      padding: 0 !important;
    }
  }
`
export const Icon = styled.div`
  width: 20px;
  height: 20px;
`
export const DragFileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed ${theme.BORDERCOLOR};
  padding: 40px 24px;
`
export const DragFileHeading = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${theme.BLACKCOLOR};
  span {
    color: ${theme.BOXCOLOR};
  }
`
export const DragImage = styled.div``
export const DragDescription = styled.div`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${theme.BORDERCOLOR};
  padding-top: 6px;
`

export const Text = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${theme.BLACKCOLOR};
`
export const ChangePasswordWrapper = styled(RightSection)`
  width: 100%;
  justify-content: flex-start;
  padding: 0;
`
export const PasswordContainer = styled(LoginOptionsContainer)`
  max-width: unset;
`
export const HeadingWrapper = styled(LoginTextDetail)`
  max-width: unset;
  width: 100%;
`
export const PasswordInputWrapper = styled(InputWrapper)`
  max-width: 500px;
  min-height: unset;
`
export const PasswordStrengthBar = styled(ProgressBar)`
  max-width: 500px;
`
