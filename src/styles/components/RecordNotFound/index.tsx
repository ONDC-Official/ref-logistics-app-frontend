import styled from 'styled-components'
import { theme } from 'styles/theme'

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  padding: 30px 25px;
  gap: 18px;
`
export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const TitleWrapper = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
  text-align: center;
  color: ${theme.BLACKCOLOR};
`
