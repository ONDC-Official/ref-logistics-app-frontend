import { useHistory } from 'react-router-dom'
import { LoginRoute } from 'constants/routes'
import Button from 'components/Button'
import ResetPassword from 'assets/images/reset-password.png'
import OndcLogo from 'assets/images/ondc_logo.png'
import { MobileLogoWrapper } from 'styles/views/signin'
import {
  EmailSentContainer,
  MailSentImageWrapper,
  TextInformationWrapper,
  MailHeading,
  MailParagraph,
} from 'styles/views/emailSentSection'

const ResetSuccessfulSection = () => {
  const router = useHistory()
  const onHanndleClick = () => {
    router.push(`${LoginRoute.path}`)
  }

  return (
    <EmailSentContainer>
      <MobileLogoWrapper>
        <img src={OndcLogo} alt="OndcLogo" />
      </MobileLogoWrapper>
      <MailSentImageWrapper>
        <img src={ResetPassword} alt="OndcLogo" />
      </MailSentImageWrapper>
      <TextInformationWrapper>
        <MailHeading>Reset Successfully</MailHeading>
        <MailParagraph>Congrats! your password has been resettled</MailParagraph>
      </TextInformationWrapper>
      <Button type="submit" label="Okay" variant="contained" onClick={onHanndleClick} />
    </EmailSentContainer>
  )
}

export default ResetSuccessfulSection
