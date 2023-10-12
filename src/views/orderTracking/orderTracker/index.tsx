import React from 'react'
import { Popover, Steps } from 'antd'
import moment from 'moment'
import OrderStatusModal from 'views/orderTracking/orderStatusModal'
import { OrderStepperProps, TaskStatus } from 'interfaces/views'
import { OrderTrackingStepperWrapper } from 'styles/views/orderTracking'

const OrderStepper: React.FC<OrderStepperProps> = ({ trackingDetails }) => {
  const { Step } = Steps
  const outputFormat = 'ddd DD MMM YYYY [at] h:mma'

  return (
    <OrderTrackingStepperWrapper>
      <Steps
        current={trackingDetails?.data?.taskStatus?.length - 1}
        progressDot={(dot, { index }) => {
          let popoverContent = null
          popoverContent = (
            <OrderStatusModal
              title={
                trackingDetails?.data?.taskStatus[index]?.status === 'Pending'
                  ? 'Confirm'
                  : trackingDetails?.data?.taskStatus[index]?.status
              }
              imgSrc={trackingDetails?.data?.taskStatus[index]?.link}
            />
          )

          if (popoverContent) {
            return <Popover content={<span>{popoverContent}</span>}>{dot}</Popover>
          }

          return dot
        }}
      >
        {trackingDetails?.data?.taskStatus?.length &&
          trackingDetails?.data?.taskStatus?.map((item: TaskStatus, index: number) => {
            return (
              <Step
                title={item?.status === 'Pending' ? 'Confirm' : item?.status}
                subTitle={moment(item?.createdAt).format(outputFormat)}
                key={index}
              />
            )
          })}
      </Steps>
    </OrderTrackingStepperWrapper>
  )
}

export default OrderStepper
