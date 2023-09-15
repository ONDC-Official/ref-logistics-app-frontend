import styled from 'styled-components'
import { theme } from 'styles/theme'

export const EmailSentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;

  button {
    width: 198px;
  }
`
export const MailSentImageWrapper = styled.div`
  width: 104px;
  height: 104px;
`
export const TextInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${theme.BLACKCOLOR};
  font-family: 'inter';
  gap: 6px;
`
export const MailHeading = styled.h3`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  font-family: 'inter';
`
export const MailParagraph = styled.p`
  font-family: 'inter';
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  width: 100%;
  max-width: 374px;
  text-align: center;
`
