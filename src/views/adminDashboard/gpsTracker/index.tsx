import { useEffect } from 'react'
import moment from 'moment'
import useGet from 'hooks/useGet'
import APIS from 'constants/api'
import MapComponent from 'components/MapComponent/index'
import { MapWrapper } from 'styles/pages/gpsTracker'
import {
  MainWrapper,
  Heading,
  DetailContainer,
  DataWrapper,
  Title,
  Detail,
  AddressDetail,
  OrderDetailWrapper,
} from 'styles/views/adminDashboard/gpsTracker'
import { TaskStatusWrapper } from 'styles/views/adminDashboard/tableDescription'

const OrderDetail = ({ details }: any) => {
  const assigneeId = details?.data?.task?.assignee?._id
  const endLocation = details?.data?.task?.fulfillments[0]?.end?.location?.gps.split(',')
  const startDuration = moment.duration(details?.data?.task?.fulfillments[0]?.start?.time?.duration)
  const formattedStartTime = moment.utc(startDuration.asMilliseconds()).format('HH:mm')
  const { refetch: getLiveLocation, data: agentLiveCoordinates } = useGet(
    'track-agent-location',
    `${APIS.AGENT_LIVE_LOCATION}/${assigneeId}`,
  )

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timer | undefined
    if (details?.data?.task?.assignee?._id) {
      getLiveLocation()
      intervalId = setInterval(() => {
        getLiveLocation()
      }, 5000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [assigneeId])

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
      <MainWrapper>
        <OrderDetailWrapper>
          <Heading>Order Detail</Heading>
          <DataWrapper>
            <Title>Order ID</Title> <Detail>{details?.data?.task?._id}</Detail>
          </DataWrapper>
          <DetailContainer>
            <DataWrapper>
              <Title>Time of Order</Title>
              <Detail>
                {moment(details?.data?.task?.createdAt).format('DD/MM/YYYY')} ({formattedStartTime})
              </Detail>
            </DataWrapper>
            <DataWrapper>
              <Title>Number of Items</Title> <Detail>{details?.data?.task?.linked_order?.items?.length}</Detail>
            </DataWrapper>
          </DetailContainer>
          <DataWrapper>
            <Title>Status</Title>
            <TaskStatusWrapper status={details?.data?.task?.status}>{details?.data?.task?.status}</TaskStatusWrapper>
          </DataWrapper>
        </OrderDetailWrapper>
        <OrderDetailWrapper>
          <Heading>Agent Details</Heading>
          <DataWrapper>
            <Title>Agent ID</Title> <Detail>{details?.data?.task?.assignee?.userId?._id}</Detail>
          </DataWrapper>
          <DetailContainer>
            <DataWrapper>
              <Title>Agent Name</Title> <Detail>{details?.data?.task?.assignee?.userId?.name}</Detail>
            </DataWrapper>
            <DataWrapper>
              <Title>Agent Mobile Number</Title> <Detail>{details?.data?.task?.assignee?.userId?.mobile}</Detail>
            </DataWrapper>
          </DetailContainer>
        </OrderDetailWrapper>
        <OrderDetailWrapper>
          <Heading>Pick-Up Location</Heading>
          <DataWrapper>
            <Title>Person Name</Title> <Detail>{details?.data?.task?.fulfillments[0]?.start?.person?.name}</Detail>
          </DataWrapper>
          <DataWrapper>
            <Title>Person Mobile Number</Title>
            <Detail>{details?.data?.task?.fulfillments[0]?.start?.contact?.phone}</Detail>
          </DataWrapper>
          <DataWrapper>
            <Title>Address</Title>
            <AddressDetail>
              {details?.data?.task?.fulfillments[0]?.start?.location?.address?.store}
              {details?.data?.task?.fulfillments[0]?.start?.location?.address?.building},<br />
              {details?.data?.task?.fulfillments[0]?.start?.location?.address?.city},
              {details?.data?.task?.fulfillments[0]?.start?.location?.address?.state},
              {details?.data?.task?.fulfillments[0]?.start?.location?.address?.area_code},<br />
              {details?.data?.task?.fulfillments[0]?.start?.location?.address?.country}
            </AddressDetail>
          </DataWrapper>
        </OrderDetailWrapper>
        <OrderDetailWrapper>
          <Heading>Drop Location</Heading>
          <DataWrapper>
            <Title>Person Name</Title> <Detail>{details?.data?.task?.fulfillments[0]?.end?.person?.name}</Detail>
          </DataWrapper>
          <DataWrapper>
            <Title>Person Mobile Number</Title>
            <Detail>{details?.data?.task?.fulfillments[0]?.end?.contact?.phone}</Detail>
          </DataWrapper>
          <DataWrapper>
            <Title>Address</Title>
            <AddressDetail>
              {details?.data?.task?.fulfillments[0]?.end?.location?.address?.store}
              {details?.data?.task?.fulfillments[0]?.end?.location?.address?.building},<br />
              {details?.data?.task?.fulfillments[0]?.end?.location?.address?.city},
              {details?.data?.task?.fulfillments[0]?.end?.location?.address?.state},
              {details?.data?.task?.fulfillments[0]?.end?.location?.address?.area_code},<br />
              {details?.data?.task?.fulfillments[0]?.end?.location?.address?.country}
            </AddressDetail>
          </DataWrapper>
        </OrderDetailWrapper>
      </MainWrapper>

      <MapWrapper>
        <MapComponent liveAgentTracking={agentLiveCoordinates?.data} taskEndpoints={endLocation} />
      </MapWrapper>
    </div>
  )
}

export default OrderDetail
