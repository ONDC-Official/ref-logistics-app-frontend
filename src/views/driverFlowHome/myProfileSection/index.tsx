import MobileTopbar from 'components/MobileTopbar'
import { DriverHomeWrapper, TaskHeading, CardWrapper, TaskHeadingWrapper, CardTitle } from 'styles/views/driverFlowHome'
import { useContext } from 'react'
import { AppContext } from 'context/payloadContext'
import { useHistory } from 'react-router-dom'
import { UpdateProfileRoute } from 'constants/routes'

const MyProfileSection = () => {
  const router = useHistory()
  const { userInfo } = useContext(AppContext)

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
    </DriverHomeWrapper>
  )
}

export default MyProfileSection
