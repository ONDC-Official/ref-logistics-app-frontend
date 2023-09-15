import { useHistory } from 'react-router-dom'
import { DashboardRoute } from 'constants/routes'
import Button from 'components/Button'
import EmailSent from 'assets/svg/EmailSent'
import OndcLogo from 'assets/images/ondc_logo.png'
import { MobileLogoWrapper } from 'styles/views/signin'
import {
  EmailSentContainer,
  MailSentImageWrapper,
  TextInformationWrapper,
  MailHeading,
  MailParagraph,
} from 'styles/views/emailSentSection'

const EmailSentSection = () => {
  const router = useHistory()
  const onHanndleClick = () => {
    router.push(`${DashboardRoute.path}`)
  }

  return (
    <EmailSentContainer>
      <MobileLogoWrapper>
        <img src={OndcLogo} alt="OndcLogo" />
      </MobileLogoWrapper>
      <MailSentImageWrapper>
        <EmailSent />
      </MailSentImageWrapper>
      <TextInformationWrapper>
        <MailHeading>We have sent an email.</MailHeading>
        <MailParagraph>
          We have sent mail to the specified email address containing an activation link with an expiry of 24 hrs
        </MailParagraph>
      </TextInformationWrapper>
      <Button type="submit" label="Okay" variant="contained" onClick={onHanndleClick} />
    </EmailSentContainer>
  )
}

export default EmailSentSection
