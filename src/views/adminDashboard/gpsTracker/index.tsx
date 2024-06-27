import { useEffect } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Table } from 'antd'
import moment from 'moment'
import useGet from 'hooks/useGet'
import APIS from 'constants/api'
import LiveTrackingMap from 'components/MapComponent/liveTracking'
import { MapWrapper } from 'styles/pages/gpsTracker'
import {
  OrderMainWrapper,
  MainWrapper,
  Heading,
  DetailContainer,
  TableWrapper,
  DataWrapper,
  Title,
  Detail,
  AddressDetail,
  OrderDetailWrapper,
  LocationOrderDetailWrapper,
  OrderDetailHeadWrapper,
} from 'styles/views/adminDashboard/gpsTracker'
import { TaskStatusWrapper } from 'styles/views/adminDashboard/tableDescription'

const OrderDetail = ({ details }: any) => {
  const assigneeId = details?.data?.task?.assignee?._id
  const startDuration = moment.duration(details?.data?.task?.fulfillments[0]?.start?.time?.duration)
  const formattedStartTime = moment.utc(startDuration.asMilliseconds()).format('hh:mm a')
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

  const columns: ColumnsType<any> = [
    {
      title: 'Items Summary',
      dataIndex: 'descriptor.name',
      key: 'descriptor.name',
      render: (data: any) => {
        return <Detail>{data}</Detail>
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (data: any) => {
        return <Detail>{data}</Detail>
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity.count',
      key: 'quantity.count',
      render: (data: any) => {
        return <Detail>{data}</Detail>
      },
    },
  ]

  function addValues(newVal: any) {
    const sum = newVal?.reduce((total: any, item: any) => {
      const value = parseInt(item?.price?.value) * item?.quantity?.count
      if (!isNaN(value)) {
        total += value
      }

      return total
    }, 0)

    return sum?.toFixed(2)
  }

  const totalPrice = addValues(details?.data?.task?.linked_order?.items)
  const test = details?.data?.task?.fulfillments
  const type = details?.data?.task?.fulfillments[test?.length - 1]?.type

  const getTatDuration = (isoDuration: string) => {
    if (isoDuration) {
      const duration = moment.duration(isoDuration)
      const days = duration.days()
      const hours = duration.hours()
      const minutes = duration.minutes()

      return (
        <DataWrapper>
          <Title>Turn Around Time</Title>
          {days !== 0 ? <p>Days: {days}</p> : hours !== 0 ? <p>Hours: {hours}</p> : <p>Minutes: {minutes}</p>}
        </DataWrapper>
      )
    }
  }

  return (
    <MainWrapper>
      <OrderMainWrapper style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <MainWrapper>
          <OrderDetailWrapper>
            <OrderDetailHeadWrapper>
              <Heading>Order Details</Heading>
              {/* <ButtonWrapper>
                <Button
                  type="button"
                  label="See Logs"
                  variant="outline"
                  onClick={() => history.push(`/request-log/${details?.data?.task?.transaction_id}`)}
                />
              </ButtonWrapper> */}
            </OrderDetailHeadWrapper>
            <DataWrapper>
              <Title>Order ID</Title> <Detail>{details?.data?.task?.linked_order?.order?.id}</Detail>
            </DataWrapper>
            <DataWrapper>
              <Title>Order Type</Title>
              <Detail>{type === 'Prepaid' ? 'Delivery' : type === 'Reverse QC' ? 'Return' : type}</Detail>
            </DataWrapper>
            <DataWrapper>
              <Title>Seller Name</Title>
              <Detail>{details?.data?.task?.billing?.name}</Detail>
            </DataWrapper>
            <DataWrapper>
              <Title>Status</Title>
              <TaskStatusWrapper status={details?.data?.task?.status}>{details?.data?.task?.status}</TaskStatusWrapper>
            </DataWrapper>
            <DataWrapper>
              <Title>Payment</Title>
              <Detail>{details?.data?.task?.payment?.type}</Detail>
            </DataWrapper>
            <DetailContainer>
              <DataWrapper>
                <Title>Time of Order</Title>
                <Detail>
                  {moment(details?.data?.task?.createdAt).format('DD MMM YYYY')} ({formattedStartTime})
                </Detail>
              </DataWrapper>
              <DataWrapper>
                <Detail>
                  {getTatDuration(details?.data?.task?.items[0]?.time?.duration)}
                  {/* {moment.duration(details?.data?.task?.items[0]?.time?.duration).asMinutes()} */}
                </Detail>
              </DataWrapper>
            </DetailContainer>

            <TableWrapper>
              <Table
                columns={columns}
                dataSource={details?.data?.task?.linked_order?.items.map(
                  (
                    item: {
                      descriptor: { name: string }
                      price: { value: string; currency: string }
                      quantity: { count: number }
                    },
                    index: number,
                  ) => ({
                    key: index, // Add a unique key for each row
                    'descriptor.name': item?.descriptor?.name,
                    price: `${item?.price?.value} ${item?.price?.currency}`,
                    'quantity.count': item?.quantity?.count,
                  }),
                )}
                pagination={false}
                size="middle"
                tableLayout="auto"
              />
            </TableWrapper>
            <DetailContainer>
              <DataWrapper>
                <Title>Items Total Price</Title>
                <Detail>
                  {totalPrice} {details?.data?.task?.linked_order?.items[0]?.price?.currency}
                </Detail>
              </DataWrapper>
              <DataWrapper>
                <Title>Total Number of Items</Title> <Detail>{details?.data?.task?.linked_order?.items?.length}</Detail>
              </DataWrapper>
              <DataWrapper>
                <Title>Weight</Title>{' '}
                <Detail>
                  {details?.data?.task?.linked_order?.order?.weight?.value}
                  {details?.data?.task?.linked_order?.order?.weight?.unit === 'kilogram' ||
                  details?.data?.task?.linked_order?.order?.weight?.unit === 'Kilogram'
                    ? 'kg'
                    : details?.data?.task?.linked_order?.order?.weight?.unit}
                </Detail>
              </DataWrapper>
            </DetailContainer>
          </OrderDetailWrapper>
          {details?.data?.task?.status === 'Pending' || details?.data?.task?.status === 'Searching-for-Agent' ? null : (
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
          )}
        </MainWrapper>

        <MapWrapper>
          {/* <MapOrderComponent taskStartPoints={orderStartPoint} taskEndPoints={orderEndPoint} /> */}
          <LiveTrackingMap liveAgentTracking={agentLiveCoordinates?.data} taskDetails={details} />
        </MapWrapper>
      </OrderMainWrapper>
      <DetailContainer>
        <LocationOrderDetailWrapper>
          <Heading>Pick-Up Location</Heading>
          <DataWrapper>
            <Title>Store Name</Title> <Detail>{details?.data?.task?.fulfillments[0]?.start?.person?.name}</Detail>
          </DataWrapper>

          <DataWrapper>
            <Title>Address</Title>
            <AddressDetail>
              {details?.data?.task?.fulfillments[0]?.start?.location?.address?.name},
              {details?.data?.task?.fulfillments[0]?.start?.location?.address?.building},<br />
              {details?.data?.task?.fulfillments[0]?.start?.location?.address?.city},
              {details?.data?.task?.fulfillments[0]?.start?.location?.address?.state},
              {details?.data?.task?.fulfillments[0]?.start?.location?.address?.area_code},
              {details?.data?.task?.fulfillments[0]?.start?.location?.address?.country},<br />
              {details?.data?.task?.fulfillments[0]?.start?.contact?.phone}
            </AddressDetail>
          </DataWrapper>
        </LocationOrderDetailWrapper>
        <LocationOrderDetailWrapper>
          <Heading>Drop Location</Heading>
          <DataWrapper>
            <Title>Person Name</Title> <Detail>{details?.data?.task?.fulfillments[0]?.end?.person?.name}</Detail>
          </DataWrapper>

          <DataWrapper>
            <Title>Address</Title>
            <AddressDetail>
              {details?.data?.task?.fulfillments[0]?.end?.location?.address?.name},
              {details?.data?.task?.fulfillments[0]?.end?.location?.address?.building},<br />
              {details?.data?.task?.fulfillments[0]?.end?.location?.address?.city},
              {details?.data?.task?.fulfillments[0]?.end?.location?.address?.state},
              {details?.data?.task?.fulfillments[0]?.end?.location?.address?.area_code},
              {details?.data?.task?.fulfillments[0]?.end?.location?.address?.country},<br />
              {details?.data?.task?.fulfillments[0]?.end?.contact?.phone}
            </AddressDetail>
          </DataWrapper>
        </LocationOrderDetailWrapper>
      </DetailContainer>
      <DetailContainer>
        <LocationOrderDetailWrapper>
          <Heading>Pick-Up Instructions</Heading>

          <DataWrapper>
            <AddressDetail>
              Title:
              <span>
                {details?.data?.task?.fulfillments[0]?.start?.instructions?.code === '1'
                  ? 'buyer contact no (for self-pickup)'
                  : details?.data?.task?.fulfillments[0]?.start?.instructions?.code === '2'
                  ? 'merchant order no'
                  : details?.data?.task?.fulfillments[0]?.start?.instructions?.code === '4'
                  ? 'other pickup confirmation code'
                  : 'OTP'}
              </span>
              <br />
              Short Description: <span>{details?.data?.task?.fulfillments[0]?.start?.instructions?.short_desc}</span>
              <br />
              Long Description:
              <span>
                {details?.data?.task?.fulfillments[0]?.start?.instructions?.long_desc
                  ? details?.data?.task?.fulfillments[0]?.start?.instructions?.long_desc
                  : 'NA'}
              </span>
            </AddressDetail>
          </DataWrapper>
        </LocationOrderDetailWrapper>
        <LocationOrderDetailWrapper>
          <Heading>Drop Instructions</Heading>

          <DataWrapper>
            <AddressDetail>
              Title:
              <span>
                {details?.data?.task?.fulfillments[0]?.end?.instructions?.code === '1'
                  ? 'OTP'
                  : details?.data?.task?.fulfillments[0]?.end?.instructions?.code === '2'
                  ? 'other DCC'
                  : 'no delivery code'}{' '}
              </span>
              <br />
              Short Description:
              <span>{details?.data?.task?.fulfillments[0]?.end?.instructions?.short_desc}</span>
              <br />
              Long Description:
              <span>
                {details?.data?.task?.fulfillments[0]?.end?.instructions?.long_desc
                  ? details?.data?.task?.fulfillments[0]?.end?.instructions?.long_desc
                  : 'NA'}
              </span>
            </AddressDetail>
          </DataWrapper>
        </LocationOrderDetailWrapper>
      </DetailContainer>
    </MainWrapper>
  )
}

export default OrderDetail
