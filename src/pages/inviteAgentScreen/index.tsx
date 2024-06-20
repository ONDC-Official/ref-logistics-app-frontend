import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { Steps } from 'antd'
import Button from 'components/Button'
import KYCDetails from 'views/inviteAgentScreen/agentKYCDetailSection'
import KYCDocuments from 'views/inviteAgentScreen/agentKYCDocuments'
import AgentBankDetails from 'views/inviteAgentScreen/bankDetailSection'
import VehicleDetails from 'views/vehicleDetails'
import DriverDetails from 'views/inviteAgentScreen/driverDetailsSection'
import logo from 'assets/images/ondc_logo.png'
import Arrow from 'assets/svg/Arrow'
import { LogoImage, LogoWrapper } from 'styles/views/inviteScreen'
import {
  InviteAgentWrapper,
  StepsWrapper,
  StepsContainer,
  AgentInfoWrapper,
  ButtonContainer,
} from 'styles/pages/inviteAgentScreen'

const InviteAgent = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const [currentStep, setCurrentStep] = useState(0)

  const next = () => {
    setCurrentStep(currentStep + 1)
  }
  const prev = () => {
    setCurrentStep(currentStep - 1)
  }

  const router = useHistory()
  const handleBack = () => {
    if (currentStep === 0) {
      router.goBack()
    } else {
      prev()
    }
  }

  const items = [
    {
      step: 0,
      title: 'Step 1',
      description: 'Driver Details',
      component: <DriverDetails next={next} ref={scrollRef} />,
    },
    {
      step: 1,
      title: 'Step 2',
      description: 'Vehicle Details',
      component: <VehicleDetails next={next} />,
    },
    { step: 2, title: 'Step 3', description: 'KYC Details', component: <KYCDetails next={next} /> },
    { step: 3, title: 'Step 4', description: 'KYC Documents', component: <KYCDocuments next={next} /> },
    { step: 4, title: 'Step 5', description: 'Bank Details', component: <AgentBankDetails /> },
  ]

  const getComponentByStep = (step: number) => {
    const stepObj = items.find((obj) => obj.step === step)
    return stepObj ? stepObj.component : null
  }

  useEffect(() => {
    if (scrollRef) {
      scrollRef?.current?.focus({
        preventScroll: false,
      })
    }
  }, [])

  return (
    <InviteAgentWrapper>
      <StepsWrapper>
        <LogoWrapper>
          <LogoImage src={logo} alt="ONDC-logo" />
        </LogoWrapper>
        <StepsContainer>
          <Steps current={currentStep} direction="vertical" items={items}></Steps>
        </StepsContainer>
      </StepsWrapper>
      <AgentInfoWrapper>
        <ButtonContainer>
          <Button label="Back" variant="outline" onClick={handleBack}>
            <Arrow />
          </Button>
        </ButtonContainer>
        <div style={{ marginTop: '16px' }}>{getComponentByStep(currentStep)}</div>
      </AgentInfoWrapper>
    </InviteAgentWrapper>
  )
}

export default InviteAgent
