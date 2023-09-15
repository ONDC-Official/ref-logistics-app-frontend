import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Popover, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import moment from 'moment'
import APIS from 'constants/api'
import usePost from 'hooks/usePost'
import { ISSUE_TYPES } from 'constants/fulfillmentCodes'
import { IssuesSummaryRoute } from 'constants/routes'
import Modal from 'components/Modal'
import NoRecords from 'components/RecordNotFound'
import ActionModal from 'views/issuesActionModal'
import OptionIcon from 'assets/svg/OptionIcon'
import { ContentWrapper, Title } from 'styles/components/Navbar'
import {
  NumberContainer,
  ActionStatusWrapper,
  TableWrapper,
  PopoverWrapper,
} from 'styles/views/adminDashboard/tableDescription'
import { LocationWrapper } from 'styles/views/orderTracking'

interface IIssuesData {
  scroll?: number
  issueDetails?: any
  getIssues: () => void
  pageSize: number
  currentPage: number
  totalCount: number
  searchedText?: any
  setPageSize?: any
  setCurrentPage?: any
}

const IssuesTable = ({
  scroll,
  issueDetails,
  getIssues,
  totalCount,
  pageSize,
  currentPage,
  setPageSize,
  searchedText,
  setCurrentPage,
}: IIssuesData) => {
  const [actionModal, setActionModal] = useState(false)
  const [issueId, setIssueId] = useState('')
  const [popoverOpen, setPopoverOpen] = useState<boolean[]>([])

  const { mutateAsync } = usePost()

  const router = useHistory()

  const processAction = async (id: string) => {
    try {
      const res = await mutateAsync({
        url: `${APIS.PROCESS_ISSUE}/${id}`,
      })
      if (res) {
        getIssues()
      }
    } catch (error) {
      error
    }
  }

  const handleActionClick = (index: number) => {
    setPopoverOpen((prevOpen) => {
      const updatedOpen = [...prevOpen]
      updatedOpen[index] = false
      return updatedOpen
    })
  }

  const content = (id: string, item: { status: string; issueState: string }, index: number) => {
    return (
      <ContentWrapper onClick={() => handleActionClick(index)}>
        <Title onClick={() => router.push(`${IssuesSummaryRoute.path.replace(':id', id)}`)}>View</Title>
        {item?.status !== 'CLOSED' ? (
          <>
            {item?.issueState === 'Pending' ? (
              <Title onClick={() => processAction(id)} id={id}>
                Process
              </Title>
            ) : null}
            {item?.issueState === 'Processing' ? (
              <Title onClick={() => resolveAction(id)} id={id}>
                Resolve
              </Title>
            ) : null}
          </>
        ) : null}
      </ContentWrapper>
    )
  }

  const handlePopoverOpenChange = (index: number, open: boolean) => {
    setPopoverOpen((prevOpen) => {
      const updatedOpen = [...prevOpen]
      updatedOpen[index] = open
      return updatedOpen
    })
  }
  const resolveAction = (id: string) => {
    setIssueId(id)
    setActionModal(true)
  }

  const columns: ColumnsType<any> = [
    {
      title: 'Issue ID',
      dataIndex: 'id',
      key: 'id',
      width: 115,
      fixed: 'left',
      render: (data: string) => {
        return <NumberContainer>{data.length > 6 ? `${data.slice(0, 6)}...` : data}</NumberContainer>
      },
      filteredValue: searchedText ? [searchedText] : null,
      onFilter: (value: any, record) => {
        return (
          String(record?.id).toLowerCase().includes(value.toLowerCase()) ||
          String(record?.issueState).toLowerCase().includes(value.toLowerCase()) ||
          String(record?.category).toLowerCase().includes(value.toLowerCase()) ||
          String(record?.sub_category).toLowerCase().includes(value.toLowerCase())
        )
      },
    },
    {
      title: 'Created On',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 115,
      render: (data) => {
        const inputDateTime = data
        const outputFormat = 'DD MMM YYYY [at] h:mma'
        const convertedDateTime = moment(inputDateTime).format(outputFormat)
        return <LocationWrapper>{convertedDateTime}</LocationWrapper>
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: 115,
      key: 'category',
    },
    {
      title: 'Issue Subcategory',
      dataIndex: 'sub_category',
      width: 112,
      key: 'sub_category',
      render: (data: string) => {
        const subCategoryCode = data ? ISSUE_TYPES[data as keyof typeof ISSUE_TYPES] : ''
        return <div>{subCategoryCode}</div>
      },
    },
    {
      title: 'Short Description',
      dataIndex: 'description',
      width: 115,
      key: 'description',
      render: (data: { short_desc: string }) => {
        return <div>{data?.short_desc}</div>
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 100,
      key: 'status',
      render: (data: string | JSX.Element) => {
        if (typeof data === 'string') {
          return <ActionStatusWrapper status={data}>{data}</ActionStatusWrapper>
        }
      },
    },
    {
      title: 'Action',
      dataIndex: '_id',
      width: 80,
      key: 'x',
      render: (id, item, index) => (
        <PopoverWrapper>
          <Popover
            key={item._id}
            placement="bottomLeft"
            content={content(id, item, index)}
            trigger="hover"
            open={popoverOpen[index]}
            onOpenChange={(open) => handlePopoverOpenChange(index, open)}
          >
            <OptionIcon />
          </Popover>
        </PopoverWrapper>
      ),
      fixed: 'right',
    },
  ]

  return (
    <TableWrapper>
      <Table
        columns={columns}
        dataSource={issueDetails}
        locale={{ emptyText: <NoRecords /> }}
        pagination={
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
        scroll={{ x: 900, y: scroll === undefined ? 250 : scroll }}
        size="middle"
        tableLayout="auto"
      />

      <Modal isOpen={actionModal}>
        <ActionModal showModal={(value: boolean) => setActionModal(value)} id={issueId} getIssues={() => getIssues()} />
      </Modal>
    </TableWrapper>
  )
}

export default IssuesTable
