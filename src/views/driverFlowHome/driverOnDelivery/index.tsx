import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { OrderStateRoutes } from 'constants/routes'
import { IDriverDataData } from 'interfaces/views'
import NoTaskSection from 'views/driverFlowHome/noTask'
import OfflineSection from 'views/driverFlowHome/offlineSection'
import DeliveryPointIcon from 'assets/svg/DeliveryPointIcon'
import PickupPointIcon from 'assets/svg/PickupPointIcon'
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

const DriverOnDelivery = ({ data, isActive }: IDriverDataData) => {
  const [size, setSize] = useState(0)
  const router = useHistory()
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
  const deliveryData = data?.data?.tasks?.filter((ele: { status: string }) => ele?.status === 'Out-for-delivery')
  return (
    <>
      {!isActive ? (
        <OfflineSection />
      ) : deliveryData?.length === 0 ? (
        <NoTaskSection />
      ) : (
        <AssignedTaskContainer>
          {data?.data?.tasks
            ?.filter((ele: { status: string }) => ele?.status === 'Out-for-delivery')
            .map((item: any, index: number) => (
              <div key={item?.task_id}>
                <AssignedTaskWrapper
                  key={index}
                  onClick={() => {
                    router.push(`${OrderStateRoutes.path.replace(':id', item._id)}`)
                  }}
                >
                  <OrderWrapper>
                    <NameWrapper>
                      <OrderName>{item?.items[0]?.category_id}</OrderName>
                      {size < 400 && (
                        <OrderNumber>
                          {item?._id?.length > 17 ? `${item?._id?.slice(0, 4)}... ${item?._id?.slice(-8)}` : item?._id}
                          <span>{moment(`${item?.createdAt}`).fromNow()}</span>
                        </OrderNumber>
                      )}
                      {size > 400 && (
                        <OrderNumber>
                          {item?.task_id.toUpperCase().substring(0, 8)}
                          <span>{moment(`${item?.createdAt}`).fromNow()}</span>
                        </OrderNumber>
                      )}
                    </NameWrapper>
                    <Status>{item?.status}</Status>
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
                          {item?.fulfillments[0]?.end?.location?.address?.name} <span>Destination</span>
                        </DropLocationName>
                        <LocationAddress>
                          {item?.fulfillments[0]?.end?.location?.address?.building}
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
                </AssignedTaskWrapper>
              </div>
            ))}
        </AssignedTaskContainer>
      )}
    </>
  )
}

export default DriverOnDelivery
