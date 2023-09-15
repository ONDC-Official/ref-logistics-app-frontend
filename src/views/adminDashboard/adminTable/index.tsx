import { useEffect, useState } from 'react'
import { Popover, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import NoRecords from 'components/RecordNotFound'
import Modal from 'components/Modal'
import { IAdminData } from 'interfaces'
import AdminStatusModal from 'views/adminStatusModal'
import OptionIcon from 'assets/svg/OptionIcon'
import { NumberWrapper, AdminStatusWrapper } from 'styles/views/adminDashboard/tableDescription'
import { ContentWrapper, Title } from 'styles/components/Navbar'

const AdminData = ({
  fetchAdmin,
  users,
  currentPage,
  pageSize,
  setCurrentPage,
  setPageSize,
  totalCount,
  searchedText,
}: IAdminData) => {
  const [showPagination, setShowPagination] = useState(true)
  const [adminStatusModal, setAdminStatusModal] = useState(false)
  const [adminId, setAdminId] = useState<string>('')
  const [value, setValue] = useState<number>(0)
  const [popoverOpen, setPopoverOpen] = useState<any[]>([])

  // const newPaginationView = () => {
  //   const val = users?.map(
  //     (item: { name: string; email: string; mobile: string }) =>
  //       item?.name?.includes(searchedText) ||
  //       item?.email?.includes(searchedText) ||
  //       item?.mobile?.includes(searchedText),
  //   )
  //   if (searchedText === '' || searchedText === undefined) {
  //     setShowPagination(true)
  //   } else if (val?.includes(true)) {
  //     setShowPagination(true)
  //   } else setShowPagination(false)
  // }
  const handleActionClick = (index: number) => {
    setPopoverOpen((prevOpen) => {
      const updatedOpen = [...prevOpen]
      updatedOpen[index] = false
      return updatedOpen
    })
  }

  const handlePopoverOpenChange = (index: number, open: any) => {
    setPopoverOpen((prevOpen) => {
      const updatedOpen = [...prevOpen]
      updatedOpen[index] = open
      return updatedOpen
    })
  }

  const actionsContent = (item: { enabled: number; _id: string }, index: any) => {
    return (
      <ContentWrapper onClick={() => handleActionClick(index)}>
        {item?.enabled == 0 ? (
          <Title onClick={() => deactivateDriver(item?._id, 1)}>Active</Title>
        ) : (
          <Title onClick={() => deactivateDriver(item?._id, 0)}>Inactive</Title>
        )}
      </ContentWrapper>
    )
  }
  const deactivateDriver = (id: string, value: number) => {
    setAdminId(id)
    setAdminStatusModal(true)
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
      dataIndex: 'name',
      key: 'name',
      render: (data: string | JSX.Element) => {
        if (typeof data === 'string') {
          return <NumberWrapper>{data}</NumberWrapper>
        }

        return data
      },
      filteredValue: searchedText ? [searchedText] : null,
      onFilter: (value: any, record: any) => {
        return (
          String(record?.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record?.mobile).toLowerCase().includes(value.toLowerCase()) ||
          String(record?.email).toLowerCase().includes(value.toLowerCase())
        )
      },
    },
    {
      title: 'Mobile Number ',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'enabled',
      key: 'status',
      render: (data) => {
        return <AdminStatusWrapper status={data}>{data === 1 ? 'Active' : 'Inactive'}</AdminStatusWrapper>
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (item, id, index) => {
        return (
          <Popover
            placement="bottomLeft"
            content={actionsContent(id, item)}
            open={popoverOpen[index]}
            onOpenChange={(open) => handlePopoverOpenChange(index, open)}
            trigger="hover"
          >
            <OptionIcon />
          </Popover>
        )
      },
    },
  ]

  return (
    <>
      <Table
        scroll={{ y: 250 }}
        columns={columns}
        locale={{ emptyText: <NoRecords /> }}
        dataSource={users}
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
        rowKey="email"
      />
      <Modal isOpen={adminStatusModal}>
        <AdminStatusModal
          showModal={(value: boolean) => setAdminStatusModal(value)}
          id={adminId}
          title={value === 1 ? 'Active Admin' : 'Inactive Admin'}
          value={value}
          fetchAdmin={fetchAdmin}
        />
      </Modal>
    </>
  )
}

export default AdminData
