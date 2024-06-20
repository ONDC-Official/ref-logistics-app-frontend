import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import useGet from 'hooks/useGet'
import { AppContext } from 'context/payloadContext'
import APIS from 'constants/api'
import { InviteAgentRoute } from 'constants/routes'
import CommonTabs from 'components/Tabs'
import Modal from 'components/Modal'
import Button from 'components/Button'
import HubsData from 'views/adminDashboard/hubsTable'
import { TabItem } from 'interfaces'
import RecordSection from 'views/recordsSection'
import UsersData from 'views/adminDashboard/usersTable'
import AddAdminModal from 'views/addAdminModal'
import TasksData from 'views/adminDashboard/tasksTable'
import IssuesData from 'views/adminDashboard/issuesTable'
import AdminData from 'views/adminDashboard/adminTable'
import InviteIcon from 'assets/svg/InviteIcon'
import {
  MainWrapper,
  HeadingWrapper,
  Container,
  MainHeading,
  InviteWrapper,
  AdminButtonWrapper,
  DashboardInformationWrapper,
  ActivityWrapper,
  TitleWrapper,
  Title,
  TabWrapper,
} from 'styles/views/dashboard'

const DashboardDetail = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [taskCurrentPage, setTaskCurrentPage] = useState(0)
  const [currentAssignedPage, setCurrentAssignedPage] = useState(0)
  const [adminsCurrentPage, setAdminsCurrentPage] = useState(0)
  const [driversCurrentPage, setDriversCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [taskPageSize, setTaskPageSize] = useState(10)
  const [adminsPageSize, setAdminsPageSize] = useState(10)
  const [driversPageSize, setDriversPageSize] = useState(10)
  const [adminModal, setAdminModal] = useState(false)
  const { sse } = useContext(AppContext)
  const router = useHistory()

  const { refetch: fetchAdmin, data: admins } = useGet(
    'AdminDashboardInfo',
    `${APIS.ADMINS_LIST}?skip=${adminsCurrentPage}&search=&limit=${adminsPageSize}`,
  )

  const { refetch: fetchDrivers, data: drivers } = useGet(
    'DriverDashboardInfo',
    `${APIS.DRIVERS_LIST}?skip=${driversCurrentPage}&search=&limit=${driversPageSize}`,
  )

  const { refetch: fetchAssignedTasks, data: assignedData } = useGet(
    'get-assignedTasks',
    `${APIS.ALL_TASK}/assigned?skip=${currentAssignedPage}&search=&limit=${taskPageSize}`,
  )

  const { refetch: fetchUnassignedTasks, data: unassignedData } = useGet(
    'get-unassignedTasks',
    `${APIS.ALL_TASK}/unassigned?skip=${taskCurrentPage}&search=&limit=${taskPageSize}`,
  )

  const { refetch: getIssues, data: issueDetails } = useGet(
    'get-issues',
    `${APIS.ISSUE_LIST}?skip=${currentPage}&search=&limit=${pageSize}`,
  )

  const { refetch: getDashboard, data: dashboardDetails } = useGet('get-dashboard', `${APIS.USERS_DASHBOARD}`)

  const { refetch: getHubs, data: hubsDetails } = useGet(
    'get-hub',
    `${APIS.HUBS_LIST}?skip=${currentPage}&limit=${pageSize}`,
  )

  useEffect(() => {
    getHubs()
  }, [pageSize, currentPage])

  useEffect(() => {
    getIssues()
  }, [pageSize, currentPage, sse])

  useEffect(() => {
    getDashboard()
  }, [sse])

  useEffect(() => {
    fetchAdmin()
  }, [adminsPageSize, adminsCurrentPage, sse])

  useEffect(() => {
    fetchDrivers()
  }, [driversPageSize, driversCurrentPage, sse])

  useEffect(() => {
    fetchAssignedTasks()
  }, [taskPageSize, currentAssignedPage, sse])

  useEffect(() => {
    fetchUnassignedTasks()
  }, [taskPageSize, taskCurrentPage, sse])

  useEffect(() => {
    if (adminModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [adminModal])

  const addAdmin = () => {
    setAdminModal(true)
  }

  const newDriverData = drivers?.data?.drivers.length && drivers?.data?.drivers
  const sortedDriverData =
    drivers?.data?.drivers.length &&
    [...newDriverData].sort((a, b) => (a.isOnline === b.isOnline ? 0 : a.isOnline ? -1 : 1))

  const items: TabItem[] = [
    {
      key: 'tasks',
      label: 'Orders',
      children: (
        <TasksData
          assignedData={assignedData?.data?.tasks}
          unassignedData={unassignedData?.data?.tasks}
          setCurrentPage={setTaskCurrentPage}
          setCurrentAssignedPage={setCurrentAssignedPage}
          pageSize={taskPageSize}
          setPageSize={setTaskPageSize}
          currentPage={taskCurrentPage}
          currentAssignedPage={currentAssignedPage}
          totalUnAssignedCount={unassignedData?.data?.taskCount}
          totalAssignedCount={assignedData?.data?.taskCount}
          getUnassigned={fetchUnassignedTasks}
          getassigned={fetchAssignedTasks}
        />
      ),
    },
    {
      key: 'issues',
      label: 'Issues',
      children: (
        <IssuesData
          issueDetails={issueDetails?.data?.issueList}
          getIssues={getIssues}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          currentPage={currentPage}
          totalCount={dashboardDetails?.admins?.totalIssueCount}
        />
      ),
    },
    {
      key: 'driver',
      label: 'Driver',
      children: (
        <UsersData
          fetchDrivers={fetchDrivers}
          users={sortedDriverData}
          currentPage={driversCurrentPage}
          setCurrentPage={setDriversCurrentPage}
          pageSize={driversPageSize}
          setPageSize={setDriversPageSize}
          totalCount={dashboardDetails?.admins?.totalDriverCount}
        />
      ),
    },
    {
      key: 'admin',
      label: 'Admin',
      children: (
        <AdminData
          fetchAdmin={fetchAdmin}
          users={admins?.data?.admins}
          currentPage={adminsCurrentPage}
          setCurrentPage={setAdminsCurrentPage}
          pageSize={adminsPageSize}
          setPageSize={setAdminsPageSize}
          totalCount={admins?.data?.count}
        />
      ),
    },
    {
      key: 'hubs',
      label: 'Hubs',
      children: (
        <HubsData
          scroll={430}
          hubsDetails={hubsDetails?.data}
          getHubs={getHubs}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          currentPage={currentPage}
          totalCount={hubsDetails?.data?.hubCount}
        />
      ),
    },
  ]

  const refetchOnChange = (key: any) => {
    switch (key) {
      case 'admin':
        fetchAdmin()
        break

      case 'driver':
        fetchDrivers()
        break

      case 'issues':
        getIssues()
        break

      default:
        fetchAssignedTasks()
        fetchUnassignedTasks()
    }
  }

  return (
    <MainWrapper>
      <HeadingWrapper>
        <Container>
          <MainHeading>Dashboard</MainHeading>
        </Container>
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
      <DashboardInformationWrapper>
        <RecordSection
          totalOnlineDriver={
            dashboardDetails?.admins?.onlineDriversCount ? dashboardDetails?.admins?.onlineDriversCount : 0
          }
          totalDriverCount={dashboardDetails?.admins?.totalDriverCount ? dashboardDetails?.admins?.totalDriverCount : 0}
          totalIssueCount={dashboardDetails?.admins?.totalIssueCount ? dashboardDetails?.admins?.totalIssueCount : 0}
          totalTaskCount={dashboardDetails?.admins?.totalTaskCount ? dashboardDetails?.admins?.totalTaskCount : 0}
        />
        <ActivityWrapper>
          <TitleWrapper>
            <Title>Latest Activity</Title>
          </TitleWrapper>
          <TabWrapper>
            <CommonTabs items={items} apiRefresh={refetchOnChange} />
          </TabWrapper>
        </ActivityWrapper>
      </DashboardInformationWrapper>
      <Modal isOpen={adminModal}>
        <AddAdminModal showModal={(value: boolean) => setAdminModal(value)} />
      </Modal>
    </MainWrapper>
  )
}

export default DashboardDetail
