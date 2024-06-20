import React from 'react'
import { Steps } from 'antd'
import moment from 'moment'
import { OrderStepperWrapper } from 'styles/views/driverFlowHome'
const { Step } = Steps

const OrderStepper = ({ taskData, agentId }: any) => {
  agentId
  const outputFormat = 'ddd DD MMM YYYY [at] h:mma'
  const index = taskData?.taskStatus
    ?.filter((obj: any) => obj.status != 'Pending')
    .findIndex((element: any) => {
      if (element.status === taskData?.task?.status) {
        return true
      }
    })

  return (
    <OrderStepperWrapper>
      <Steps direction="vertical" current={index + 1}>
        {taskData?.taskStatus
          .filter((obj: any) => obj.status != 'Pending')
          .map((stepObj: any) => (
            <Step
              key={taskData?.taskStatus?.length}
              description={moment(stepObj?.createdAt).format(outputFormat)}
              subTitle={stepObj?.description}
              title={stepObj?.status === 'Pending' ? 'Order Confirmed' : stepObj?.status}
            />
          ))}
      </Steps>
    </OrderStepperWrapper>
  )
}

export default OrderStepper
