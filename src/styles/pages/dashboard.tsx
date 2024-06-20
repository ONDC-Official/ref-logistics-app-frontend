import styled, { keyframes } from 'styled-components'
import { theme } from 'styles/theme'

export const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`
export const DetailWrapper = styled.div`
  display: flex;
  background-color: ${theme.LIGHTBLUECOLOR};
  padding: 20px;
`

const rollout = keyframes`
  0%{
      opacity:0;
      transform:translateY(-20px);
      visibility:hidden;
    
    }

   
  100%{
      opacity:1;
      transform:translateY(0);
      visibility:visible;
  }
`
export const DetailContainer = styled.div`
  width: 100%;
  animation: 0.4s ${rollout} ease-in-out;
  will-change: opacity transform;
  overflow-x: hidden;
  @media (max-width: 1280px) and (max-height: 577px) {
    overflow-y: scroll;
    max-height: 450px;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`
