import styled from 'styled-components'
import { theme } from 'styles/theme'

export const SelectWrapper = styled.div<{ error: any }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-height: 42px;
  .ant-select-selector {
    border: ${({ error }: any) => (error ? `1px solid ${theme.ERROR}` : `1px solid ${theme.BORDERCOLOR}`)};
    border-radius: ${({ error }: any) => (error ? '8px 8px 2px 2px' : '8px')};
    border-radius: ${({ error }: any) => (error ? '8px 8px 2px 2px' : '8px')};
    box-shadow: ${({ error }: any) => (error ? `inset 0px -2px 0px ${theme.ERROR}` : '')};
    outline: none;
    width: 100%;
    height: 44px !important;
    padding-top: 5px !important;
  }
  .ant-select {
    width: 100%;
  }
  .ant-select-arrow {
    color: ${theme.TITLECOLOR};
    font-size: unset;
  }
  .ant-select-selector .ant-select-selection-search-input {
    height: 44px !important;
  }
  .ant-select-arrow > span {
    svg {
      fill: ${theme.TITLECOLOR};
    }
  }
  .ant-select-single .ant-select-selector .ant-select-selection-item > span {
    color: ${theme.TITLECOLOR};
  }
  .ant-select-selector {
    border: ${({ error }: any) => (error ? `1px solid ${theme.ERROR}` : `1px solid ${theme.BORDERCOLOR}`)} !important;
    border-radius: ${({ error }: any) => (error ? '8px 8px 2px 2px' : '8px')};
    border-radius: ${({ error }: any) => (error ? '8px 8px 2px 2px' : '8px')};
    box-shadow: ${({ error }: any) => (error ? `inset 0px -2px 0px ${theme.ERROR}` : '')};
  }
`
