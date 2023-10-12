import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { Switch } from 'antd'
import MobileTopbar from 'components/MobileTopbar'
import { AppContext } from 'context/payloadContext'
import { UpdateProfileRoute } from 'constants/routes'
import { DriverHomeWrapper, TaskHeading, CardWrapper, TaskHeadingWrapper, CardTitle } from 'styles/views/driverFlowHome'

const MyProfileSection = () => {
  const [isActive, setisActive] = useState<boolean>(localStorage?.getItem('test-mode') === 'true' ? true : false)
  const router = useHistory()
  const { userInfo } = useContext(AppContext)

  const handleChange = (checked: any) => {
    if (checked) {
      setisActive(true)
      localStorage.setItem('test-mode', 'true')
      toast.warn('Test mode activated')
    } else {
      setisActive(false)
      localStorage.setItem('test-mode', 'false')
      toast.success('Test mode deactivated')
      window.location.reload()
    }
  }

  return (
    <DriverHomeWrapper>
      <MobileTopbar />
      <TaskHeadingWrapper>
        <TaskHeading>My Profile</TaskHeading>
        <span
          onClick={() => {
            router.push(`${UpdateProfileRoute.path}`)
          }}
        >
          Edit
        </span>
      </TaskHeadingWrapper>

      <CardWrapper>
        <CardTitle>Name</CardTitle>
        <CardTitle>{userInfo?.name}</CardTitle>
      </CardWrapper>
      <CardWrapper>
        <CardTitle>Mobile Number</CardTitle>
        <CardTitle>{userInfo?.mobile}</CardTitle>
      </CardWrapper>
      <CardWrapper>
        <CardTitle>Email</CardTitle>
        <CardTitle>{userInfo?.email}</CardTitle>
      </CardWrapper>
      <CardWrapper>
        <CardTitle>Test Mode</CardTitle>
        <Switch checked={isActive} onChange={handleChange} />
      </CardWrapper>
    </DriverHomeWrapper>
  )
}

export default MyProfileSection
