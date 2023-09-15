import styled from 'styled-components'
import { theme } from 'styles/theme'
import { AddDetailsWrapper } from 'styles/views/inviteAgentScreen/driverDetailsSection'

export const SuccessfulModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 90px;
  width: 672px;
  padding-bottom: 80px;
  z-index: 9999;
  button {
    width: 190px;
  }
  @media (max-width: 767px) {
    width: 500px;
    gap: 10px;
  }
  @media (max-width: 514px) {
    width: 320px;
    gap: 10px;
    padding-bottom: 20px;
  }
`
export const ModalContainer = styled(SuccessfulModalContainer)`
  padding-bottom: 0px;
  gap: 0;
  border-top: unset;
  z-index: 0;

  @media (max-width: 767px) {
    width: 100%;
    gap: 10px;
    z-index: 0;
  }
`
export const DeleteModalContainer = styled(SuccessfulModalContainer)`
  gap: 0;
  width: 440px;
  padding-bottom: 36px;
  @media (max-width: 514px) {
    width: 320px;
    gap: 10px;
    padding-bottom: 20px;
  }
`
export const Label = styled.div`
  color: ${theme.PRIMARYBLACKCOLOR};
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  text-align: start;
`
export const CloseButton = styled.div`
  width: 100%;
  padding: 30px 0px 30px 0;
  text-align: end;
  svg {
    cursor: pointer;
    margin-right: 30px;
  }
  @media (max-width: 514px) {
    padding: 20px 0px 20px 0;

    svg {
      margin-right: 10px;
    }
  }
`
export const CloseBtn = styled(CloseButton)`
  padding: 30px 0px 6px 0;
`
export const CloseButtonWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid ${theme.PRIMARYBLUECOLOR200};
  padding: 30px 0px 30px 0;
  text-align: end;
  svg {
    cursor: pointer;
    margin-right: 30px;
  }
  @media (max-width: 514px) {
    padding: 20px 0px 20px 0;

    svg {
      margin-right: 10px;
    }
  }
`
export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  gap: 6px;
  @media (max-width: 514px) {
    svg {
      width: 80px;
      height: 80px;
    }
  }
`
export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
  max-width: 624px;
  border-top: 1px solid ${theme.PRIMARYBLUECOLOR200};
  padding: 24px;
`
export const AssignFormContainer = styled.form`
  width: 100%;
`
export const AssignedFormWrapper = styled.div`
  max-height: 500px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
  max-width: 624px;
  padding: 24px;
  @media (max-width: 1400px) {
    max-height: 314px;
  }
`
export const DriverFormContainer = styled(FormContainer)`
  border-top: unset;
  gap: 8px;
  padding: 10px 20px;
  max-width: 715px;
`
export const OrderFormContainer = styled(FormContainer)`
  gap: 10px;
`
export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  gap: 30px;
  @media (max-width: 514px) {
    max-width: 300px;
  }
`
export const AddContentContainer = styled(ContentContainer)`
  gap: 0px;
  @media (max-width: 767px) {
    max-width: 100%;
  }
`
export const DocumentContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
export const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 624px;
  padding: 24px 24px 24px 24px;
  border-bottom: 1px solid ${theme.PRIMARYBLUECOLOR200};

  svg {
    cursor: pointer;
  }
  @media (max-width: 767px) {
    max-width: 284px;
  }
`
export const DocumentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 650px;
  overflow-y: auto;
  @media (max-width: 1280px) {
    height: 560px;
  }
  @media (min-height: 570px) {
    height: 560px;
  }
  img {
    width: 100%;
  }
  .page {
    width: 600px;
  }
  @media (max-width: 1280px) {
    height: 260px;
  }
`
export const DocumentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const DocumentInnerWrapper = styled.div`
  height: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  @media (max-width: 1280px) {
    height: 390px;
  }
`
export const ImageWrapper = styled.img``
export const HeadingWrapper = styled.h3`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-align: center;
  color: ${theme.BLACKCOLOR};
  @media (max-width: 514px) {
    font-size: 18px;
    line-height: 24px;
  }
`
export const Description = styled.p`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: ${theme.BLACKCOLOR};
  @media (max-width: 514px) {
    font-size: 12px;
    line-height: 18px;
  }
`
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: 187px;
  }
  .cancel {
    background-color: ${theme.NEUTRALGREYCOLOR};
    color: ${theme.PRIMARYBLACKCOLOR};
  }
`
export const Resend = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: ${theme.BOXCOLOR};
`
export const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 635px;
  display: flex;
  gap: 20px;
  justify-content: end;
  border-top: 1px solid ${theme.PRIMARYBLUECOLOR200};
  padding: 20px;

  .cancel {
    background-color: ${theme.NEUTRALGREYCOLOR};
    color: ${theme.PRIMARYBLACKCOLOR};
  }
  .cancel-now {
    background-color: ${theme.ERROR};
  }
  @media (max-width: 767px) {
    max-width: 284px;
  }
`
export const ActionButtonWrapper = styled.div`
  width: 100%;
  max-width: 635px;
  display: flex;
  gap: 20px;
  justify-content: end;
  border-top: 1px solid ${theme.PRIMARYBLUECOLOR200};
  padding: 20px;
  button {
    width: 120px;
  }
  .cancel {
    background-color: ${theme.NEUTRALGREYCOLOR};
    color: ${theme.PRIMARYBLACKCOLOR};
  }
  .cancel-now {
    background-color: ${theme.ERROR};
  }
  @media (max-width: 767px) {
    max-width: 284px;
  }
`
export const ButtonWrap = styled(ButtonWrapper)`
  border-top: none;
  padding: 0;
  justify-content: center;
`
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`
export const AddFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 624px;
  padding: 24px;
  @media (max-width: 767px) {
    max-width: 284px;
  }
`
export const ActionFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 25px; */
  width: 100%;
  max-width: 624px;
  padding: 24px;
  @media (max-width: 767px) {
    max-width: 284px;
  }
`
export const RadioWrapper = styled.div`
  margin-bottom: 25px;
`
export const OptionWrapper = styled.div`
  display: flex;
  gap: 29px;
  width: 100%;
  max-width: 624px;
  @media (max-width: 767px) {
    max-width: 284px;
  }
  .ant-radio-wrapper .ant-radio-inner {
    width: 20px;
    height: 20px;
  }
`
export const Options = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const CancelFormContainer = styled(AddFormContainer)`
  padding: 37px 20px 2px;
`
export const UpdateDetailContainer = styled(AddDetailsWrapper)`
  max-height: 65vh;
  text-align: start;
  width: 624px;
  padding: 0 24px;
  gap: 0;
`
export const UpdateDriverDetailContainer = styled(UpdateDetailContainer)`
  overflow: auto;
`
export const DriverDetailsContainer = styled(AddDetailsWrapper)`
  max-height: 51vh;
  width: 623px;
  gap: 0;
  .detail-form {
    width: 623px;
    gap: 0;
  }
  .form-title {
    text-align: start;
  }
  .driver-details {
    max-height: 40vh;
  }
  .button-container {
    padding: 20px 0;
  }
  .toggle-button {
    .ant-switch.ant-switch-checked {
      width: 40px;
    }
    .ant-switch {
      width: 40px;
    }
  }
  @media (min-width: 1440px) and (max-width: 2560px) {
    width: 100%;
  }
`
