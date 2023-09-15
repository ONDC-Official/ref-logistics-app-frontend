import AdminPrivateLayout from 'components/Layouts/adminPrivateLayout'
import CommonTabs from 'components/Tabs'
import useGet from 'hooks/useGet'
import APIS from 'constants/api'
import ChangePassword from 'views/editDetails/changePassword'
import PersonalDetails from 'views/editDetails/personalDetails'
import DashboardSettings from 'views/editDetails/dashboardSettings'
import Support from 'views/editDetails/supportSection'
import { TabItem } from 'interfaces'

import {
  MainWrapper,
  HeadingWrapper,
  MainHeading,
  SettingsWrapper,
  ActivityWrapper,
  TitleWrapper,
  Title,
  TabWrapper,
} from 'styles/views/dashboard'
import { AppContext } from 'context/payloadContext'
import { useContext } from 'react'

const EditDetails = () => {
  const { refetch: fetchUserInfo } = useGet('userProfile', APIS.GET_PROFILE_INFO)
  const { userInfo } = useContext(AppContext)

  const items: TabItem[] = [
    {
      key: 'personalDetails',
      label: 'Personal Details',
      children: <PersonalDetails />,
    },
    {
      key: 'changePassword',
      label: 'Change Password',
      children: <ChangePassword />,
    },
    {
      key: 'settings',
      label: 'Settings',
      children: <DashboardSettings />,
    },
    {
      key: 'support',
      label: 'Support',
      children: <Support />,
    },
  ]
  const masterEmail = process.env.REACT_APP_MASTER_EMAIL
  // to disable password change for public email
  if (masterEmail === userInfo?.email) items.splice(1, 1)
  const refetchOnChange = () => {
    fetchUserInfo()
  }

  return (
    <AdminPrivateLayout>
      <MainWrapper>
        <HeadingWrapper>
          <MainHeading>Settings</MainHeading>
        </HeadingWrapper>
        <SettingsWrapper>
          <ActivityWrapper>
            <TitleWrapper>
              <Title>Edit Details</Title>
            </TitleWrapper>
            <TabWrapper>
              <CommonTabs items={items} apiRefresh={refetchOnChange} />
            </TabWrapper>
          </ActivityWrapper>
        </SettingsWrapper>
      </MainWrapper>
    </AdminPrivateLayout>
  )
}

export default EditDetails
