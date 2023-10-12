import styled from 'styled-components'
import { theme } from 'styles/theme'

export const DriverProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  padding: 30px 40px;
  background-color: ${theme.WHITE};
  max-height: 69vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 767px) {
    padding: 30px 20px;
  }
`
export const DriverDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #00000014;
  padding-bottom: 20px;
`
export const DriverDetails = styled.div`
  display: flex;
  gap: 16px;
  img {
    height: 40px;
  }
`
export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const Title = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${theme.TITLECOLOR};
`
export const Detail = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const DriverTaskWrapper = styled.div`
  display: flex;
  gap: 10px;
`
export const TaskDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 85px;
`
export const TaskDetail = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 24px;
  line-height: 16px;
  color: ${theme.DARKBLACKCOLOR};
  text-align: center;
`
export const TaskTitle = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 10px;
  line-height: 18px;
  color: ${theme.GREYCOLOR};
`
export const DriverInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px 0 10px;
`
export const Heading = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const DriverInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 253px);
  grid-column-gap: 40px;
  grid-row-gap: 17px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 170px);
    grid-column-gap: 50px;
  }
`
export const HubInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 40px;
  grid-row-gap: 17px;

  .addPin {
    margin-top: 24px;
    width: 120px;
    height: 44px;
    /* :hover {
      background: ${theme.PRIMARYCOLOR};
      color: ${theme.WHITE};
    } */
  }
`
export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
export const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
export const InfoTitle = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: ${theme.TITLECOLOR};
`
export const DriverInfo = styled.div`
  display: flex;
  gap: 5px;
`
export const InfoDetails = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: ${theme.PRIMARYBLACKCOLOR};
  text-transform: capitalize;
  li {
    list-style: none;
    padding: 0;
  }
`
export const DriverInfoDetails = styled(InfoDetails)`
  text-transform: unset;
`
export const InfoDetailsLink = styled.a`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: ${theme.PRIMARYCOLOR};
  cursor: pointer;
`
export const MaskPanCard = styled.div`
  display: flex;
  gap: 4px;
  svg {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 0 0;
  gap: 10px;
  button {
    max-width: 187px;
  }
  .cancel {
    background-color: ${theme.NEUTRALGREYCOLOR};
    color: ${theme.PRIMARYBLACKCOLOR};
  }
`
