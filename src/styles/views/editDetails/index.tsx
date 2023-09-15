import styled from 'styled-components'
import { theme } from 'styles/theme'

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const MainHeading = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 16px;
  line-height: 40px;
  color: ${theme.BLACKCOLOR};
`
export const SubHeading = styled.div`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${theme.BLACKCOLOR};
`
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const DetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
`
export const InputWrapper = styled.div<{ error: any }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-height: 88px;
  width: 100%;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
  .price {
    width: 203px;
  }
`
export const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 43vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
export const SupportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 54vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
