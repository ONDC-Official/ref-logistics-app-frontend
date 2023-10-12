import styled from 'styled-components'
import { theme } from 'styles/theme'

export const TrackingDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 0 140px 126px 140px;
`
export const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    width: 15%;
  }
`
export const MainHeading = styled.h3`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: ${theme.BLACKCOLOR};
`
export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  border: 1px solid #00000026;
  border-radius: 10px;
  padding: 20px 17px;
`
export const OrderInformationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
export const OrderDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
export const TrackingID = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: ${theme.BLACKCOLOR};
`
export const OrderPlacementDate = styled.div`
  font-family: 'Inter';
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${theme.GREYCOLOR};
`
export const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
export const Title = styled.div`
  font-family: 'Inter';
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${theme.GREYCOLOR};
`
export const OrderStatus = styled.div`
  width: max-content;
  border-radius: 21px;
  padding: 6px 10px;
  font-family: 'Inter';
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  background: #419e6a38;
  color: #419e6a;
`
export const OrderWrapper = styled.div`
  border-radius: 10px;
  border: 1px solid #00000026;

  /***** TABLE CSS******/

  .ant-table {
    border-radius: 0 0 10px 10px;
  }
  .ant-table-wrapper .ant-table-thead > tr > th {
    background: ${theme.BLUECOLOR};
    font-family: 'Inter';
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: ${theme.PRIMARYBLACKCOLOR};
    ::before {
      background-color: none !important;
    }
  }
  .ant-table-wrapper .ant-table-container table > thead > tr:first-child > *:first-child {
    border-start-start-radius: 0;
  }
  .ant-table-wrapper .ant-table-container table > thead > tr:first-child > *:last-child {
    border-start-end-radius: 0;
  }
  .ant-table-wrapper .ant-table {
    font-family: 'Inter';
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: ${theme.GREYCOLOR};
  }
`
export const TitleWrapper = styled.div`
  background: #f5f5f5;
  border-radius: 10px 10px 0 0;
`
export const OrderStatusTitle = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: ${theme.PRIMARYBLACKCOLOR};
  padding: 26px 42px;
  span {
    color: ${theme.PRIMARYCOLOR};
  }
`
export const OrderStepperWrapper = styled.div`
  height: auto;
  display: flex;
  padding: 44px 74px;
  overflow: auto;

  /***** STEPPER CSS *****/
  .ant-steps.ant-steps-dot .ant-steps-item-content {
    max-width: 210px;
    min-width: 210px;
    width: 100%;
    font-family: 'Inter';
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
  .ant-steps .ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
    max-width: 210px;
    width: 100%;
  }
`
export const OrderTrackingStepperWrapper = styled.div`
  height: auto;
  display: flex;
  padding: 44px 74px;
  overflow: auto;

  /***** STEPPER CSS *****/
  .ant-steps.ant-steps-dot .ant-steps-item-content {
    min-width: 210px;
    max-width: 210px;
    width: 100%;
    font-family: 'Inter';
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
  .ant-steps .ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
    min-width: 210px;
    max-width: 210px;
    width: 100%;
  }
`
export const LocationWrapper = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
/****** LOCATION POPUP CSS ********/

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  min-height: 300px;
  border: 1px solid ${theme.NEUTRALGREYCOLOR};
  border-radius: 6px;
  padding: 10px;
  #map {
    height: 300px;
    > canvas {
      height: 300px;
    }
  }
`
export const Heading = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${theme.PRIMARYCOLOR};
`
/****** ORDER STATUS MODAL CSS ********/

export const OrderStatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  min-height: 330px;
  border: 1px solid ${theme.NEUTRALGREYCOLOR};
  border-radius: 6px;
  padding: 10px;
`
export const OrderHeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
export const SubTitle = styled.div`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${theme.GREYCOLOR};
`
export const OrderImageWrapper = styled.div`
  max-width: 399px;
  width: 100%;

  img {
    max-width: 399px;
    width: 100%;
  }
`
