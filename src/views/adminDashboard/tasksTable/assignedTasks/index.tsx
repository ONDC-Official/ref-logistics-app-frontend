import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Popover, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { GPSTrackerRoute } from 'constants/routes'
import Modal from 'components/Modal'
import AssignedTasksDetails from 'views/adminDashboard/tasksTable/assignedTasks/assignedTaskTableDescription'
import UpdateStatus from 'views/updateModal'
import OptionIcon from 'assets/svg/OptionIcon'
import UserImage from 'assets/images/avatar_image.png'
import ArrowIcon from 'assets/svg/ArrowIcon'
import DownArrowIcon from 'assets/svg/DownArrowIcon'
import { DriverInfoWrapper, Name, NumberWrapper, StatusWrapper } from 'styles/views/adminDashboard/tableDescription'
import { ContentWrapper, Title } from 'styles/components/Navbar'

const AssignedTasksData = () => {
  const [updateModal, setUpdateModal] = useState(false)
  const updateTask = () => {
    setUpdateModal(true)
  }
  const router = useHistory()

  const content = (
    <ContentWrapper>
      <Title>Edit</Title>
      <Title onClick={updateTask}>Update</Title>
      <Title>Reschedule</Title>
      <Title>Reallocate</Title>
      <Title>Cancel</Title>
    </ContentWrapper>
  )

  const columns: ColumnsType<any> = [
    {
      title: 'Delivery Serial Number',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      render: (data: string) => {
        return <NumberWrapper>{data}</NumberWrapper>
      },
    },
    {
      title: 'Assigned Agents',
      dataIndex: 'assignedAgent',
      key: 'assignedAgent',
    },
    {
      title: 'Time Of Order',
      dataIndex: 'orderTime',
      key: 'orderTime',
    },
    {
      title: 'Time Of Delivery',
      dataIndex: 'deliveryTime',
      key: 'deliveryTime',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (data: string | JSX.Element) => {
        if (typeof data === 'string') {
          return <StatusWrapper variant={data === 'Pending' ? 'Pending' : 'inProgress'}>{data}</StatusWrapper>
        }

        return data // Return JSX.Element as is
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => (
        <Popover placement="bottomLeft" content={content} trigger="click" style={{ maxWidth: '100px' }}>
          <OptionIcon />
        </Popover>
      ),
    },
  ]

  const data = [
    {
      key: 1,
      serialNumber: '#827272UWG28',
      assignedAgent: (
        <DriverInfoWrapper>
          <img src={UserImage} alt="user" />
          <Name>David John</Name>
        </DriverInfoWrapper>
      ),
      orderTime: '28/09/23 (6:55Am) ',
      deliveryTime: '31/09/23 (10:30pm) ',
      status: 'Pending',
    },
    {
      key: 2,
      serialNumber: '#827272UWG28',
      assignedAgent: (
        <DriverInfoWrapper>
          <img src={UserImage} alt="user" />
          <Name>David John</Name>
        </DriverInfoWrapper>
      ),
      orderTime: '28/09/23 (6:55Am) ',
      deliveryTime: '31/09/23 (10:30pm) ',
      status: 'Pending',
    },
  ]

  return (
    <>
      <Table
        scroll={{ y: 200 }}
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender: () => (
            <div
              onClick={() => {
                router.push(`${GPSTrackerRoute.path}`)
              }}
            >
              <AssignedTasksDetails />
            </div>
          ),
          expandIcon: ({ expanded, onExpand, record }) => (
            <span onClick={(e) => onExpand(record, e as React.MouseEvent<HTMLSpanElement, MouseEvent>)}>
              {expanded ? <DownArrowIcon /> : <ArrowIcon />}
            </span>
          ),
        }}
      />

      <Modal isOpen={updateModal}>
        <UpdateStatus showModal={(value: boolean) => setUpdateModal(value)} />
      </Modal>
    </>
  )
}

export default AssignedTasksData
