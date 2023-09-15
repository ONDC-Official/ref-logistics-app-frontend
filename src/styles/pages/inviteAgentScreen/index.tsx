import styled from 'styled-components'
import { theme } from 'styles/theme'

export const InviteAgentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  position: relative;
`
export const StepsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: -webkit-sticky;
  position: sticky;
  top: 12px;
  gap: 70px;
  width: 30%;
  margin: 12px 0 16px 17px;
  background: ${theme.LIGHTBLUECOLOR};
  border-radius: 8px;
  .ant-steps.ant-steps-vertical > .ant-steps-item {
    margin: 11px 0;
  }
  .ant-steps .ant-steps-item-process .ant-steps-item-icon {
    background-color: ${theme.WARNING};
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
  }
  .ant-steps .ant-steps-item-description {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
`
export const StepsContainer = styled.div`
  padding-left: 38px;
  @media (max-width: 768px) {
    padding-left: 10px;
  }
`
export const StepWrapper = styled.div`
  width: 100%;
  max-width: 623px;
  background: #ecf7ff;
  padding: 16px 0;
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
  .ant-steps {
    max-width: 428px;
  }
  .ant-steps-item-icon {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 24px;
  }
  .ant-steps .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
    color: ${theme.PRIMARYCOLOR};
  }
  .ant-steps .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
    font-family: 'Inter';
    font-weight: 600;
    font-size: 16px;
    color: ${theme.PRIMARYCOLOR};
  }
  .ant-steps .ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
    font-family: 'Inter';
    font-weight: 600;
    font-size: 16px;
    color: ${theme.STEPPERBLACKCOLOR};
  }
  .ant-steps .ant-steps-item-wait .ant-steps-item-icon {
    background: unset;
    color: ${theme.STEPPERBLACKCOLOR};
  }
  .ant-steps .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {
    color: ${theme.PRIMARYCOLOR};
  }
  .ant-steps .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon {
    color: ${theme.STEPPERBLACKCOLOR};
  }
  .ant-steps .ant-steps-item-process .ant-steps-item-icon {
    background: unset !important;
    border-color: unset !important ;
    border: unset !important ;
  }
`
export const AgentInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 42px 40px 30px 46px;
  width: 100%;
  @media (max-width: 1068px) {
    padding: 46px 20px 0 25px;
  }
  @media (max-width: 768px) {
    max-width: 715px;
    width: 100%;
  }
`
export const ButtonContainer = styled.div`
  display: flex;
  button {
    flex-direction: row-reverse;
    width: 92px;
    height: 36px;
    gap: 8px;
  }
  svg {
    transform: rotate(180deg);
  }
`
