import styled from 'styled-components'
import { theme } from 'styles/theme'
interface IActive {
  active: boolean
}

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  background: #eff8ff;
  margin: 12px 0 16px 17px;
  border-radius: 8px;
  align-items: center;
  @media (max-width: 1068px) {
    display: none;
  }
`
export const LogoContainer = styled.div`
  width: 100%;
`
export const LogoWrapper = styled.div`
  padding: 38px 0 0 38px;
  width: 120px;
  height: 48px;
  @media (max-width: 768px) {
    padding: 38px 0 0 10px;
  }
`
export const LogoImage = styled.img`
  width: 100%;
`

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 428px;
  img {
    width: 100%;
  }
`
export const InviteWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const InviteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 38px;
`
export const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 623px;
  width: 100%;
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
`
export const SelectionWrapper = styled.div`
  display: flex;
  gap: 30px;
  max-width: 623px;
  width: 100%;
`
export const TitleSection = styled.div<IActive>`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${({ active }) => (active ? `${theme.PRIMARYBLACKCOLOR}` : `${theme.BORDERCOLOR}`)};
  :hover {
    color: 1px solid ${theme.PRIMARYBLACKCOLOR};
  }
`
export const AdminWrapper = styled.div<IActive>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  max-width: 302px;
  width: 100%;
  min-height: 285px;
  border: 1px solid ${({ active }) => (active ? `${theme.PRIMARYCOLOR}` : `${theme.BORDERCOLOR}`)};
  border-radius: 12px;
  cursor: pointer;
  :hover {
    border: 1px solid ${theme.PRIMARYCOLOR};
    ${TitleSection} {
      color: ${theme.PRIMARYBLACKCOLOR};
    }
  }
`

export const AdminImageBackground = styled.div`
  max-width: 116px;
  width: 100%;
  min-height: 116px;
  border-radius: 50%;
  background-color: ${theme.INVITEBACKGROUNDCOLOR};
  position: relative;
  svg {
    position: absolute;
    inset: 0;
    margin: auto;
  }
`
