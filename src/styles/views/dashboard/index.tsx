import styled from 'styled-components'
import { theme } from 'styles/theme'

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 60px;
  min-height: calc(100% - 106px);
  @media (max-width: 1200px) {
    padding: 0 0 0 20px;
  }
`
export const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`
export const Container = styled.div`
  display: flex;
  gap: 15px;
`
export const MainHeading = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const NotificationWrapper = styled.div`
  width: max-content;
  border-radius: 8px;
  background-color: ${theme.WHITE};
  display: flex;
  padding: 8px 16px;
  gap: 10px;
`
export const NotificationTitle = styled.div`
  font-family: 'Inter';
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #0f172a;
`
export const InviteWrapper = styled.div`
  display: flex;
  gap: 8px;
`
export const ImageWrapper = styled.div`
  max-width: 1000px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  button {
    flex-direction: row-reverse;
    width: 135px;
    height: 40px;
    gap: 10px;
    font-weight: 600;
    font-size: 14px;
  }
  .active-button {
    svg {
      path {
        fill: ${theme.WHITE};
      }
    }
  }
  .color {
    background-color: ${theme.SECONDARYBLUECOLOR};
  }
`
export const AdminButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  button {
    flex-direction: row-reverse;
    width: 135px;
    height: 40px;
    gap: 10px;
    font-weight: 600;
    font-size: 14px;
    :hover {
      background-color: ${theme.SECONDARYBLUECOLOR};
      color: ${theme.WHITE};
      svg {
        path {
          fill: ${theme.WHITE};
        }
      }
    }
  }
  .active-button {
    svg {
      path {
        fill: ${theme.WHITE};
      }
    }
  }
  .color {
    background-color: ${theme.SECONDARYBLUECOLOR};
  }
`
export const DashboardInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 15px;
`

export const ActivityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 16px;
  padding: 30px 25px;
  gap: 18px;
  @media (max-width: 1300px) {
    width: 66.225vw;
    padding: 20px 14px;
  }
  @media (max-width: 1024px) {
    width: 68.225vw;
    padding: 20px 10px;
  }
  @media (max-width: 768px) {
    width: 65.225vw;
  }
  .ant-table-wrapper .ant-table-thead > tr > th {
    background: ${theme.SEMIBLUECOLOR};
    font-family: 'Inter';
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    padding: 14px 12px;

    color: ${theme.PRIMARYBLACKCOLOR};
    ::before {
      background-color: none !important;
    }
  }
  .ant-table-cell {
    svg {
      cursor: pointer;
    }
  }
  .ant-table-wrapper .ant-table-container table > thead > tr:first-child > *:first-child {
    border-start-start-radius: 0;
  }
  .ant-table-wrapper .ant-table-container table > thead > tr:first-child > *:last-child {
    border-start-end-radius: 0;
  }
  .ant-table-wrapper .ant-table-thead > tr > th::before {
    background: none !important;
  }
  .ant-table-wrapper .ant-table-tbody > tr > td {
    font-family: 'Inter';
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: ${theme.GREYCOLOR};
    padding: 14px;
    span {
      cursor: pointer;
    }
  }
  .ant-table-wrapper .ant-table-pagination.ant-pagination {
    margin: 16px 0 0;
  }
  .ant-table-wrapper .ant-table-thead > tr > td {
    background: ${theme.SEMIBLUECOLOR};
  }
  .ant-table-wrapper .ant-table .ant-table-header {
    border-radius: 0px;
  }
`
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
export const Title = styled.h3`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const InputWrapper = styled.div`
  .ant-input-affix-wrapper {
    height: 40px;
  }
  .ant-input-affix-wrapper > input.ant-input {
    height: 28px;
  }
`
export const ButtonContainer = styled.div`
  button {
    width: 120px;
    height: 40px;
    font-size: 14px;
    line-height: 18px;
    border-radius: 4px;
  }
`
export const AgentName = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const UpdateButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding-top: 20px;
  justify-content: center;

  .cancel {
    background-color: ${theme.NEUTRALGREYCOLOR};
  }
  .update {
    width: 200px;
  }
`
export const EditButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: end;
  border-top: 1px solid #bcc6fc;
  padding-top: 20px;
  button {
    width: 120px;
  }
  .cancel {
    background-color: ${theme.NEUTRALGREYCOLOR};
    color: ${theme.BLACKCOLOR};
  }
`
export const TabWrapper = styled.div`
  max-width: 1450px;
  width: 100%;
  overflow-x: auto;
  .ant-tabs .ant-tabs-ink-bar {
    background: ${theme.SECONDARYBLUECOLOR};
  }
  .ant-tabs .ant-tabs-tab {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    font-family: 'Inter';
  }
  .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${theme.SECONDARYBLUECOLOR};
  }
`
export const StatusButtonContainer = styled.div`
  button {
    width: 120px;
    height: 40px;
    font-size: 14px;
    line-height: 18px;
    border-radius: 4px;
  }
`

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 60px;
  gap: 25px;
  img {
    width: 100%;
  }
  @media (max-width: 1300px) {
    padding: 0px 20px;
  }
`
export const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 15px;
`
