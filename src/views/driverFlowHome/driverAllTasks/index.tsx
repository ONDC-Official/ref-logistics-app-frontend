import { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { OrderCompletionStateRoute, OrderStateRoutes } from 'constants/routes'
import { IDriverDataData } from 'interfaces/views'
import OfflineSection from 'views/driverFlowHome/offlineSection'
import NoTaskSection from 'views/driverFlowHome/noTask'
import { maskMobileNumber } from 'utils/maskMobileNumber'
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
import { AppContext } from 'context/payloadContext'

const DriverAllTasks = ({ data, isActive }: IDriverDataData) => {
  const [size, setSize] = useState(0)
  const router = useHistory()
  const [height, setHeight] = useState(0)
  const { userInfo } = useContext(AppContext)
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

  // console.log('data', data?.data?.tasks)

  return (
    <div>
      {!isActive ? (
        <OfflineSection />
      ) : data?.data?.tasks.length === 0 || !isActive ? (
        <NoTaskSection />
      ) : (
        <AssignedTaskContainer>
          {data?.data?.tasks.map((item: any, index: number) => {
            let fulfillment: any = {}
            if (item?.items[0]?.descriptor?.code === 'P2H2P') {
              fulfillment = item?.otherFulfillments?.find((i: any) => i?.assignee === userInfo?.agentId)
            } else {
              fulfillment = item?.fulfillments[0]
            }
            // const fulfillment = item.fulfillments[0]

            return (
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
                    item?.status === 'Order-delivered' || item?.status === 'In-transit'
                      ? router.push(`${OrderCompletionStateRoute.path.replace(':id', item._id)}`)
                      : router.push(`${OrderStateRoutes.path.replace(':id', item._id)}`)
                  }}
                >
                  <OrderWrapper>
                    <NameWrapper>
                      <OrderName>{item?.items[0]?.category_id} </OrderName>
                      <OrderNumber>
                        {item?.linked_order?.order?.id}
                        <span>{moment(`${item?.createdAt}`).fromNow()}</span>
                      </OrderNumber>
                    </NameWrapper>
                    <Status status={item?.status}>{item?.status}</Status>
                  </OrderWrapper>

                  <DeliveryWrapper>
                    <LocationContainer>
                      <PickupPointIcon />
                      <LocationWrapper>
                        <PickupName>
                          {fulfillment?.start?.location?.address?.name} <span> Pickup</span>
                        </PickupName>
                        <LocationAddress>
                          {fulfillment?.start?.location?.address?.building},
                          {fulfillment?.start?.location?.address?.city},{fulfillment?.start?.location?.address?.state},
                          {fulfillment?.start?.location?.address?.area_code},
                          {fulfillment?.start?.location?.address?.country}
                        </LocationAddress>
                        <LocationAddress>{maskMobileNumber(fulfillment?.start?.contact?.phone)}</LocationAddress>
                        <PickupTimeStamp>{fulfillment?.start?.location?.address?.city}</PickupTimeStamp>
                      </LocationWrapper>
                      <DeliveryPointIcon />
                      <LocationWrapper>
                        <DropLocationName>
                          {fulfillment?.end?.location?.address?.name}
                          <span>Destination</span>
                        </DropLocationName>
                        <LocationAddress>
                          {fulfillment?.end?.location?.address?.building},{fulfillment?.end?.location?.address?.city},
                          {fulfillment?.end?.location?.address?.state},{fulfillment?.end?.location?.address?.area_code},
                          {fulfillment?.end?.location?.address?.country}
                        </LocationAddress>
                        <LocationAddress>{maskMobileNumber(fulfillment?.end?.contact?.phone)}</LocationAddress>
                        <DropTimeStamp>{fulfillment?.end?.location?.address?.city}</DropTimeStamp>
                      </LocationWrapper>
                    </LocationContainer>
                  </DeliveryWrapper>

                  {data?.length === 0 ? <div>{isActive ? <NoTaskSection /> : <OfflineSection />}</div> : null}
                </AssignedTaskWrapper>
              </div>
            )
          })}
        </AssignedTaskContainer>
      )}
    </div>
  )
}

export default DriverAllTasks
