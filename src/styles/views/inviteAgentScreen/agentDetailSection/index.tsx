import styled from 'styled-components'
import { theme } from 'styles/theme'

export const AgentDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 34px;
  width: 100%;
  max-width: 715px;
  svg {
    cursor: pointer;
  }
`
export const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 715px;
  width: 100%;
`
export const MainHeading = styled.h2`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const SubHeading = styled.p`
  max-width: 608px;
  width: 100%;
  font-family: 'Inter';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${theme.NEUTRALBLACKCOLOR};
`
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 715px;
  width: 100%;
`
export const InputWrapper = styled.div<{ error: any }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  /* min-height: 88px; */
  width: 100%;
`
export const PanInputWrapper = styled.div<{ error: any }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  position: relative;
  svg {
    height: 18px;
    position: absolute;
    right: 10px;
    top: 40px;
  }
`
export const Label = styled.div`
  color: ${theme.PRIMARYBLACKCOLOR};
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
`
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  button {
    width: 190px;
    height: 56px;
  }
`
export const WeightWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 5px 10px;
  input {
    height: 27.5px;
    border: none;
    border-right: 1px solid rgba(0, 0, 0, 0.21);
    border-radius: unset;
    padding: unset;
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
`
export const WeightButtonContainer = styled.div`
  display: flex;

  button {
    width: 54px;
    height: 32px;
    font-family: 'Inter';
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  .lbs {
    color: black;
  }
`
export const AssignedButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 9px;
  margin: 13px 0;

  button {
    width: 99px;
    height: 28px;
    font-family: 'Inter';
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    padding: 6px 9px;
    border-radius: 8px;
  }

  .filled {
    color: #196aab;
    background: rgba(7, 16, 24, 0.04);
  }
  .notfilled {
    font-family: 'Inter';
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #1d1d1d;
    border: 1px solid #b9b9b9;
  }
`
export const DetailWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 23px;
`
export const UploadDocumentsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cfcfcf9e;
  :nth-last-child(2) {
    border-bottom: none;
  }
`
export const DocumentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 25px 0;
`
export const DocumentTitle = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const DocumentDetail = styled.div`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${theme.GREYCOLOR};
`
export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const UploadButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .ant-btn {
    width: 120px;
    border: 2px solid ${theme.PRIMARYBLUECOLOR};
    svg {
      color: ${theme.PRIMARYBLUECOLOR};
      width: 15px;
      height: 15px;
    }
    span {
      color: ${theme.PRIMARYBLUECOLOR};
      font-size: 14px;
      line-height: 18px;
      font-weight: 600;
    }
  }
`
export const OptionWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  gap: 15px;
  margin-top: 10px;
`
export const BankDetailWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 23px;
`
export const UploadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
export const ErrorMessageWrapper = styled.p`
  :first-child {
    ::first-letter {
      text-transform: uppercase;
    }
  }
`
