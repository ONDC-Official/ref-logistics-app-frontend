import styled from 'styled-components'
import { theme } from 'styles/theme'

export const RecordContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`
export const CardContainer = styled.div`
  width: 100%;
  max-width: 348px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: ${theme.WHITE};
  border-radius: 16px;
  padding: 27.5px 15px 27.5px 15px;
  @media (max-width: 768px) {
    padding: 17.5px 10px 17.5px 10px;
    gap: 6px;
  }
`

export const DetailContainer = styled.div`
  display: flex;
  gap: 10px;
`
export const IconWrapper = styled.div`
  width: 49px;
  height: 49px;
  background-color: ${theme.BOXCOLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`
export const CountingSection = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  color: ${theme.BOXCOLOR};
  @media (max-width: 768px) {
    font-size: 32px;
  }
`
export const Description = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${theme.BLACKCOLOR};
  @media (max-width: 768px) {
    font-size: 14px;
  }
`
export const SubDescription = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Inter';
  font-weight: 600;
  font-size: 12px;
  line-height: 19px;
  color: ${theme.BOXCOLOR};
  .count {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
  }
`
