import styled from 'styled-components'
import { theme } from 'styles/theme'

export const OrderMainWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 1300px) {
    flex-wrap: wrap;
  }
`

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const DeliveryDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 19px;
  border-bottom: 1px solid #00000014;
`
export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`
export const WrapperTitle = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${theme.TITLECOLOR};
`
export const WrapperDetail = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const IconWrapper = styled.div`
  display: flex;
  gap: 12px;
  svg {
    cursor: pointer;
  }
`
export const DriverDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 28px 0;
  border-bottom: 1px solid #00000014;
`
export const Heading = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const DetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`
export const TableWrapper = styled.div`
  width: 100%;
  max-width: 600px;
`
export const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const AddressDetail = styled.pre`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${theme.PRIMARYBLACKCOLOR};
  span {
    font-weight: 400;
    padding-left: 6px;
    text-transform: capitalize;
  }
`
export const OrderDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 18px 0;
`
export const OrderDetailHeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const LocationOrderDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px 0;
`
export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  /* padding: 18px 0; */
`
export const StatusWrapper = styled.div`
  width: max-content;
  border: 1.5px solid ${theme.BOXCOLOR};
  border-radius: 4px;
  padding: 6px 10px;
  color: ${theme.BOXCOLOR};
  font-family: 'Inter';
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
`
