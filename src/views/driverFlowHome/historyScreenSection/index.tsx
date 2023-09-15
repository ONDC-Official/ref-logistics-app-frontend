import { useEffect, useState } from 'react'
import useGet from 'hooks/useGet'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import APIS from 'constants/api'
import TextInput from 'components/TextInput'
import NoRecords from 'components/RecordNotFound'
import { OrderStateRoutes } from 'constants/routes'
import PickupPointIcon from 'assets/svg/PickupPointIcon'
import DeliveryPointIcon from 'assets/svg/DeliveryPointIcon'
import SearchIcon from 'assets/svg/SearchIcon'
import {
  HistoryScreenWrapper,
  DeliveryWrapper,
  LocationWrapper,
  PickupName,
  LocationAddress,
  PickupTimeStamp,
  DropLocationName,
  DropTimeStamp,
  InputWrapper,
  TaskHeading,
  AssignedTaskWrapper,
  LocationContainer,
  NameWrapper,
  OrderName,
  OrderNumber,
  OrderWrapper,
  Status,
} from 'styles/views/driverFlowHome'

const HistoryScreenSection = () => {
  const { control } = useForm()
  const [filterInput, setFilterInput] = useState('')
  const router = useHistory()
  const [height, setHeight] = useState(0)

  const { refetch, data: HistoryData } = useGet('history-tasks', `${APIS.DRIVER_HISTORY}`)

  const handleInputChange = (e: any) => {
    setFilterInput(e.target.value)
  }

  useEffect(() => {
    setHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    refetch()
  }, [])

  return (
    <>
      <InputWrapper>
        <TaskHeading>History</TaskHeading>
        <TextInput
          placeholder="Search "
          prefix={<SearchIcon />}
          control={control}
          name={'search'}
          handleInputChange={handleInputChange}
        />
      </InputWrapper>
      {HistoryData?.data?.length === 0 ||
      !HistoryData?.data.filter(
        (item: any) =>
          item?.status?.toLowerCase().includes(filterInput.toLowerCase()) ||
          item?._id?.toLowerCase().includes(filterInput.toLowerCase()),
      ) ? (
        <NoRecords />
      ) : (
        <HistoryScreenWrapper>
          {HistoryData?.data
            .filter(
              (item: any) =>
                item?.status?.toLowerCase().includes(filterInput.toLowerCase()) ||
                item?._id?.toLowerCase().includes(filterInput.toLowerCase()),
            )
            .map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    router.push(`${OrderStateRoutes.path.replace(':id', item._id)}`)
                  }}
                  style={
                    item.length - 1 === index ? { marginBottom: (height / item.length) * 0.3 } : { marginBottom: '0px' }
                  }
                >
                  <AssignedTaskWrapper
                    key={index}
                    onClick={() => {
                      router.push(`${OrderStateRoutes.path.replace(':id', item._id)}`)
                    }}
                  >
                    <OrderWrapper>
                      <NameWrapper>
                        <OrderName>{item?.items[0]?.category_id}</OrderName>
                        <OrderNumber>{item?._id}</OrderNumber>
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
                            {item?.fulfillments[0]?.end?.location?.address?.name} <span>Destination</span>
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
                  </AssignedTaskWrapper>
                </div>
              )
            })}
        </HistoryScreenWrapper>
      )}
    </>
  )
}

export default HistoryScreenSection
