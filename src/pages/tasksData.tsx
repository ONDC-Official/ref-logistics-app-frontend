import { useEffect, useState } from 'react'
import useGet from 'hooks/useGet'
import APIS from 'constants/api'
import AdminPrivateLayout from 'components/Layouts/adminPrivateLayout'
import TasksData from 'views/adminDashboard/tasksTable'
import { MainContainer, HeadingWrapper, MainHeading, ActivityWrapper } from 'styles/views/dashboard'

const TaskDetails = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [currentAssignedPage, setCurrentAssignedPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [searchedText, setSearchedText] = useState('')

  const { refetch: fetchAssignedTasks, data: assignedData } = useGet(
    'get-assignedTasks',
    `${APIS.ALL_TASK}/assigned?skip=${currentAssignedPage}&search=${searchedText}&limit=${pageSize}`,
  )
  const { refetch: fetchUnassignedTasks, data: unassignedData } = useGet(
    'get-unassignedTasks',
    `${APIS.ALL_TASK}/unassigned?skip=${currentPage}&search=${searchedText}&limit=${pageSize}`,
  )

  useEffect(() => {
    fetchAssignedTasks()
  }, [pageSize, currentAssignedPage, searchedText])

  useEffect(() => {
    fetchUnassignedTasks()
  }, [pageSize, currentPage, searchedText])

  return (
    <AdminPrivateLayout>
      <MainContainer>
        <HeadingWrapper>
          <MainHeading>Orders</MainHeading>
        </HeadingWrapper>

        <ActivityWrapper>
          <TasksData
            scroll={400}
            search={true}
            assignedData={assignedData?.data?.tasks}
            unassignedData={unassignedData?.data?.tasks}
            setCurrentPage={setCurrentPage}
            setCurrentAssignedPage={setCurrentAssignedPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            searchedText={setSearchedText}
            currentPage={currentPage}
            currentAssignedPage={currentAssignedPage}
            totalUnAssignedCount={unassignedData?.data?.taskCount}
            totalAssignedCount={assignedData?.data?.taskCount}
            getUnassigned={fetchUnassignedTasks}
            getassigned={fetchAssignedTasks}
          />
        </ActivityWrapper>
      </MainContainer>
    </AdminPrivateLayout>
  )
}

export default TaskDetails
