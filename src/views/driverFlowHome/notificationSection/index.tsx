import { useEffect } from 'react'
import moment from 'moment'
import APIS from 'constants/api'
import BellIcon from 'assets/svg/BellIcon'
import MobileTopbar from 'components/MobileTopbar'
import useGet from 'hooks/useGet'
import {
  DriverNotificationWrapper,
  TaskHeading,
  TaskHeadingWrapper,
  NotificationsList,
  NotifiactionWrapper,
  NotificationTitle,
  TimeStamp,
} from 'styles/views/driverFlowHome'

const NotificationSection = () => {
  const { refetch, data: notifyData } = useGet('get-driver-notification', `${APIS.GET_NOTIFICATIONS}`)

  useEffect(() => {
    refetch()
  }, [])

  return (
    <DriverNotificationWrapper>
      <MobileTopbar />
      <TaskHeadingWrapper>
        <TaskHeading>Notifications</TaskHeading>
      </TaskHeadingWrapper>

      {notifyData?.data?.length === 0 ? (
        <NotifiactionWrapper>
          <BellIcon />
          <NotificationTitle>No Notifications</NotificationTitle>
        </NotifiactionWrapper>
      ) : (
        <NotificationsList>
          {notifyData?.data.map((e: any, index: any) => (
            <NotifiactionWrapper key={index}>
              <BellIcon />
              <NotificationTitle>{e?.text}</NotificationTitle>
              <TimeStamp>{moment(e?.createdAt).startOf('hour').fromNow()}</TimeStamp>
            </NotifiactionWrapper>
          ))}
        </NotificationsList>
      )}
    </DriverNotificationWrapper>
  )
}

export default NotificationSection
