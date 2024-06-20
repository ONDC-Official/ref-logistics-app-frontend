import styled from 'styled-components'
import { theme } from 'styles/theme'
import { MapLocationImage } from 'styles/views/driverFlowHome'

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 60px;
  gap: 16px;
`
export const IssuesMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 60px;
  gap: 16px;
`
export const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const BreadcrumbWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`
export const MainHeading = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 29px;
  padding: 30px 40px;
  border-radius: 16px;
  background: ${theme.WHITE};
  max-height: 69vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
export const DetailSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 29px;
`
export const MapWrapper = styled(MapLocationImage)`
  height: 600px;
  #map {
    height: 600px;
    max-width: 100%;
    /* max-width: 600px; */
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  button {
    width: 187px;
  }
  .cancel-button {
    background: ${theme.ERROR};
  }
`
