import React from 'react'
import { Breadcrumb } from 'antd'
import moment from 'moment'
import { Task, TaskStatus } from 'interfaces/views'
import OrderStepper from 'views/orderTracking/orderTracker'
import OrderTable from 'views/orderTracking/table'
import {
  TrackingDetailWrapper,
  HeadingWrapper,
  MainHeading,
  DetailWrapper,
  OrderInformationWrapper,
  OrderDetailWrapper,
  TrackingID,
  OrderPlacementDate,
  StatusWrapper,
  Title,
  OrderWrapper,
  TitleWrapper,
  OrderStatusTitle,
} from 'styles/views/orderTracking'
import { TaskStatusWrapper } from 'styles/views/adminDashboard/tableDescription'

interface TrackingDetails {
  data: {
    task: Task
    taskStatus: TaskStatus[]
  }
}

export interface OrderTrackingProps {
  trackingDetails: TrackingDetails
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ trackingDetails }) => {
  const TaskBreadcrumb: React.FC = () => (
    <Breadcrumb
      separator=">"
      items={[
        {
          title: 'Task',
          href: '/dashboard',
        },
        {
          title: 'Order-Tracking',
        },
      ]}
    />
  )

  const details = trackingDetails?.data?.taskStatus
  const lastUpdatedDate =
    trackingDetails?.data?.taskStatus &&
    trackingDetails?.data?.taskStatus?.length > 0 &&
    trackingDetails?.data?.taskStatus[trackingDetails?.data?.taskStatus?.length - 1]?.createdAt
  const formattedDate = lastUpdatedDate ? moment(lastUpdatedDate).format('DD MMM YYYY [at] h:mma') : ''

  return (
    <TrackingDetailWrapper>
      <TaskBreadcrumb />
      <HeadingWrapper>
        <MainHeading>Tracking Details</MainHeading>
      </HeadingWrapper>
      <DetailWrapper>
        <OrderInformationWrapper>
          <OrderDetailWrapper>
            <TrackingID>{trackingDetails?.data?.task?.task_id}</TrackingID>
            <OrderPlacementDate>
              Ordered on {moment(trackingDetails?.data?.task?.createdAt).format('DD MMM YYYY')}
            </OrderPlacementDate>
          </OrderDetailWrapper>
          <StatusWrapper>
            <Title>Status</Title>
            <TaskStatusWrapper status={trackingDetails?.data?.task?.status}>
              {trackingDetails?.data?.task?.status}
            </TaskStatusWrapper>
          </StatusWrapper>
        </OrderInformationWrapper>
        <OrderWrapper>
          <TitleWrapper>
            <OrderStatusTitle>
              Last Updated: <span>{formattedDate}</span>
            </OrderStatusTitle>
          </TitleWrapper>
          <OrderStepper trackingDetails={trackingDetails} />
          <OrderTable details={details} />
        </OrderWrapper>
      </DetailWrapper>
    </TrackingDetailWrapper>
  )
}

export default OrderTracking
