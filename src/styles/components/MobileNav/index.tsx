import styled from 'styled-components'
import { theme } from 'styles/theme'

export const MobileNavbarWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${theme.WHITE};
  border-top: 1px solid rgba(0, 0, 0, 0.13);
  padding: 13px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 767px;
  margin: 0 auto;
`
export const NavHeading = styled.h3``
export const NavLinkWrapper = styled.div`
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    flex-direction: column;
    font-family: 'Inter';
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: ${theme.NAVGREYCOLOR};
    text-decoration: none;
  }
  a:hover {
    color: ${theme.PRIMARYCOLOR};
    svg {
      path {
        fill: ${theme.PRIMARYCOLOR};
      }
    }
  }
  a.active {
    color: ${theme.PRIMARYCOLOR};
    svg {
      path {
        fill: ${theme.PRIMARYCOLOR};
      }
    }
  }
`
