import { IStatusProp } from 'interfaces'
import styled, { keyframes } from 'styled-components'
import { theme } from 'styles/theme'

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

export const CallWrapper = styled.div`
  /* width: 40%; */
  display: flex;
  gap: 10px;
  align-items: center;
  font-family: 'Inter';
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: ${theme.SVGBLACKCOLOR};
  > a {
    /* width: 20%; */
    border: 1px solid #196aab;
    color: #196aab;
    /* background-color: #196aab; */
    border-radius: 12px;
    padding: 4px 8px;
    text-decoration: none;
    :hover {
      background-color: #196aab;
      color: #fff;
    }
  }
`

export const DriverLayoutWrapperWrapper = styled.div`
  display: flex;
  animation: 0.4s ${rollout} ease-in-out;
  will-change: opacity transform;
  overflow-x: hidden;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${theme.LIGHTBLUECOLOR};
  min-height: calc(100vh - 73px);
  width: 100%;
  max-width: 767px;
  margin: 0 auto;
`

export const ProfileScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 145px);
`
export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  svg {
    cursor: pointer;
  }
`
export const DownloadButtonSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  button {
    gap: 8px;
  }
`
export const UpdateButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;

  .cancel {
    background-color: ${theme.NEUTRALGREYCOLOR};
    color: ${theme.PRIMARYBLACKCOLOR};
  }
`
export const ButtonSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  button {
    flex-direction: row-reverse;
    width: 120px;
    height: 36px;
    gap: 8px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
`
export const HomeScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const DriverHomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 14px 16px 0;
  .ant-collapse {
    border: 1px solid #eff0f6;
    border-radius: 10px;
    overflow: hidden;
  }
  .ant-collapse-expand-icon {
    svg {
      width: 15px;
      height: 15px;
    }
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    flex-direction: row-reverse;
    align-items: center;
    background: ${theme.WHITE};
  }
  .ant-collapse > .ant-collapse-item:last-child > .ant-collapse-header {
    border-radius: 8px 8px 0 0;
  }
`
export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${theme.WHITE};
  border: 1px solid #eff0f6;
  border-radius: 16px;
  padding: 20px 20px 25px;
  cursor: pointer;
  svg {
    path {
      fill: ${theme.SVGBLACKCOLOR};
    }
  }
`
export const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
export const CardTitle = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${theme.SVGBLACKCOLOR};
`
export const TaskHeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    color: ${theme.PRIMARYCOLOR};
    font-family: 'Inter';
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    cursor: pointer;
  }
`
export const CardDesc = styled.div`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #808080;
`
export const StatusSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  svg {
    cursor: pointer;
  }
`
export const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 120px;
`
export const StatusContainer = styled.div`
  display: flex;
  gap: 8px;
`
export const SwitchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  span {
    font-family: 'Inter';
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    color: ${theme.PRIMARYBLACKCOLOR};
  }
  .ant-switch {
    background: ${theme.BORDERCOLOR};
  }
  .ant-switch:hover {
    background: ${theme.BORDERCOLOR};
  }
  .ant-switch.ant-switch-checked {
    background: ${theme.PRIMARYCOLOR};
  }

  .ant-switch.ant-switch-checked:hover:not(.ant-switch-disabled) {
    background: ${theme.PRIMARYCOLOR};
  }
`
export const StatusHeading = styled.div`
  font-family: 'Inter';
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: ${theme.TITLECOLOR};
`

export const TaskSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const TaskHeading = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 24px;
  line-height: 40px;
  color: ${theme.BLACKCOLOR};
`
export const TaskOptions = styled.div`
  .ant-tabs .ant-tabs-tab {
    cursor: pointer;
  }
  .ant-tabs-tab.ant-tabs-tab {
    background: transparent !important;
    padding: 5px 15px;
    color: ${theme.SECONDARYBLUECOLOR};
    border-radius: 20px;
    height: max-content;
    border: 1.5px solid rgba(74, 161, 224, 0.21);
    border-radius: 64px;
  }
  .ant-tabs-tab.ant-tabs-tab-active {
    background: ${theme.BOXCOLOR} !important;
    color: ${theme.WHITE} !important;

    padding: 5px 15px;
    border-radius: 20px;
    height: max-content;
  }
  .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${theme.WHITE};
  }
  .ant-tabs-ink-bar {
    background-color: transparent;
  }
  .ant-tabs-nav {
    ::before {
      border: transparent;
    }
  }
  .ant-tabs .ant-tabs-tab + .ant-tabs-tab {
    margin-left: 10px;
  }
  .ant-tabs .ant-tabs-tab:hover {
    color: ${theme.SECONDARYBLUECOLOR};
  }
`
export const AssignedTaskContainer = styled.div`
  display: flex;
  gap: 13px;
  flex-direction: column;
  max-height: 70vh;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`
export const AssignedTaskWrapper = styled.div`
  display: flex;
  gap: 13px;
  flex-direction: column;
  background: ${theme.WHITE};
  border-radius: 16px;
  padding: 13px 16px 19px;
  margin-top: 13px;
  cursor: pointer;
`
export const OrderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
  gap: 10px;
`
export const OrderDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
export const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const SwitchStatusWrapper = styled(StatusWrapper)`
  justify-content: space-between;
  align-items: flex-start;
`

export const OrderDetailContainer = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: 10px;
`
export const OrderName = styled.h3`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${theme.PRIMARYCOLOR};
`
export const OrderID = styled.h3`
  font-family: 'Inter';
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const HistoryScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 70vh;
  margin-bottom: 30px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  .ant-collapse-content .ant-collapse-content-inactive .ant-collapse-content-hidden {
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
    font-size: 17px;
  }
  svg {
    cursor: pointer;
  }
`
export const DateWrapper = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${theme.DARKBLACKCOLOR};
`
export const OrderId = styled.div`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #b0b0b0;
`
export const TaskDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const TaskDetailsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
export const TaskID = styled.div`
  font-family: 'Inter';
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: ${theme.TITLECOLOR};
  span {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: ${theme.PRIMARYBLACKCOLOR};
  }
`
export const TaskAssigned = styled.div`
  font-family: 'Inter';
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: ${theme.TITLECOLOR};
`
export const Status = styled.div<IStatusProp>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  width: max-content;
  height: 24px;
  background: ${(props) =>
    props.status === 'Order-delivered'
      ? theme.SECONDARYGREENCOLOR
      : props.status === 'Cancelled'
      ? theme.ERRORBACKGROUND
      : theme.BACKGROUNDBLUE};
  border-radius: 21px;
  font-family: 'Inter';
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;
  color: ${(props) =>
    props.status === 'Order-delivered' ? theme.SUCCESS : props.status === 'Cancelled' ? theme.RED : theme.BOXCOLOR};
  text-transform: uppercase;
`
export const StatusDetail = styled.div<IStatusProp>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  width: 58px;
  background: ${theme.BACKGROUNDBLUE};
  border-radius: 21px;
  font-family: 'Inter';
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;
  color: ${theme.BOXCOLOR};
`
export const DeliveryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`
export const LocationContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 25px 9px;
  > div {
    ::after {
      content: '';
      width: 1px;
      height: 67px;
      display: inline-block;
      top: 38px;
      left: 18px;
      position: absolute;
      border-right: 1px dashed ${theme.BOXSHADOWCOLOR};
    }
  }
`
export const LocationContainers = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 25px 9px;
  position: relative;
  > div {
    ::after {
      content: '';
      width: 1px;
      height: 67px;
      display: inline-block;
      top: 38px;
      left: 18px;
      position: absolute;
      border-right: 1px dashed ${theme.BOXSHADOWCOLOR};
    }
  }
`
export const IconWrapper = styled.div``
export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  gap: 6px;
  padding-top: 40px;
`
export const HeadingWrapper = styled.h3`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  text-align: center;
  color: ${theme.BLACKCOLOR};
`
export const Description = styled.p`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
`
export const LocationWrapper = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
`
export const PickupName = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Inter';
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: ${theme.PRIMARYBLACKCOLOR};
  span {
    font-size: 10px;
    line-height: 12px;
    color: ${theme.BOXCOLOR};
  }
`
export const LocationAddress = styled.div`
  font-family: 'Inter';
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: ${theme.TITLECOLOR};
  text-transform: capitalize;
`
export const PickupTimeStamp = styled.div`
  width: max-content;
  padding: 5px 10px;
  font-family: 'Inter';
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: ${theme.BOXCOLOR};
  margin-top: 5px;
  background: ${theme.BACKGROUNDPRIMARYBLUE};
  border-radius: 12px;
`
export const DropLocationName = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Inter';
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: ${theme.PRIMARYBLACKCOLOR};
  span {
    font-size: 10px;
    line-height: 12px;
    color: ${theme.ORANGERUST};
  }
`
export const DropTimeStamp = styled.div`
  width: max-content;
  padding: 5px 10px;
  font-family: 'Inter';
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: ${theme.ORANGERUST};
  background: ${theme.BACKGROUNDLIGHTORANGERUST};
  border-radius: 12px;
`
export const TrackOrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${theme.WHITE};
  border-radius: 16px;
  padding: 13px 16px;
`

export const OrderText = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${theme.PRIMARYCOLOR};
`
export const TotalOrder = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  color: ${theme.PRIMARYCOLOR};
`
export const OrderDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
export const OrderDescription = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`
export const QuantityHeading = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
`
export const QuantityWeightWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`
export const OrderDescriptiontext = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${theme.LIGHTGREYCOLOR};
`
export const ItemsName = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: ${theme.GREYCOLOR};
`
export const QuantityWeight = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: right;
  color: #2c2c2c;
`
export const ResultWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  border-top: 1px solid ${theme.BOXSHADOWCOLOR};
  padding-top: 8px;
`

export const OrderStepperWrapper = styled.div`
  height: auto;
  display: flex;

  padding-bottom: 20px;

  .ant-steps .ant-steps-item-container {
    padding-left: 10px;
  }

  .ant-steps .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
    background: ${theme.SUCCESS};
  }
  .ant-dropdown-menu {
    border: 5px solid ${theme.SUCCESS};
  }

  .ant-steps.ant-steps-vertical > .ant-steps-item {
    margin: 11px 0;
  }

  .ant-steps .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
    background: ${theme.SUCCESS};
  }

  .ant-steps .ant-steps-item-process .ant-steps-item-icon {
    background-color: ${theme.SUCCESS};
    color: ${theme.WHITE};
    border-color: unset;
  }

  .ant-steps .ant-steps-item-finish .ant-steps-item-icon {
    background-color: ${theme.SUCCESS};
    color: ${theme.WHITE};
    border-color: unset;
  }
  .ant-steps .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: ${theme.WHITE};
  }
  .ant-steps .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
    background-color: ${theme.SUCCESS};
  }
  .ant-steps.ant-steps-vertical > .ant-steps-item > .ant-steps-item-container > .ant-steps-item-tail::after {
    width: 4px;
    margin-left: 8px;
  }
  .ant-steps-item-subtitle {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: ${theme.LIGHTGREYCOLOR};
  }
  .ant-steps-item-title {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: ${theme.PRIMARYBLACKCOLOR};
    padding-top: 4px;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .ant-steps .ant-steps-item-description {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    padding: 12px 0 12px 12px;
  }
  .ant-steps .ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: ${theme.PRIMARYBLACKCOLOR};
  }
  .ant-steps
    .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-description {
    color: ${theme.TITLECOLOR};
  }
  .ant-steps .ant-steps-item-title {
    padding-inline-end: 0px;
  }
  .ant-steps.ant-steps-vertical > .ant-steps-item .ant-steps-item-icon {
    margin-inline-end: 2px;
  }
`
export const StepperWrapper = styled.div`
  width: max-content;
`
export const DropdownContainer = styled.div`
  display: flex;
  position: relative;
  svg {
    position: absolute;
    top: 94px;
    right: 12px;
    cursor: pointer;
    background: 'transparent';
    border: 'none';
    path {
      fill: #000000;
    }
  }

  .down {
    transform: rotate(90deg);
  }
  .up {
    transform: rotate(-90deg);
  }

  .ant-dropdown-menu {
    border: 5px solid green;
  }
`
export const CompletionStateWrapper = styled.div``
export const ViewWrapper = styled.div`
  width: 100%;
  max-width: 767px;
  position: absolute;
  top: 11px;
`
export const CompletionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.SUCCESS};
  position: relative;
  min-height: 200px;
  svg {
    path {
      fill: ${theme.WHITE};
    }
  }
`
export const OrderStateWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  #map {
    height: 350px;
  }
  @media (max-width: 1300px) {
    #map {
      height: 350px;
      max-width: 898px;
    }
  }
`
export const TrackOrderStateWrapper = styled.div`
  max-width: 767px;
  width: 100%;
  margin: 0 auto;
`
export const MapWrapper = styled(OrderStateWrapper)``
export const ViewMapWrapper = styled.div`
  z-index: 1;
`
export const MapLocationImage = styled.div`
  width: 100%;
  min-height: 216px;

  img {
    width: 100%;
  }
  @media (min-width: 1440px) and (max-width: 2560px) {
    max-width: 100%;
  }
  @media (max-width: 1068px) {
    height: 300px;
    width: 100%;
  }
  @media (max-width: 425px) {
    height: 300px;
  }
`
export const BackArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 51px;
  height: 51px;
  background: ${theme.WHITE};
  border-radius: 50%;
  box-shadow: 0px 8px 20px ${theme.BOXSHADOWCOLOR};
  svg {
    transform: rotate(180deg);
    path {
      fill: ${theme.BOXCOLOR};
    }
  }
`
export const BackArrowContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`
export const ViewMapContainer = styled.div`
  display: flex;
  button {
    flex-direction: row-reverse;
    width: 113px;
    height: 36px;
    gap: 8px;
    color: ${theme.BOXCOLOR};
    font-size: 12px;
    line-height: 15px;
    box-shadow: 0px 8px 10px ${theme.BOXSHADOWCOLOR};
    border-radius: 21px;
    border: none;
    background: ${theme.WHITE};
  }
`
export const InputWrapper = styled.div`
  .ant-input-affix-wrapper {
    height: 40px;
    background-color: unset;
  }
  .ant-input-affix-wrapper > input.ant-input {
    height: 28px;
    background-color: ${theme.LIGHTBLUECOLOR};
  }
`
// OTP Section CSS
export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  gap: 40px;
  @media (max-width: 767px) {
    gap: 140px;
    padding: 47px 24px;
  }
`
export const DriverMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  gap: 40px;
`
export const LogoWrapper = styled.div`
  display: none;

  @media (max-width: 1068px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    img {
      width: 100%;
      max-width: 119.84px;
    }
  }
`
export const MobileLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  img {
    width: 100%;
    max-width: 119.84px;
  }
`

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    width: 100%;
    max-width: 326px;
    gap: 32px;
  }
`
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    width: 100%;
    max-width: 326px;
  }
`

export const OtpContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 82px;
`
export const OtpWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  max-width: 360px;
  width: 100%;
  input {
    max-width: 72px;
    height: 58px;
    text-align: center;
    font-size: 20px;
    line-height: 24px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 20px;

  button {
    max-width: 352px;
    width: 100%;
    height: 58px;
  }
`
export const ResendText = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: ${theme.NOTIFICATIONBLACKCOLOR};
  text-align: center;
  span {
    color: ${theme.BOXCOLOR};
  }
`
export const ExpiredOtp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`
export const OrderNumber = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: ${theme.PRIMARYBLACKCOLOR};
  span {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: ${theme.TITLECOLOR};
  }
`
/****** NOTIFICATION SECTION CSS *******/

export const DriverNotificationWrapper = styled(DriverHomeWrapper)``
export const NotificationsList = styled.li`
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
`
export const NotifiactionWrapper = styled(CardWrapper)`
  display: flex;
  padding: 10px;
  border-radius: 5px;
  gap: 15px;
  justify-content: unset;
  border: none;
`
export const NotificationTitle = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const TimeStamp = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${theme.GREYCOLOR};
`
export const SwitchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
  > div {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
  .ant-switch {
    width: 20px;
  }
`
