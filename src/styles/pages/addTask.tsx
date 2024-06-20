import styled from 'styled-components'
import { theme } from 'styles/theme'

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 60px;
  gap: 16px;
`
export const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
export const BreadcrumbWrapper = styled.div``
export const MainHeading = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
