import styled from 'styled-components'
import { theme } from 'styles/theme'

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 203px !important;
  border-radius: 4px;
  a {
    font-family: 'Inter';
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    text-decoration: none;
    width: 100%;
    color: ${theme.PRIMARYBLACKCOLOR};
  }

  a.active {
    color: ${theme.ORANGERUST};
  }
`
export const Title = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: ${theme.PRIMARYBLACKCOLOR};
  cursor: pointer;
`
export const NavbarContainer = styled.div`
  padding: 10px;
  background: #ffffff;
  display: flex;
`
export const LeftSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 0 30px;
  border-right: 1px solid #e8e8e8;
`
export const LogoSection = styled.div`
  cursor: pointer;
  img {
    height: 40px;
  }
`
export const NameSection = styled.div`
  display: grid;
  font-weight: 700;
  font-size: 24px;
  font-family: 'Inter';
  color: ${theme.PRIMARYBLACKCOLOR};
  @media (max-width: 768px) {
    display: none;
  }
`
export const User = styled.div`
  font-weight: 700;
  font-size: 14px;
  text-transform: capitalize;
`
export const RightSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 20px;
  padding: 0 40px 0 20px;

  .ant-input-affix-wrapper-focused {
    border: 1px solid #b9b9b9 !important;
    box-shadow: none;
  }
  .ant-input-affix-wrapper {
    padding: 0 3px 0 5px !important;
    width: 348px;
  }
  .ant-input-prefix {
    height: 44px;
  }
`

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  svg {
    cursor: pointer;
  }

  .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item:hover {
    background-color: white;
  }
`
export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`
export const OptionsWrapper = styled.div`
  display: flex;
  svg {
    cursor: pointer;
  }
`
export const UserRole = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: ${theme.GREYCOLOR};
  margin-top: 5px;
  text-transform: capitalize;
  font-weight: 400;
`
export const Username = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  color: ${theme.PRIMARYBLACKCOLOR};
  text-transform: capitalize;
  width: max-content;
`
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: max-content !important;
  border-radius: 4px;
`
