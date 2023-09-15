import { useState } from 'react'
import { Steps } from 'antd'
import { StepperWrapper } from 'styles/views/driverFlowHome'

const { Step } = Steps

const SubStepper = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const handleClick = (step: number) => {
    setCurrentStep(step)
  }

  const stepContent = [
    {
      step: 0,
      title: '6:08pm',
      subTitle: 'Pickup scheduled with courier',
      description: 'New Delhi, IN',
    },
    {
      step: 1,
      title: '6:08pm',
      subTitle: 'item has been picked up by courier',
      description: 'New Delhi, IN',
    },
    {
      step: 2,
      title: '6:08pm',
      subTitle: 'Package arrived at the hub facility',
      description: 'New Delhi, Airport IN',
    },
    {
      step: 3,
      title: '6:08pm',
      subTitle: 'Package has left an hub facility',
      description: 'New Delhi, Airport IN',
    },
  ]

  return (
    <StepperWrapper>
      <Steps direction="vertical" current={currentStep} progressDot>
        {stepContent.map((stepObj) => (
          <Step
            key={stepObj.step}
            title={stepObj.title}
            subTitle={stepObj.subTitle}
            description={stepObj.description}
            onClick={() => handleClick(stepObj.step)}
          />
        ))}
      </Steps>
    </StepperWrapper>
  )
}

export default SubStepper
