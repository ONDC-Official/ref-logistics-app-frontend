import React, { useState } from 'react'
import { Breadcrumb } from 'antd'
import moment from 'moment'
import { IOrderTrackingProps } from 'interfaces/views'
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
import Button from 'components/Button'
import Modal from 'components/Modal'
import LiveTrackingModal from 'views/liveTrackingmModal'

const OrderTracking: React.FC<IOrderTrackingProps> = ({ trackingDetails }) => {
  const [open, setOpen] = useState(false)
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
  const formattedDate = lastUpdatedDate ? moment(lastUpdatedDate).format('DD MMM YYYY  h:mma') : ''
  const taskStatusDetails = trackingDetails?.data?.taskStatus || []
  const items = trackingDetails?.data?.task?.items || []
  const taskType = items[0]?.descriptor?.code

  return (
    <>
      <TrackingDetailWrapper>
        <TaskBreadcrumb />
        <HeadingWrapper>
          <MainHeading>Tracking Details</MainHeading>
          <div>
            <Button type="button" label="Live Tacking" variant="contained" onClick={() => setOpen(true)} />
          </div>
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
              {taskType && taskType === 'P2H2P' ? (
                <TaskStatusWrapper
                  status={
                    taskStatusDetails[taskStatusDetails.length - 1].status === 'Order-delivered'
                      ? 'Completed'
                      : taskStatusDetails[taskStatusDetails.length - 1].status
                  }
                >
                  {taskStatusDetails[taskStatusDetails.length - 1].status === 'Order-delivered'
                    ? 'Completed'
                    : taskStatusDetails[taskStatusDetails.length - 1].status}
                </TaskStatusWrapper>
              ) : (
                <TaskStatusWrapper status={trackingDetails?.data?.task?.status}>
                  {trackingDetails?.data?.task?.status}
                </TaskStatusWrapper>
              )}

              {/* {taskStatusDetails.length > 0 && (

              )} */}
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
      <Modal isOpen={open}>
        <LiveTrackingModal showModal={(action: boolean) => setOpen(action)} trackingDetails={trackingDetails} />
      </Modal>
    </>
  )
}

export default OrderTracking
