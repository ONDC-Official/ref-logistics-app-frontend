import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Popover, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { DriverProfileRoute } from 'constants/routes'
import Modal from 'components/Modal'
import NoRecords from 'components/RecordNotFound'
import DeleteTaskModal from 'views/deleteTaskModal'
import DeactivateDriver from 'views/deleteTaskModal/deactivateDriver'
import DriverDetails from 'views/adminDashboard/usersTable/userTableDescription'
import { IUserData } from 'interfaces'
import OptionIcon from 'assets/svg/OptionIcon'
import ArrowIcon from 'assets/svg/ArrowIcon'
import DownArrowIcon from 'assets/svg/DownArrowIcon'
import UserImage from 'assets/images/avatar_image.png'
import {
  DriverInfoWrapper,
  Name,
  DriverStatusConatiner,
  DriverStatusWrapper,
  BlockDriverStatusWrapper,
  StatusButton,
  StatusOffline,
  PopOverTitle,
} from 'styles/views/adminDashboard/tableDescription'
import { ContentWrapper, Title } from 'styles/components/Navbar'

const UsersData = ({
  users,
  currentPage,
  pageSize,
  setCurrentPage,
  setPageSize,
  totalCount,
  scroll,
  searchedText,
  fetchDrivers,
}: IUserData) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const [deactivateModal, setDeactivateModal] = useState(false)
  const [deleteId, setDeleteId] = useState<string>('')
  const [deactivateId, setDeactivateId] = useState<string>('')
  const [value, setValue] = useState<number>(0)
  const [popoverOpen, setPopoverOpen] = useState<any[]>([])
  const [showPagination, setShowPagination] = useState(true)

  const router = useHistory()

  const handleActionClick = (index: number) => {
    setPopoverOpen((prevOpen) => {
      const updatedOpen = [...prevOpen]
      updatedOpen[index] = false
      return updatedOpen
    })
  }
  const actionsContent = (
    id: string,
    item: {
      userId: {
        isAccountLocked: boolean
        enabled: number
        _id: string
      }
    },
    index: number,
  ) => {
    return (
      <ContentWrapper onClick={() => handleActionClick(index)}>
        <Title
          onClick={() => {
            router.push(`${DriverProfileRoute.path.replace(':id', id)}`, { state: { userId: item?.userId._id } })
          }}
        >
          Profile
        </Title>
        {item?.userId?.enabled !== 2 ? (
          <Title onClick={() => deactivateDriver(id, 2)} id={id}>
            Deactivate
          </Title>
        ) : (
          <Title onClick={() => deactivateDriver(id, 1)} id={id}>
            Activate
          </Title>
        )}
        {item?.userId?.enabled === 2 && item?.userId?.isAccountLocked !== true ? (
          <Title onClick={() => deleteData(id)} id={id}>
            Delete
          </Title>
        ) : null}
      </ContentWrapper>
    )
  }

  const handlePopoverOpenChange = (index: number, open: any) => {
    setPopoverOpen((prevOpen) => {
      const updatedOpen = [...prevOpen]
      updatedOpen[index] = open
      return updatedOpen
    })
  }

  const deleteData = (id: string) => {
    setDeleteId(id)
    setDeleteModal(true)
  }
  const deactivateDriver = (id: string, value: number) => {
    setDeactivateId(id)
    setDeactivateModal(true)
    setValue(value)
  }

  useEffect(() => {
    if (searchedText === '' || searchedText === undefined) {
      setShowPagination(true)
    } else {
      setShowPagination(true)
    }
  }, [searchedText])

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'userId',
      key: 'name',
      width: 115,
      fixed: 'left',
      render: (info) => {
        return (
          <DriverInfoWrapper>
            <img src={UserImage} alt="user" />
            <Name>{info?.name}</Name>
          </DriverInfoWrapper>
        )
      },
      onFilter: (value: any, record) => {
        return (
          String(record?.userId?.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record?.userId?.mobile).toLowerCase().includes(value.toLowerCase()) ||
          String(record?.userId?.email).toLowerCase().includes(value.toLowerCase())
        )
      },
    },
    {
      title: 'Mobile Number',
      dataIndex: 'userId',
      key: 'Contact',
      width: 115,
      render: (info) => <>{info?.mobile}</>,
    },
    {
      title: 'Email',
      dataIndex: 'userId',
      key: 'email',
      width: 135,

      render: (info) => <>{info?.email}</>,
    },
    {
      title: 'Status',
      dataIndex: 'userId',
      key: 'status',
      width: 148,

      render: (data) => {
        return (
          <DriverStatusConatiner>
            {data?.isAccountLocked && data?.enabled === 1 ? (
              <BlockDriverStatusWrapper status={data?.isAccountLocked}>Blocked</BlockDriverStatusWrapper>
            ) : (
              <DriverStatusWrapper status={data?.enabled}>
                {data?.enabled === 1 ? 'Available' : data?.enabled === 2 ? 'Inactive' : 'Ongoing'}
                {/* {data?.enabled === 1 ? 'Onboarded' : data?.enabled === 2 ? 'Inactive' : 'Ongoing'} */}
              </DriverStatusWrapper>
            )}
          </DriverStatusConatiner>
        )
      },
    },
    {
      title: 'Online/Offline',
      dataIndex: 'isOnline',
      key: 'isOnline',
      width: 115,

      render: (data) => {
        return (
          <div>
            {data ? (
              <Popover placement="topLeft" content={<PopOverTitle>Online</PopOverTitle>}>
                <StatusButton />
              </Popover>
            ) : (
              <Popover placement="topLeft" content={<PopOverTitle>Offline</PopOverTitle>}>
                <StatusOffline />
              </Popover>
            )}
          </div>
        )
      },
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: 'x',
      width: 80,
      fixed: 'right',

      render: (id, item, index) => (
        <Popover
          key={item._id}
          placement="bottomLeft"
          trigger="hover"
          content={actionsContent(id, item, index)}
          open={popoverOpen[index]}
          onOpenChange={(open) => handlePopoverOpenChange(index, open)}
        >
          <OptionIcon />
        </Popover>
      ),
    },
  ]

  return (
    <>
      <Table
        scroll={{ y: scroll === undefined ? 250 : scroll }}
        columns={columns}
        dataSource={users}
        locale={{ emptyText: <NoRecords /> }}
        expandable={{
          expandedRowRender: (users) => <DriverDetails users={users} />,
          expandIcon: ({ expanded, onExpand, record }) => (
            <span onClick={(e) => onExpand(record, e as React.MouseEvent<HTMLSpanElement, MouseEvent>)}>
              {expanded ? <DownArrowIcon /> : <ArrowIcon />}
            </span>
          ),
        }}
        pagination={
          showPagination &&
          totalCount > 5 && {
            pageSizeOptions: ['5', '10', '20'],
            showSizeChanger: true,
            locale: { items_per_page: 'Records Per Page' },
            current: Math.ceil(currentPage / pageSize) + 1,
            pageSize: pageSize,
            total: totalCount,
            onChange: (currentPage, pageSize) => {
              const newSkipValue = (currentPage - 1) * pageSize
              setCurrentPage(newSkipValue)
              setPageSize(pageSize)
            },
          }
        }
        rowKey="userId"
      />

      <Modal isOpen={deleteModal}>
        <DeleteTaskModal
          showModal={(value: boolean) => setDeleteModal(value)}
          id={deleteId}
          fetchDrivers={fetchDrivers}
        />
      </Modal>
      <Modal isOpen={deactivateModal}>
        <DeactivateDriver
          showModal={(value: boolean) => setDeactivateModal(value)}
          id={deactivateId}
          title={value === 1 ? 'Activate Driver' : 'Deactivate Driver'}
          value={value}
          fetchDrivers={fetchDrivers}
        />
      </Modal>
    </>
  )
}

export default UsersData
