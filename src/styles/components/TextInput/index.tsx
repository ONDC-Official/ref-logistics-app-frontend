import styled from 'styled-components'
import { theme } from 'styles/theme'

export const InputWrapper = styled.div<{ error: any }>`
  width: 100%;
  input {
    height: 44px;
    border-color: ${({ error }: any) => (error ? `${theme.ERROR}` : `${theme.BORDERCOLOR}`)};
    border-radius: ${({ error }: any) => (error ? '8px 8px 2px 2px' : '8px')};
    border-radius: ${({ error }: any) => (error ? '8px 8px 2px 2px' : '8px')};
    box-shadow: ${({ error }: any) => (error ? `inset 0px -2px 0px ${theme.ERROR}` : '')};
  }
  .ant-input {
    &:focus {
      box-shadow: none !important;
      border-color: ${({ error }: any) => (error ? `${theme.ERROR}` : '#b9b9b9')};
    }
    &:hover {
      outline: none !important;
      box-shadow: ${({ error }: any) => (error ? `inset 0px -2px 0px ${theme.ERROR}` : '')};
      border-color: ${({ error }: any) => (error ? `${theme.ERROR}` : '#b9b9b9')};
    }
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
