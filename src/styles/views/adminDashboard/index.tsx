import styled from 'styled-components'
import { theme } from 'styles/theme'

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`
export const RightSection = styled.div`
  display: flex;
  gap: 15px;
`
export const FilterWrapper = styled.div`
  display: flex;
  gap: 15px;
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    width: 111px;
    height: 39px !important;
    border: 1px solid ${theme.BOXCOLOR} !important;
  }
  .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
    color: ${theme.PRIMARYCOLOR};
  }
`
