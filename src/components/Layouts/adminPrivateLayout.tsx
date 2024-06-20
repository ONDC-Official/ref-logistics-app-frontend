import { ReactNode, useContext, useEffect } from 'react'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import { AppContext } from 'context/payloadContext'

import { DashboardWrapper, DetailWrapper, DetailContainer } from 'styles/pages/dashboard'
import ROLES from 'constants/role'
import { useHistory } from 'react-router-dom'
import { HomeRoutes } from 'constants/routes'
const AdminPrivateLayout = ({ children }: { children: ReactNode }) => {
  const { userInfo } = useContext(AppContext)

  const navigate = useHistory()

  useEffect(() => {
    if (userInfo?.role?.name === ROLES.DRIVER) {
      navigate.push(HomeRoutes.path)
    }
  }, [userInfo])

  return (
    <DashboardWrapper>
      <Navbar />
      <DetailWrapper>
        <Sidebar />
        <DetailContainer>{children}</DetailContainer>
      </DetailWrapper>
    </DashboardWrapper>
  )
}

export default AdminPrivateLayout
