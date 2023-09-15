import styled from 'styled-components'
import { theme } from 'styles/theme'

export const AddDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  overflow-y: auto;

  @media (min-width: 1440px) and (max-width: 2560px) {
    width: 100%;
  }
  @media (max-width: 1068px) {
    width: 100%;
  }
`
export const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 715px;
  width: 100%;
  @media (min-width: 1440px) and (max-width: 2560px) {
    max-width: 100%;
  }
  @media (max-width: 1068px) {
    max-width: 715px;
  }
`
export const MainHeading = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const SubHeading = styled.div`
  max-width: 608px;
  width: 100%;
  font-family: 'Inter';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${theme.NEUTRALBLACKCOLOR};
  @media (min-width: 1440px) and (max-width: 2560px) {
    max-width: 100%;
  }
`
export const DetailsFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (min-width: 1440px) and (max-width: 2560px) {
    max-width: 100%;
  }
`
export const PersonalDetailsWrapper = styled(DetailsFormWrapper)`
  padding-top: 24px;
`
export const PersonalDetailsContainer = styled.div`
  svg {
    display: none;
  }

  @media (max-width: 1068px) {
    svg {
      display: block;
    }
  }
`
export const PersonalDetailsUpdate = styled.div`
  padding: 20px;
`
export const UpdateDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 767px;
  margin: 0 auto;
  background-color: ${theme.LIGHTBLUECOLOR};
  min-height: calc(100vh - 73px);

  svg {
    cursor: pointer;
  }
`
export const DetailContainer = styled.div``
export const DetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 23px;
`
export const DetailsContainer = styled(DetailsWrapper)`
  gap: 23px 33px;
`
export const InputWrapper = styled.div<{ error: any }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-height: 84px;
`
export const LocationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`
export const Title = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
`
export const LocationImage = styled.div`
  width: 100%;
  max-width: 712px;
  min-height: 216px;
  > canvas {
    height: 300px;
    width: 700px;
  }
  img {
    width: 100%;
  }
  @media (min-width: 1440px) and (max-width: 2560px) {
    max-width: 100%;
  }
`
export const SelectInputWrapper = styled.div<{ error: any }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 84px;
  .ant-select-single .ant-select-selector {
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    font-family: 'Inter';
  }
`
export const UploadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cfcfcf9e;
`
export const AvailabilityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #cfcfcf9e;
  gap: 38px;
  margin-bottom: 38px;
  padding-top: 24px;
  .ant-collapse {
    border: none;
    border-radius: 0px;
  }
  .ant-collapse > .ant-collapse-item {
    border-bottom: none;
  }
  .ant-collapse-header-text {
    font-family: 'Inter';
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: ${theme.PRIMARYBLACKCOLOR};
  }
  .ant-collapse > .ant-collapse-item:last-child > .ant-collapse-header {
    background: ${theme.LIGHTBLUECOLOR};
    border-radius: 0px;
  }
  .ant-collapse .ant-collapse-content {
    border-top: none;
  }
  .ant-switch.ant-switch-checked {
    background: ${theme.PRIMARYBLUECOLOR};
  }
  .ant-picker {
    border: 1px solid ${theme.BORDERCOLOR};
  }
`
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
export const ButtonWrapper = styled.div`
  display: flex;
  gap: 7px;
  .ant-switch.ant-switch-checked {
    background: ${theme.PRIMARYBLUECOLOR};
  }
  .ant-switch.ant-switch-checked:hover:not(.ant-switch-disabled) {
    background: ${theme.PRIMARYBLUECOLOR};
  }
`
export const ThresholdWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 23px;
`
export const ButtonContainer = styled.div`
  button {
    flex-direction: row-reverse;
    gap: 6px;
    width: max-content;
  }
`
export const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  border-top: 1px solid #d0d9e4;
  padding: 21px 0 38px 0;
  margin-top: 25px;
`
export const NotificationContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
export const NotificationTitle = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const SwitchButton = styled.div`
  .ant-switch.ant-switch-checked {
    background: ${theme.PRIMARYBLUECOLOR};
  }
  .ant-switch.ant-switch-checked:hover:not(.ant-switch-disabled) {
    background: ${theme.PRIMARYBLUECOLOR};
  }
`
export const PasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 38vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
export const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 49vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
