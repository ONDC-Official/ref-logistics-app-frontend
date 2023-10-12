import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { Switch } from 'antd'
import APIS from 'constants/api'
import { NotificationScreenRoute } from 'constants/routes'
import usePost from 'hooks/usePost'
import useGet from 'hooks/useGet'
import { AppContext } from 'context/payloadContext'
import CommonTabs from 'components/Tabs'
import { TabItem } from 'interfaces'
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

const DriverFlowHome = () => {
  const [isActive, setIsActive] = useState<boolean>(localStorage?.getItem('online') === 'true' ? true : false)
  const router = useHistory()
  const { sse } = useContext(AppContext)
  const { mutateAsync } = usePost()
  const { refetch, data: taskData } = useGet('all-tasks', `${APIS.ALL_AGENT_TASK}`)
  useEffect(() => {
    refetch()
  }, [sse])

  useEffect(() => {
    let fetchedInterval: any

    if (localStorage?.getItem('online') === 'true' && isActive) {
      fetchedInterval = setInterval(fetchCoordinates, 5000)
    }

    return () => {
      clearInterval(fetchedInterval)
    }
  }, [])

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
            if (localStorage?.getItem('test-mode') === 'true') {
              const testCoor = [
                [28.551042, 77.268953],
                [28.551005, 77.268649],
                [28.550986, 77.268392],
                [28.550967, 77.268231],
                [28.550967, 77.268177],
                [28.550958, 77.268016],
                [28.55092, 77.267587],
                [28.550722, 77.267651],
                [28.55042, 77.267823],
                [28.550128, 77.267802],
                [28.549751, 77.267995],
                [28.549652, 77.268039],
              ]

              let index = 0
              let currentLoc = testCoor[index]
              // eslint-disable-next-line prefer-const
              let clearTestInterval: any

              const updateLocation = () => {
                currentLoc = testCoor[index]
                const token = localStorage?.getItem('accessToken')
                if (token)
                  mutateAsync({
                    url: `${APIS.AGENT_LOCATION}`,
                    payload: {
                      currentLocation: currentLoc,
                      isOnline: true,
                    },
                  })
                index++

                if (index >= testCoor.length) {
                  index = 0 // Reset to 0 when it reaches the end of the array.
                  clearInterval(clearTestInterval)
                }
              }

              clearTestInterval = setInterval(updateLocation, 5000)
            } else {
              const token = localStorage?.getItem('accessToken')
              if (token)
                mutateAsync({
                  url: `${APIS.AGENT_LOCATION}`,
                  payload: {
                    currentLocation: [coor.lat, coor.lng],
                    isOnline: true,
                  },
                })
            }
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
    let intervalId: any

    try {
      if (checked) {
        intervalId = setInterval(fetchCoordinates, 5000)
        setIsActive(checked)

        await mutateAsync({
          url: `${APIS.AGENT_TOGGLE_STATUS}`,
          payload: {
            isOnline: checked,
          },
        })

        localStorage.setItem('online', 'true')
        toast.dismiss()
        toast.success('Location tracker is activated')
      } else {
        setIsActive(checked)
        clearInterval(intervalId)

        await mutateAsync({
          url: `${APIS.AGENT_TOGGLE_STATUS}`,
          payload: checked,
        })

        localStorage.removeItem('online')
        toast.dismiss()
        toast.error('Location tracker is deactivated')
      }

      window.location.reload()
    } catch (error) {
      toast.error(`Something went wrong due to ${error}`)
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
          <TaskHeading>My Orders</TaskHeading>
          <TaskOptions>
            <CommonTabs items={items} apiRefresh={refetchOnChange} />
          </TaskOptions>
        </TaskSection>
      </TaskWrapper>
    </DriverHomeWrapper>
  )
}

export default DriverFlowHome
