import styled from 'styled-components'
import { theme } from 'styles/theme'

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 750px;
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

export const CloseButton = styled.div`
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

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
`
export const Heading = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-align: center;
  padding: 0 30px;
  color: ${theme.BLACKCOLOR};
  @media (max-width: 514px) {
    font-size: 18px;
    line-height: 24px;
  }
`
