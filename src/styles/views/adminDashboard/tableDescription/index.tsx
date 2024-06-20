import styled, { keyframes } from 'styled-components'
import { theme } from 'styles/theme'
interface IProps {
  status?: string | boolean
  variant?: 'contained' | 'Escalate' | 'Resolved' | 'disabled' | 'inProgress' | 'Pending' | 'Active' | 'Inactive'
}

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const TableWrapper = styled.div`
  .ant-table-row .ant-table-row-level-0 {
    cursor: pointer;
  }
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
`
export const Heading = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${theme.PRIMARYCOLOR};
`
export const DetailWrapper = styled.div`
  display: flex;
  gap: 52px;
`
export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
export const Title = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: ${theme.PRIMARYBLACKCOLOR};
  width: 100px;
`
export const AddressTitle = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: ${theme.PRIMARYBLACKCOLOR};
  width: 200px;
`
export const Content = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: ${theme.GREYCOLOR};
  text-transform: capitalize;
  width: 100px;
`
export const AddressContent = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: ${theme.GREYCOLOR};
  text-transform: capitalize;
  width: 200px;
`
export const ActionWrapper = styled.div`
  display: flex;
  gap: 16px;
`
export const DriverInfoWrapper = styled.div`
  display: flex;
  gap: 10px;
  img {
    width: 32px !important;
  }
`
export const Name = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const UserRole = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  color: ${theme.PRIMARYBLACKCOLOR};
`

export const StatusWrapper = styled.div<IProps>`
  max-width: 100px;
  width: 100%;
  padding: 4px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  border: 1.5px solid
    ${(props) =>
      props.status === 'Order-delivered'
        ? theme.SUCCESS
        : props.status === 'Cancelled'
        ? theme.ERROR
        : theme.PRIMARYCOLOR};
  color: ${(props) =>
    props.status === 'Order-delivered'
      ? theme.SUCCESS
      : props.status === 'Cancelled'
      ? theme.ERROR
      : theme.PRIMARYCOLOR};
`
export const TaskStatusWrapper = styled.div<IProps>`
  width: max-content;
  padding: 4px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  border: 1.5px solid
    ${(props) =>
      props.status === 'Order-delivered'
        ? theme.SUCCESS
        : props.status === 'Cancelled'
        ? theme.ERROR
        : theme.PRIMARYCOLOR};
  color: ${(props) =>
    props.status === 'Order-delivered'
      ? theme.SUCCESS
      : props.status === 'Cancelled'
      ? theme.ERROR
      : theme.PRIMARYCOLOR};
  /* @media (max-width: 1280px) {
    width: 100%;
    max-width: fit-content;
  } */
`
export const ActionStatusWrapper = styled.div<IProps>`
  max-width: 100px;
  width: 100%;
  padding: 4px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
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
export const PopoverWrapper = styled.div`
  .ant-popover-content {
    width: 100px !important;
  }
  .ant-popover .ant-popover-inner {
    width: 100%;
    max-width: 120px;
  }
`
export const DriverStatusConatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: max-content;
`
export const DriverStatusWrapper = styled(StatusWrapper)<IProps>`
  border: 1.5px solid
    ${(props) => (props.status == '1' ? theme.PRIMARYCOLOR : props.status == '2' ? theme.ERROR : theme.WARNING)};
  color: ${(props) => (props.status == '1' ? theme.PRIMARYCOLOR : props.status == '2' ? theme.ERROR : theme.WARNING)};
`
export const DriverStateWrapper = styled(StatusWrapper)<IProps>`
  border: 1.5px solid
    ${(props) =>
      props.status == 'Soft Lock'
        ? theme.PRIMARYGREENCOLOR
        : props.status == 'Available'
        ? theme.PRIMARYCOLOR
        : props.status == 'Locked'
        ? theme.WARNING
        : theme.ERROR};
  color: ${(props) =>
    props.status == 'Soft Lock'
      ? theme.PRIMARYGREENCOLOR
      : props.status == 'Available'
      ? theme.PRIMARYCOLOR
      : props.status == 'Locked'
      ? theme.WARNING
      : theme.ERROR};
`
export const BlockDriverStatusWrapper = styled(StatusWrapper)<IProps>`
  border: 1.5px solid ${(props) => (props.status == true ? theme.ERROR : theme.PRIMARYCOLOR)};
  color: ${(props) => (props.status == true ? theme.ERROR : theme.PRIMARYCOLOR)};
`
export const AdminStatusWrapper = styled(StatusWrapper)<IProps>`
  border: 1.5px solid ${(props) => (props.status == '1' ? theme.PRIMARYCOLOR : theme.ERROR)};
  color: ${(props) => (props.status == '1' ? theme.PRIMARYCOLOR : theme.ERROR)};
`
export const HubStatusWrapper = styled(StatusWrapper)<IProps>`
  border: 1.5px solid ${(props) => (props.status == 'Active' ? theme.PRIMARYCOLOR : theme.ERROR)};
  color: ${(props) => (props.status == 'Active' ? theme.PRIMARYCOLOR : theme.ERROR)};
`

const glowing = keyframes`
  0% {
    background-color: #2ba805;
    box-shadow: 0 0 5px #2ba805;
    opacity: 1;
  }
  50% {
    background-color: #49e819;
    box-shadow: 0 0 5px #49e819;
    opacity: 1;
  }
  100% {
    background-color: #2ba805;
    box-shadow: 0 0 5px #2ba805;
    opacity: 1;
  }
`
const offGlowing = keyframes`
 0% {
    background-color: ${theme.ERROR};
    box-shadow: 0 0 5px ${theme.ERROR};
    opacity: 1;
  }
  50% {
    background-color: ${theme.ERROR};
    box-shadow: 0 0 5px ${theme.ERROR};
    opacity: 0.5;

  }
  100% {
    background-color:${theme.ERROR};
    box-shadow: 0 0 5px${theme.ERROR};
    opacity: 1;

  }
`

export const StatusButton = styled.div`
  max-width: 8px;
  width: 100%;
  height: 8px;
  border-radius: 50%;
  background: ${theme.SUCCESS};
  animation: ${glowing} 2s linear infinite;
  cursor: pointer;
`
export const StatusOffline = styled(StatusButton)`
  background: ${theme.ERROR};
  animation: ${offGlowing} 2s linear infinite;
`

export const PopOverTitle = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const QuantityWrapper = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${theme.BOXCOLOR};
`
export const NumberWrapper = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const NumberContainer = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const ButtonWrapper = styled.div`
  button {
    max-width: 124px;
    height: 38px;
    font-size: 14px;
  }
`
