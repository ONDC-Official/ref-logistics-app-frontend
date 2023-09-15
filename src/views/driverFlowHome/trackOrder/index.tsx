import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Collapse } from 'antd'
import moment from 'moment'
import APIS from 'constants/api'
import useGet from 'hooks/useGet'
import Modal from 'components/Modal'
import Button from 'components/Button'
import CancelOrderModal from 'views/driverFlowHome/cancelOrderModal'
import OrderStepper from 'views/driverFlowHome/orderStepper'
import DriverUpdateStatusModal from 'views/driverFlowHome/driverUpdateStatusModal'
import { IParamId } from 'interfaces/pages'
import DownloadInvoiceIcon from 'assets/svg/DownloadInvoiceIcon'
import {
  OrderWrapper,
  NameWrapper,
  TaskDetailsWrap,
  TaskID,
  TaskAssigned,
  Status,
  TrackOrderWrapper,
  HistoryScreenWrapper,
  OrderDetailWrapper,
  OrderText,
  OrderDescriptionWrapper,
  OrderDescription,
  QuantityHeading,
  QuantityWeightWrapper,
  ItemsName,
  OrderDescriptiontext,
  QuantityWeight,
  ResultWrapper,
  TotalOrder,
  DownloadButtonSection,
  UpdateButtonWrapper,
} from 'styles/views/driverFlowHome'

const { Panel } = Collapse

interface IButtonData {
  buttonStatus?: boolean
}
const TrackOrder = ({ buttonStatus }: IButtonData) => {
  const [size, setSize] = useState(0)

  const [statusModal, setStatusModal] = useState(false)
  const [cancelModal, setCancelModal] = useState(false)
  const [orderDetail, setOrderDetail] = useState('')
  const router = useHistory()
  const { id }: IParamId = useParams()
  const { refetch: getTask, data: taskDetails } = useGet('get-task', `${APIS.ALL_TASK}/${id}`)

  useEffect(() => {
    getTask()
  }, [])

  const handleClick = (e: any) => {
    setOrderDetail(e)
    if (e === 'Cancelled') {
      setStatusModal(!statusModal)
      setCancelModal(!cancelModal)
    }
  }

  const openStatus = () => {
    if (['Order-delivered', 'Cancelled', 'RTO-Delivered', 'RTO-Disposed'].includes(taskDetails?.data?.task?.status))
      setStatusModal(false)
    else {
      setStatusModal(true)
    }
  }

  let total = 0

  const query = () => {
    setSize(window?.innerWidth)
  }

  useEffect(() => {
    setSize(window.innerWidth)
    window.addEventListener('resize', query)
    return () => {
      window.removeEventListener('resize', query)
    }
  }, [size])

  return (
    <>
      <TrackOrderWrapper>
        <OrderWrapper>
          <NameWrapper>
            <TaskDetailsWrap>
              <TaskID>Task ID:</TaskID>
              <TaskID>
                {size < 400 && (
                  <span>
                    {taskDetails?.data?.task?._id?.length > 17
                      ? `${taskDetails?.data?.task?._id?.slice(0, 4)}... ${taskDetails?.data?.task?._id?.slice(-8)}`
                      : taskDetails?.data?.task?._id}
                  </span>
                )}
                {size > 400 && <span>{taskDetails?.data?.task?._id}</span>}
              </TaskID>
              <TaskAssigned>{moment(`${taskDetails?.data?.task?.createdAt}`).startOf('hour').fromNow()}</TaskAssigned>
            </TaskDetailsWrap>
          </NameWrapper>
          <Status status={taskDetails?.data?.task?.status}>{taskDetails?.data?.task?.status}</Status>
        </OrderWrapper>
        <OrderStepper taskData={taskDetails?.data} />
        <HistoryScreenWrapper>
          <Collapse collapsible="header" defaultActiveKey={['1']}>
            <Panel
              header={
                <OrderDetailWrapper>
                  <OrderText>Order Details</OrderText>
                </OrderDetailWrapper>
              }
              key="1"
            >
              <OrderDescriptionWrapper>
                <OrderDescription>
                  <OrderDescriptiontext>Description </OrderDescriptiontext>
                  <QuantityHeading>Qty</QuantityHeading>
                </OrderDescription>

                {taskDetails?.data?.task?.linked_order?.items.map((item: any, index: React.Key | null | undefined) => {
                  total += parseFloat(item?.quantity?.measure?.value)
                  return (
                    <QuantityWeightWrapper key={index}>
                      <ItemsName>{item?.descriptor?.name}</ItemsName>
                      <QuantityWeight>
                        {item?.quantity?.measure?.value} {item?.quantity?.measure?.unit}
                      </QuantityWeight>
                    </QuantityWeightWrapper>
                  )
                })}
                <ResultWrapper>
                  <OrderText>Total Qty</OrderText>
                  <TotalOrder>{total} kilogram</TotalOrder>
                </ResultWrapper>
              </OrderDescriptionWrapper>
            </Panel>
          </Collapse>
        </HistoryScreenWrapper>

        {buttonStatus ? (
          <UpdateButtonWrapper>
            <Button label="Go Back" variant="contained" className="cancel" onClick={() => router.push('/home')} />
            <Button
              label="Update Status"
              variant={
                ['Order-delivered', 'Cancelled', 'RTO-Delivered', 'RTO-Disposed'].includes(
                  taskDetails?.data?.task?.status,
                )
                  ? 'disabled'
                  : 'contained'
              }
              type="submit"
              onClick={openStatus}
            />
          </UpdateButtonWrapper>
        ) : null}

        {false && (
          <DownloadButtonSection>
            <Button label="Download invoice" variant="outline">
              <DownloadInvoiceIcon />
            </Button>
          </DownloadButtonSection>
        )}
      </TrackOrderWrapper>
      <Modal isOpen={statusModal}>
        <DriverUpdateStatusModal
          showModal={(value: boolean) => setStatusModal(value)}
          handleClick={handleClick}
          orderDetail={orderDetail}
          task={taskDetails?.data?.task}
          getTask={() => getTask()}
        />
      </Modal>
      <Modal isOpen={cancelModal}>
        <CancelOrderModal
          showModal={(value: boolean) => setCancelModal(value)}
          task={taskDetails?.data?.task}
          getTask={() => getTask()}
        />
      </Modal>
    </>
  )
}

export default TrackOrder
