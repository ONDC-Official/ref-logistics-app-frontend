import { ReactNode, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { Switch } from 'antd'
import APIS from 'constants/api'
import { NotificationScreenRoute } from 'constants/routes'
import usePost from 'hooks/usePost'
import useGet from 'hooks/useGet'
import { AppContext } from 'context/payloadContext'
import CommonTabs from 'components/Tabs'
import DriverAssignedTask from 'views/driverFlowHome/driverAssignedTask'
import DriverAllTasks from 'views/driverFlowHome/driverAllTasks'
import DriverOnDelivery from 'views/driverFlowHome/driverOnDelivery'
import NotificationIcon from 'assets/svg/NotificationIcon'
import {
  DriverHomeWrapper,
  StatusSection,
  TaskWrapper,
  StatusWrapper,
  StatusHeading,
  SwitchWrapper,
  TaskSection,
  TaskHeading,
  TaskOptions,
} from 'styles/views/driverFlowHome'

interface TabItem {
  key: string
  label: string
  children: ReactNode
}

const DriverFlowHome = () => {
  const [isActive, setIsActive] = useState<boolean>(localStorage?.getItem('online') === 'true' ? true : false)
  const router = useHistory()
  const { sse } = useContext(AppContext)
  const { mutateAsync } = usePost()
  const { refetch, data: taskData } = useGet('all-tasks', `${APIS.ALL_AGENT_TASK}`)

  useEffect(() => {
    refetch()
  }, [sse])

  const fetchCoordinates = async () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 60000,
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const coor = { lat: latitude, lng: longitude }
          if (coor) {
            mutateAsync({
              url: `${APIS.AGENT_LOCATION}`,
              payload: {
                currentLocation: [coor.lat, coor.lng],
                isOnline: true,
              },
            })
          }
        },

        (error) => {
          toast.dismiss()
          toast.error(`${error.message}`)
        },
        options,
      )
    }
  }

  const handleChange = async (checked: any) => {
    const intervalId = setInterval(fetchCoordinates, 15000)
    setIsActive(checked)
    await mutateAsync({
      url: `${APIS.AGENT_TOGGLE_STATUS}`,
      payload: {
        isOnline: checked,
      },
    })
    if (checked) {
      fetchCoordinates()
      localStorage.setItem('online', 'true')
      toast.dismiss()
      toast.success('Location tracker is activated')
    } else {
      await mutateAsync({
        url: `${APIS.AGENT_TOGGLE_STATUS}`,
        payload: '',
      })
      localStorage.removeItem('online')
      toast.error('Location tracker is deactivated')
      clearInterval(intervalId)
      window.location.reload()
    }
  }

  const onHandleClick = () => {
    router.push(`${NotificationScreenRoute.path}`)
  }

  const items: TabItem[] = [
    {
      key: 'All',
      label: 'All',
      children: <DriverAllTasks data={taskData} isActive={isActive} />,
    },
    {
      key: 'assigned',
      label: 'Assigned',
      children: <DriverAssignedTask data={taskData} isActive={isActive} />,
    },
    {
      key: 'onDelivery',
      label: 'On Delivery',
      children: <DriverOnDelivery isActive={isActive} data={taskData} />,
    },
  ]

  const refetchOnChange = () => {
    refetch()
  }

  return (
    <DriverHomeWrapper>
      <StatusSection>
        <StatusWrapper>
          <StatusHeading>My Status</StatusHeading>
          <SwitchWrapper>
            <Switch checked={isActive} onChange={handleChange} />
            {isActive ? <span>Online</span> : <span>Offline</span>}
          </SwitchWrapper>
        </StatusWrapper>
        <NotificationIcon onClick={onHandleClick} />
      </StatusSection>
      <TaskWrapper>
        <TaskSection>
          <TaskHeading>My Tasks</TaskHeading>
          <TaskOptions>
            <CommonTabs items={items} apiRefresh={refetchOnChange} />
          </TaskOptions>
        </TaskSection>
      </TaskWrapper>
    </DriverHomeWrapper>
  )
}

export default DriverFlowHome
