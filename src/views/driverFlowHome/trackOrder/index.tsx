import React, { useEffect, useState, useContext } from 'react'
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
import { IButtonData } from 'interfaces/views'
import DownloadInvoiceIcon from 'assets/svg/DownloadInvoiceIcon'
import { AppContext } from 'context/payloadContext'
import { maskMobileNumber } from 'utils/maskMobileNumber'
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
  WeigthHeading,
  QuantityWeightWrapper,
  ItemsName,
  QuantityName,
  OrderDescriptiontext,
  QuantityWeight,
  ResultWrapper,
  TotalOrder,
  DownloadButtonSection,
  UpdateButtonWrapper,
  CallWrapper,
  PaymentWrapper,
} from 'styles/views/driverFlowHome'

const { Panel } = Collapse

const TrackOrder = ({ buttonStatus }: IButtonData) => {
  const [size, setSize] = useState(0)

  const [statusModal, setStatusModal] = useState(false)
  const [cancelModal, setCancelModal] = useState(false)
  const [orderDetail, setOrderDetail] = useState('')
  // const [taskData, setTaskData] = useState<any>([])
  const router = useHistory()
  const { id }: IParamId = useParams()
  const { userInfo } = useContext(AppContext)

  const { refetch: getTask, data: taskDetails } = useGet('get-task', `${APIS.ALL_TASK}/${id}/agent`)

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

  // let total = 0
  let totalAmount = 0

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

  // useEffect(() => {
  //   const taskData = taskDetails?.data?.taskStatus?.filter((obj: any) => obj?.agentId === userInfo?.agentId)
  //   setTaskData(taskData)
  // }, [userInfo])
  return (
    <>
      <TrackOrderWrapper>
        <OrderWrapper>
          <NameWrapper>
            <TaskDetailsWrap>
              <TaskID>Order ID:</TaskID>
              <TaskID>
                <span>{taskDetails?.data?.task?.linked_order?.order?.id}</span>
              </TaskID>
              <TaskAssigned>{moment(`${taskDetails?.data?.task?.createdAt}`).startOf('hour').fromNow()}</TaskAssigned>
              <PaymentWrapper>Payment : {taskDetails?.data?.task?.payment?.type} </PaymentWrapper>
            </TaskDetailsWrap>
            <CallWrapper>
              {maskMobileNumber(taskDetails?.data?.task?.fulfillments[0]?.end?.contact?.phone)}
              <a href={`tel:+91${taskDetails?.data?.task?.fulfillments[0]?.end?.contact?.phone}`}>📞 Call </a>
            </CallWrapper>
          </NameWrapper>
          <Status status={taskDetails?.data?.task?.status}>{taskDetails?.data?.task?.status}</Status>
          {/* {userInfo?.agentId && (
            <Status status={taskData[taskData?.length - 1]?.status}>{taskData[taskData?.length - 1]?.status}</Status>
          )} */}
        </OrderWrapper>
        {userInfo?.agentId && <OrderStepper taskData={taskDetails?.data} agentId={userInfo?.agentId} />}
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
                  <OrderDescriptiontext>Name </OrderDescriptiontext>
                  <QuantityHeading>Qty</QuantityHeading>
                  <WeigthHeading>Weight</WeigthHeading>
                </OrderDescription>
                {taskDetails?.data?.task?.linked_order?.items.map((item: any, index: React.Key | null | undefined) => {
                  // total += parseFloat(item?.quantity?.measure?.value)
                  totalAmount += parseFloat(item?.price?.value)
                  return (
                    <QuantityWeightWrapper key={index}>
                      <ItemsName>{item?.descriptor?.name}</ItemsName>
                      <QuantityName>{item?.quantity?.measure?.value}</QuantityName>
                      <QuantityWeight>
                        {item?.quantity?.measure?.value} {item?.quantity?.measure?.unit}
                      </QuantityWeight>
                    </QuantityWeightWrapper>
                  )
                })}
                {/* <ResultWrapper>
                  <OrderText>Total Qty</OrderText>
                  <TotalOrder>{total} kilogram</TotalOrder>
                </ResultWrapper> */}
                <ResultWrapper>
                  <OrderText>Total Price</OrderText>
                  <TotalOrder>{totalAmount} INR</TotalOrder>
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
                ['Order-delivered', 'Cancelled', 'RTO-Delivered', 'RTO-Disposed', 'Completed'].includes(
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
          taskStatus={taskDetails?.data?.taskStatus}
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
