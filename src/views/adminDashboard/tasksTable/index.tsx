import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { Popover, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { GPSTrackerRoute, OrderTrackingDetailRoute } from 'constants/routes'
import Button from 'components/Button'
import Modal from 'components/Modal'
import TextInput from 'components/TextInput'
import NoRecords from 'components/RecordNotFound'
import AssignTasksModal from 'views/assignTaskModal'
import ItemDetails from 'views/adminDashboard/tasksTable/taskDescriptionTable'
import ArrowIcon from 'assets/svg/ArrowIcon'
import DownArrowIcon from 'assets/svg/DownArrowIcon'
import SearchIcon from 'assets/svg/SearchIcon'
import OptionIcon from 'assets/svg/OptionIcon'
import { NumberWrapper, QuantityWrapper, TaskStatusWrapper } from 'styles/views/adminDashboard/tableDescription'
import { AssignedButtonContainer } from 'styles/views/inviteAgentScreen/agentDetailSection'
import { InputWrapper } from 'styles/views/dashboard'
import { ButtonContainer, RightSection } from 'styles/views/adminDashboard'
import { ContentWrapper, Title } from 'styles/components/Navbar'

interface ITasksData {
  scroll?: number
  search?: boolean
  assignedData?: any
  unassignedData?: any
  pageSize: number
  currentPage: number
  totalUnAssignedCount: number
  totalAssignedCount: number
  searchedText?: any
  setPageSize?: any
  setCurrentPage?: any
  getUnassigned: () => void
  getassigned: () => void
}

const TasksData = ({
  search,
  scroll,
  assignedData,
  totalAssignedCount,
  totalUnAssignedCount,
  unassignedData,
  pageSize,
  currentPage,
  setPageSize,
  searchedText,
  setCurrentPage,
  getUnassigned,
  getassigned,
}: ITasksData) => {
  const [activeIndex, setActiveIndex] = useState('Pending')
  const [taskModal, setTaskModal] = useState(false)
  const [activeTask, setActiveTask] = useState('')
  // const [filteredStatus, setFilteredStatus] = useState('')
  // const [showPagination, setShowPagination] = useState(true)
  // const [showunAssignPagination, setShowUnassignPagination] = useState(true)
  const [popoverOpen, setPopoverOpen] = useState<any[]>([])
  const { control } = useForm()
  const router = useHistory()

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

  const content = (id: string, item: any, index: number) => {
    return (
      <ContentWrapper onClick={() => handleActionClick(index)}>
        <Title
          onClick={() => {
            router.push(`${GPSTrackerRoute.path.replace(':id', id)}`)
          }}
        >
          View
        </Title>
        {item?.status === 'Pending' || item?.status === 'Searching-for-Agent' ? (
          <Title onClick={() => handleClick(item?.status, item?._id)}>Assign Task</Title>
        ) : null}
      </ContentWrapper>
    )
  }

  const columns1: ColumnsType<any> = [
    {
      title: 'Item serial number',
      dataIndex: 'task_id',
      key: 'task_id',
      width: 145,
      fixed: 'left',
      render: (data: string) => {
        return <NumberWrapper>{data}</NumberWrapper>
      },

      onFilter: (value: any, record) => {
        return String(record?.status).toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      title: 'items Quantity',
      dataIndex: 'linked_order',
      key: 'linked_order',
      width: 115,
      render: (data: { items: [] }) => {
        return <QuantityWrapper>{data?.items?.length}</QuantityWrapper>
      },
      onFilter: (value: any, record) => {
        return (
          String(record?.status).toLowerCase().includes(value.toLowerCase()) ||
          String(record?.task_id).toLowerCase().includes(value.toLowerCase())
        )
      },
    },
    {
      title: 'Weight',
      dataIndex: 'linked_order',
      key: 'linked_order',
      width: 80,
      render: (data: { order: { weight: { unit: string; value: string } } }) => {
        return (
          <NumberWrapper>
            {data?.order?.weight?.value} {data?.order?.weight?.unit === 'kilogram' ? 'kg' : data?.order?.weight?.unit}
          </NumberWrapper>
        )
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 148,
      render: (data: string | JSX.Element) => {
        if (typeof data === 'string') {
          return <TaskStatusWrapper status={data}>{data}</TaskStatusWrapper>
        }
      },
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: 'x',
      width: 80,
      fixed: 'right',
      render: (id, item, index) => {
        return item.status !== 'Pending' ? (
          <Popover
            placement="bottomLeft"
            content={content(id, item, index)}
            trigger="hover"
            open={popoverOpen[index]}
            onOpenChange={(open) => handlePopoverOpenChange(index, open)}
          >
            <OptionIcon />
          </Popover>
        ) : (
          <Popover placement="bottomLeft">
            <OptionIcon />
          </Popover>
        )
      },
    },
  ]

  const columns2: ColumnsType<any> = [
    {
      title: 'Item serial number',
      dataIndex: 'task_id',
      key: 'task_id',
      width: 145,
      fixed: 'left',

      render: (data: string) => {
        return <NumberWrapper>{data}</NumberWrapper>
      },

      onFilter: (value: any, record) => {
        return String(record?.status).toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      title: 'items Quantity',
      dataIndex: 'linked_order',
      key: 'linked_order',
      width: 115,
      render: (data: { items: [] }) => {
        return <QuantityWrapper>{data?.items?.length}</QuantityWrapper>
      },

      onFilter: (value: any, record) => {
        return (
          String(record?.status).toLowerCase().includes(value.toLowerCase()) ||
          String(record?.task_id).toLowerCase().includes(value.toLowerCase())
        )
      },
    },
    {
      title: 'Weight',
      dataIndex: 'linked_order',
      key: 'linked_order',
      width: 80,

      render: (data: { items: [{ quantity: { measure: { unit: string; value: string } } }] }) => {
        const totalQuantityValue = data.items.reduce((total: any, item: any) => {
          const quantityValue = item.quantity.measure.value
          return total + quantityValue
        }, 0)
        return <NumberWrapper>{totalQuantityValue}</NumberWrapper>
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 148,
      render: (data: string | JSX.Element) => {
        if (typeof data === 'string') {
          return <TaskStatusWrapper status={data}>{data}</TaskStatusWrapper>
        }
      },
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: 'x',
      width: 80,
      fixed: 'right',
      render: (item) => {
        return (
          <Popover
            placement="bottomLeft"
            content={
              <ContentWrapper>
                <Title onClick={() => router.push(`${OrderTrackingDetailRoute.path.replace(':id', item)}`)}>
                  Track
                </Title>
                <Title onClick={() => router.push(`${GPSTrackerRoute.path.replace(':id', item)}`)}>View</Title>
              </ContentWrapper>
            }
            trigger="hover"
          >
            <OptionIcon />
          </Popover>
        )
      },
    },
  ]

  const handleClick = (status: string, taskId: string) => {
    if (status === 'Pending' || status === 'Cancelled' || status === 'Searching-for-Agent') {
      setTaskModal(true)
      setActiveTask(taskId)
    }
  }

  // useEffect(() => {
  //   if (searchedText === '' || searchedText === undefined) {
  //     setShowPagination(true)
  //   } else {
  //     setShowPagination(true)
  //   }
  // }, [searchedText])

  // useEffect(() => {
  //   if (searchedText === '' || searchedText === undefined) {
  //     setShowUnassignPagination(true)
  //   } else {
  //     setShowUnassignPagination(true)
  //   }
  // }, [searchedText])

  useEffect(() => {
    if (taskModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [taskModal])

  return (
    <>
      <AssignedButtonContainer>
        <ButtonContainer>
          <Button
            type="button"
            label="Unassigned"
            variant="outline"
            onClick={() => {
              setActiveIndex('Pending')
              getUnassigned()
            }}
            className={activeIndex === 'Pending' ? 'filled' : 'notfilled'}
          />
          <Button
            type="button"
            label="Assigned"
            variant="outline"
            className={activeIndex === 'Agent-assigned' ? 'filled' : 'notfilled'}
            onClick={() => {
              setActiveIndex('Agent-assigned')
              getassigned()
            }}
          />
        </ButtonContainer>
        {search ? (
          <RightSection>
            <InputWrapper>
              <TextInput
                placeholder="Search"
                prefix={<SearchIcon />}
                control={control}
                name="search"
                value={searchedText}
                handleInputChange={(e: React.FormEvent<HTMLInputElement>) => searchedText(e.currentTarget.value)}
              />
            </InputWrapper>
          </RightSection>
        ) : null}
      </AssignedButtonContainer>
      <>
        {activeIndex === 'Pending' ? (
          <Table
            scroll={{ y: scroll === undefined ? 200 : scroll }}
            columns={columns1}
            locale={{ emptyText: <NoRecords /> }}
            dataSource={unassignedData}
            expandable={{
              expandedRowRender: (record) => <ItemDetails record={record} />,
              expandIcon: ({ expanded, onExpand, record }) => {
                record?.status !== 'Pending' ? (
                  <span onClick={(e) => onExpand(record, e as React.MouseEvent<HTMLSpanElement, MouseEvent>)}>
                    {expanded ? <DownArrowIcon /> : <ArrowIcon />}
                  </span>
                ) : (
                  ''
                )
              },
            }}
            pagination={
              totalUnAssignedCount > 5 && {
                pageSizeOptions: ['5', '10', '20'],
                showSizeChanger: true,
                locale: { items_per_page: 'Records Per Page' },
                current: Math.ceil(currentPage / pageSize) + 1,
                pageSize: pageSize,
                total: totalUnAssignedCount,
                onChange: (currentPage, pageSize) => {
                  const newSkipValue = (currentPage - 1) * pageSize
                  setCurrentPage(newSkipValue)
                  setPageSize(pageSize)
                },
              }
            }
            rowKey="task_id"
          />
        ) : (
          <Table
            scroll={{ y: scroll === undefined ? 200 : scroll }}
            columns={columns2}
            locale={{ emptyText: <NoRecords /> }}
            dataSource={assignedData}
            expandable={{
              expandedRowRender: (record) => <ItemDetails record={record} />,
              expandIcon: ({ expanded, onExpand, record }) => (
                <span onClick={(e) => onExpand(record, e as React.MouseEvent<HTMLSpanElement, MouseEvent>)}>
                  {expanded ? <DownArrowIcon /> : <ArrowIcon />}
                </span>
              ),
            }}
            pagination={
              totalAssignedCount > 5 && {
                pageSizeOptions: ['5', '10', '20'],
                showSizeChanger: true,
                locale: { items_per_page: 'Records Per Page' },
                current: Math.ceil(currentPage / pageSize) + 1,
                pageSize: pageSize,
                total: totalAssignedCount,
                onChange: (currentPage, pageSize) => {
                  const newSkipValue = (currentPage - 1) * pageSize
                  setCurrentPage(newSkipValue)
                  setPageSize(pageSize)
                },
              }
            }
            rowKey="task_id"
          />
        )}
        <Modal isOpen={taskModal}>
          <AssignTasksModal showModal={(value: boolean) => setTaskModal(value)} activeTask={activeTask} />
        </Modal>
      </>
    </>
  )
}

export default TasksData
