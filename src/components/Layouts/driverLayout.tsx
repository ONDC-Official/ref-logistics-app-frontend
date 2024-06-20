import { ReactNode, useContext, useEffect } from 'react'
import MobileNavbar from 'components/MobileNav'
import { DriverLayoutWrapperWrapper } from 'styles/views/driverFlowHome'
import ROLES from 'constants/role'
import { useHistory } from 'react-router-dom'
import { DashboardRoute, DriverLoginRoutes } from 'constants/routes'
import { AppContext } from 'context/payloadContext'
const DriverLayout = ({ children }: { children: ReactNode }) => {
  const { userInfo } = useContext(AppContext)

  const navigate = useHistory()

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate.push(DriverLoginRoutes.path)
    }

    if ([ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(userInfo?.role?.name)) {
      navigate.push(DashboardRoute.path)
    }
  }, [userInfo])
  return (
    <DriverLayoutWrapperWrapper>
      {children}
      <MobileNavbar />
    </DriverLayoutWrapperWrapper>
  )
}

export default DriverLayout
