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
export const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 15px;
`

export const SearchWrapper = styled.form`
  display: flex;
`

export const ButtonWrapper = styled.div`
  margin-left: 10px;
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

export const InputWrapper = styled.div`
  .ant-input-affix-wrapper {
    height: 40px;
  }
  .ant-input-affix-wrapper > input.ant-input {
    height: 28px;
  }
`

export const RecordsWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 475px;
`

export const LeftRecordsWrapper = styled.div`
  width: 30%;
`

export const RightRecordsWrapper = styled.div`
  width: 70%;
  margin: 0px 10px;
  overflow: auto;
  background-color: #263238;
`

export const CodeMirrorWrapper = styled.div`
  .CodeMirror {
    height: 475px;
  }
`

export const RecordLabel = styled.div`
  padding: 15px 10px;
  background: ${theme.SEMIBLUECOLOR};
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
`

export const MenuItemWrapper = styled.div`
  height: 90%;
  overflow: auto;
  border: 1px solid #99999940;
  border-radius: 0px 0px 5px 5px;
`

export const EmptyMenuItem = styled.div`
  height: 90%;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  border: 1px solid #99999940;
  border-radius: 0px 0px 5px 5px;
`

export const MenuItem = styled.div`
  padding: 15px 10px;
  cursor: pointer;
  font-family: 'Inter';
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  &:hover {
    background: ${theme.LIGHTBLUECOLOR};
  }
`
