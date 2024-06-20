import { useEffect, useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import useGet from 'hooks/useGet'
import { AppContext } from 'context/payloadContext'
import APIS from 'constants/api'
import { InviteAgentRoute } from 'constants/routes'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import AdminPrivateLayout from 'components/Layouts/adminPrivateLayout'
import Modal from 'components/Modal'
import CommonTabs from 'components/Tabs'
import { TabItem } from 'interfaces'
import AddAdminModal from 'views/addAdminModal'
import UsersData from 'views/adminDashboard/usersTable'
import AdminData from 'views/adminDashboard/adminTable'
import InviteIcon from 'assets/svg/InviteIcon'
import SearchIcon from 'assets/svg/SearchIcon'

import {
  MainContainer,
  HeadingWrapper,
  MainHeading,
  InviteWrapper,
  AdminButtonWrapper,
  ActivityWrapper,
  SearchWrapper,
  InputWrapper,
  TabWrapper,
} from 'styles/views/dashboard'

const UsersDetail = () => {
  const [adminModal, setAdminModal] = useState(false)
  const [driversCurrentPage, setDriversCurrentPage] = useState(0)
  const [driversPageSize, setDriversPageSize] = useState(10)
  const [searchedText, setSearchedText] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const { sse } = useContext(AppContext)

  const { control } = useForm()
  const router = useHistory()

  const addAdmin = () => {
    setAdminModal(true)
  }

  const { refetch: fetchUsers, data: drivers } = useGet(
    'DriversInfo',
    `${APIS.DRIVERS_LIST}?skip=${driversCurrentPage}&search=${searchedText}&limit=${driversPageSize}`,
  )

  const { refetch: fetchAdminData, data: admins } = useGet(
    'AdminsInfo',
    `${APIS.ADMINS_LIST}?skip=${currentPage}&search=${searchedText}&limit=${pageSize}`,
  )

  const { refetch: getDashboard } = useGet('get-dashboard', `${APIS.USERS_DASHBOARD}`)

  useEffect(() => {
    getDashboard()
  }, [getDashboard, sse])

  useEffect(() => {
    fetchUsers()
  }, [driversPageSize, driversCurrentPage, sse, searchedText])

  useEffect(() => {
    fetchAdminData()
  }, [pageSize, currentPage, sse, searchedText])

  useEffect(() => {
    if (adminModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [adminModal])

  const handleInputChange = (e: any) => {
    setDriversCurrentPage(0)
    setSearchedText(e.target.value)
  }

  const items: TabItem[] = [
    {
      key: 'driver',
      label: 'Driver',
      children: (
        <UsersData
          users={drivers?.data?.drivers}
          fetchDrivers={fetchUsers}
          currentPage={driversCurrentPage}
          setCurrentPage={setDriversCurrentPage}
          pageSize={driversPageSize}
          setPageSize={setDriversPageSize}
          totalCount={drivers?.data?.count || 0}
          scroll={370}
          searchedText={searchedText}
        />
      ),
    },
    {
      key: 'admin',
      label: 'Admin',
      children: (
        <AdminData
          users={admins?.data?.admins}
          fetchAdmin={fetchAdminData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalCount={admins?.data?.count}
          scroll={370}
          searchedText={searchedText}
        />
      ),
    },
  ]

  const refetchOnChange = () => {
    // setSearchedText('')
  }

  return (
    <AdminPrivateLayout>
      <MainContainer>
        <HeadingWrapper>
          <MainHeading>Driver &amp; Admin</MainHeading>
          <InviteWrapper>
            <AdminButtonWrapper>
              <Button type="submit" label="Add Admin" variant="outline" onClick={addAdmin}>
                <InviteIcon />
              </Button>
            </AdminButtonWrapper>
            <AdminButtonWrapper>
              <Button
                type="submit"
                label="Add Driver"
                variant="outline"
                onClick={() => {
                  router.push(`${InviteAgentRoute.path}`)
                }}
              >
                <InviteIcon />
              </Button>
            </AdminButtonWrapper>
          </InviteWrapper>
        </HeadingWrapper>
        <ActivityWrapper>
          <SearchWrapper>
            <InputWrapper>
              <TextInput
                placeholder="Search "
                prefix={<SearchIcon />}
                control={control}
                name="search"
                value={searchedText}
                handleInputChange={handleInputChange}
              />
            </InputWrapper>
          </SearchWrapper>
          <TabWrapper>
            <CommonTabs items={items} apiRefresh={refetchOnChange} />
          </TabWrapper>
        </ActivityWrapper>
        <Modal isOpen={adminModal}>
          <AddAdminModal showModal={(value: boolean) => setAdminModal(value)} />
        </Modal>
      </MainContainer>
    </AdminPrivateLayout>
  )
}

export default UsersDetail
