import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { OrderCompletionStateRoute, OrderStateRoutes } from 'constants/routes'
import { IDriverDataData } from 'interfaces/views'
import OfflineSection from 'views/driverFlowHome/offlineSection'
import NoTaskSection from 'views/driverFlowHome/noTask'
import PickupPointIcon from 'assets/svg/PickupPointIcon'
import DeliveryPointIcon from 'assets/svg/DeliveryPointIcon'
import {
  AssignedTaskContainer,
  AssignedTaskWrapper,
  OrderWrapper,
  NameWrapper,
  OrderName,
  OrderNumber,
  Status,
  DeliveryWrapper,
  LocationContainer,
  LocationWrapper,
  PickupName,
  LocationAddress,
  PickupTimeStamp,
  DropLocationName,
  DropTimeStamp,
} from 'styles/views/driverFlowHome'

const DriverAllTasks = ({ data, isActive }: IDriverDataData) => {
  const [size, setSize] = useState(0)
  const router = useHistory()
  const [height, setHeight] = useState(0)

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

  useEffect(() => {
    setHeight(window.innerHeight)
  }, [])

  return (
    <div>
      {!isActive ? (
        <OfflineSection />
      ) : data?.data?.tasks.length === 0 || !isActive ? (
        <NoTaskSection />
      ) : (
        <AssignedTaskContainer>
          {data?.data?.tasks.map((item: any, index: number) => (
            <div
              key={item?.task_id}
              style={
                data?.data?.tasks.length - 1 === index
                  ? { marginBottom: (height / data?.data?.tasks.length) * 0.3 }
                  : { marginBottom: '0px' }
              }
            >
              <AssignedTaskWrapper
                key={index}
                onClick={() => {
                  item?.status === 'Order-delivered'
                    ? router.push(`${OrderCompletionStateRoute.path.replace(':id', item._id)}`)
                    : router.push(`${OrderStateRoutes.path.replace(':id', item._id)}`)
                }}
              >
                <OrderWrapper>
                  <NameWrapper>
                    <OrderName>{item?.items[0]?.category_id}</OrderName>
                    {size < 400 && (
                      <OrderNumber>
                        {item?._id?.length > 17 ? `${item?._id?.slice(0, 4)}... ${item?._id?.slice(-8)}` : item?._id}
                        <span>{moment().startOf('hour').fromNow()}</span>
                      </OrderNumber>
                    )}
                    {size > 400 && (
                      <OrderNumber>
                        {item?._id}
                        <span>{moment(`${item?.createdAt}`).startOf('hour').fromNow()}</span>
                      </OrderNumber>
                    )}
                  </NameWrapper>
                  <Status status={item?.status}>{item?.status}</Status>
                </OrderWrapper>
                <DeliveryWrapper>
                  <LocationContainer>
                    <PickupPointIcon />
                    <LocationWrapper>
                      <PickupName>
                        {item?.fulfillments[0]?.start?.location?.address?.name} <span>Warehouser Pickup</span>
                      </PickupName>
                      <LocationAddress>
                        {item?.fulfillments[0]?.start?.location?.address?.building},
                        {item?.fulfillments[0]?.start?.location?.address?.city},
                        {item?.fulfillments[0]?.start?.location?.address?.state},
                        {item?.fulfillments[0]?.start?.location?.address?.area_code},
                        {item?.fulfillments[0]?.start?.location?.address?.country}
                      </LocationAddress>
                      <LocationAddress>{item?.fulfillments[0]?.start?.contact?.phone}</LocationAddress>
                      <PickupTimeStamp>{item?.fulfillments[0]?.start?.location?.address?.city}</PickupTimeStamp>
                    </LocationWrapper>
                    <DeliveryPointIcon />
                    <LocationWrapper>
                      <DropLocationName>
                        {item?.fulfillments[0]?.end?.location?.address?.name}
                        <span>Destination</span>
                      </DropLocationName>
                      <LocationAddress>
                        {item?.fulfillments[0]?.end?.location?.address?.building},
                        {item?.fulfillments[0]?.end?.location?.address?.city},
                        {item?.fulfillments[0]?.end?.location?.address?.state},
                        {item?.fulfillments[0]?.end?.location?.address?.area_code},
                        {item?.fulfillments[0]?.end?.location?.address?.country}
                      </LocationAddress>
                      <LocationAddress>{item?.fulfillments[0]?.end?.contact?.phone}</LocationAddress>
                      <DropTimeStamp>{item?.fulfillments[0]?.end?.location?.address?.city}</DropTimeStamp>
                    </LocationWrapper>
                  </LocationContainer>
                </DeliveryWrapper>
                {data?.length === 0 ? <div>{isActive ? <NoTaskSection /> : <OfflineSection />}</div> : null}
              </AssignedTaskWrapper>
            </div>
          ))}
        </AssignedTaskContainer>
      )}
    </div>
  )
}

export default DriverAllTasks
