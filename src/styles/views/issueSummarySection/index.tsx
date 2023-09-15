import styled from 'styled-components'
import { theme } from 'styles/theme'
interface IProps {
  status?: string
  variant?: 'contained' | 'Escalate' | 'Resolved' | 'disabled' | 'inProgress' | 'Pending' | 'Active' | 'Inactive'
}

export const IssueSummaryContainer = styled.div`
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
`
export const IssueDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`
export const IssueDetails = styled.div``
export const IssueHeading = styled.div`
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  color: ${theme.TITLECOLOR};
`
export const IssueNumber = styled.div`
  font-family: 'Inter';
  font-size: 20px;
  font-weight: 700;
`
export const FeedBackWrapper = styled.div`
  display: flex;
  gap: 10px;
  svg {
    width: 26px;
    height: 24px;
  }
`
export const GoodFeedBackWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
export const ButtonWrapper = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;

  button {
    width: 134px;
  }
  .cancel {
    background-color: ${theme.NEUTRALGREYCOLOR};
    color: ${theme.PRIMARYBLACKCOLOR};
  }
`
export const CustomerDetailsWrapper = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 28px 0;
`
export const CustomerDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`
export const CustomerHeading = styled.div`
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 700;
`
export const CustomerInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  gap: 26px 6px;
`
export const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
`
export const CustomerInfoHeading = styled.div`
  font-family: 'Inter';
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  color: ${theme.TITLECOLOR};
`
export const CustomerInfoDetails = styled.div`
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const StatusButton = styled.div<IProps>`
  width: max-content;
  border: 1.5px solid ${theme.BOXCOLOR};
  border-radius: 4px;
  padding: 6px 10px;
  color: ${theme.BOXCOLOR};
  font-family: 'Inter';
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  border: 1.5px solid
    ${(props) =>
      props.status == 'CLOSED'
        ? theme.ERROR
        : props.status == 'RESOLVED'
        ? theme.PRIMARYGREENCOLOR
        : theme.PRIMARYCOLOR};
  color: ${(props) =>
    props.status == 'CLOSED' ? theme.ERROR : props.status == 'RESOLVED' ? theme.PRIMARYGREENCOLOR : theme.PRIMARYCOLOR};
`
export const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 28px 0;
`
export const OrderInfoDetails = styled.div`
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const OrderDescription = styled.div``
export const DescriptionHeading = styled.div`
  font-family: 'Inter';
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  color: ${theme.TITLECOLOR};
`
export const Description = styled.div`
  color: ${theme.PRIMARYBLACKCOLOR};
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  padding-top: 7px;
`
export const ActionTakenDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 28px 0;
  .ant-steps .ant-steps-item-process .ant-steps-item-icon {
    background-color: ${theme.SUCCESS};
    border-color: ${theme.SUCCESS};
  }
  .ant-steps .ant-steps-item-finish .ant-steps-item-icon {
    background-color: ${theme.SUCCESS};
    border-color: ${theme.SUCCESS};
    svg {
      path {
        fill: ${theme.WHITE};
      }
    }
  }
  .ant-steps .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
    background-color: ${theme.SUCCESS};
  }
  .ant-steps
    .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process)
    > .ant-steps-item-container[role='button']:hover
    .ant-steps-item-icon {
    border-color: transparent;
    .ant-steps-icon {
      color: #00000073;
    }
  }
  .ant-steps
    .ant-steps-item:not(.ant-steps-item-active)
    > .ant-steps-item-container[role='button']:hover
    .ant-steps-item-title {
    color: #00000073 !important;
  }
  .ant-steps
    .ant-steps-item:not(.ant-steps-item-active)
    > .ant-steps-item-container[role='button']:hover
    .ant-steps-item-description {
    color: #00000073 !important;
  }
`
export const ActionStepperWrapper = styled.div`
  height: auto;
  display: flex;
`
