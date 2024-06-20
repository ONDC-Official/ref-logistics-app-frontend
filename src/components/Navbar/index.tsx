import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Dropdown, Space, Popover } from 'antd'
import moment from 'moment'
import { DashboardRoute, SettingsRoute } from 'constants/routes'
import APIS from 'constants/api'
import { AppContext } from 'context/payloadContext'
import useGet from 'hooks/useGet'
import Modal from 'components/Modal'
import LogoutConfirmaionModal from 'views/logoutConfirmaionModal'
import AvatarImage from 'assets/images/avatar_image.png'
import BellIcon from 'assets/svg/BellIcon'
import DownIcon from 'assets/svg/DownArrowIcon'
import logo from 'assets/images/ondc_logo.png'
import {
  ContentContainer,
  Title,
  NavbarContainer,
  LogoSection,
  NameSection,
  LeftSection,
  RightSection,
  User,
  UserSection,
  ProfileSection,
  OptionsWrapper,
  UserRole,
  Username,
} from 'styles/components/Navbar'
import { NotifiactionWrapper, NotificationTitle, TimeStamp } from 'styles/views/driverFlowHome'

const Navbar = () => {
  const { userInfo } = useContext(AppContext)
  const [successModal, setSuccessModal] = useState(false)

  const { refetch, data: notifyData } = useGet('get-notification', `${APIS.GET_NOTIFICATIONS}`)
  const router = useHistory()

  useEffect(() => {
    refetch()
  }, [])

  const content = (
    <ContentContainer>
      <Title
        onClick={() => {
          router.push(`${SettingsRoute.path}`)
        }}
      >
        <NavLink className="title" to={`${SettingsRoute.path}`}>
          Settings
        </NavLink>
      </Title>
      <Title onClick={() => setSuccessModal(true)}>Logout</Title>
    </ContentContainer>
  )

  return (
    <NavbarContainer>
      <LeftSection>
        <LogoSection
          onClick={() => {
            router.push(`${DashboardRoute.path}`)
          }}
        >
          <img src={logo} alt="ONDC" />
        </LogoSection>
      </LeftSection>
      <RightSection>
        <NameSection>
          Welcome<User>{userInfo?.name}</User>
        </NameSection>

        <UserSection>
          <Dropdown
            menu={
              {
                items: notifyData?.data?.map((e: any, index: number) => {
                  return {
                    label: (
                      <NotifiactionWrapper>
                        <NotificationTitle>{e?.text}</NotificationTitle>
                        <TimeStamp>{moment(e?.createdAt).startOf('hour').fromNow()}</TimeStamp>
                      </NotifiactionWrapper>
                    ),
                    key: index,
                  }
                }),
              } || [
                {
                  key: '1',
                  label: <NotificationTitle>Data Not Found</NotificationTitle>,
                },
              ]
            }
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <BellIcon />
              </Space>
            </a>
          </Dropdown>

          <Popover placement="bottomLeft" content={content} trigger="hover">
            <ProfileSection>
              <img src={AvatarImage} alt="avatar" />
              <Username>
                {userInfo?.name} <UserRole>{userInfo?.role?.name}</UserRole>
              </Username>
              <OptionsWrapper>
                <DownIcon />
              </OptionsWrapper>
            </ProfileSection>
          </Popover>
        </UserSection>
      </RightSection>
      <Modal isOpen={successModal}>
        <LogoutConfirmaionModal showModal={(value: boolean) => setSuccessModal(value)} />
      </Modal>
    </NavbarContainer>
  )
}

export default Navbar
