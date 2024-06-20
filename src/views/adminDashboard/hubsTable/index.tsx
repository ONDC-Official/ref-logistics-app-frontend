import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Popover, Table } from 'antd'
import { HubsProfileDetails } from 'constants/routes'
import { ColumnsType } from 'antd/es/table'
import Modal from 'components/Modal'
import NoRecords from 'components/RecordNotFound'
import { IHubsData } from 'interfaces/views'
import OptionIcon from 'assets/svg/OptionIcon'
import { ContentWrapper, Title } from 'styles/components/Navbar'
import { TableWrapper, PopoverWrapper, HubStatusWrapper } from 'styles/views/adminDashboard/tableDescription'
import { NumberWrapper } from 'styles/views/adminDashboard/tableDescription'
import UpdateHubsModal from 'views/updateHubModal'
import DeleteHubModal from 'views/deleteHubModal'
import HubStatusModal from 'views/hubStatusModal'

const HubsData = ({
  scroll,
  hubsDetails,
  getHubs,
  totalCount,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  searchedText,
}: IHubsData) => {
  const [hubId, setHubId] = useState('')
  const [deleteId, setDeleteId] = useState<string>('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [hubStatusModal, setHubStatusModal] = useState(false)
  const [value, setValue] = useState<string>('')
  const [popoverOpen, setPopoverOpen] = useState<boolean[]>([])
  const [updateModal, setUpdateModal] = useState(false)

  const router = useHistory()

  const handleActionClick = (index: number) => {
    setPopoverOpen((prevOpen) => {
      const updatedOpen = [...prevOpen]
      updatedOpen[index] = false
      return updatedOpen
    })
  }

  const updateHub = (id: string) => {
    setHubId(id)
    setUpdateModal(true)
  }

  const deleteData = (id: string) => {
    setDeleteId(id)
    setDeleteModal(true)
  }

  const deactivateHub = (id: string) => {
    setHubId(id)
    setHubStatusModal(true)
  }

  const content = (id: string, index: number, item: any) => {
    return (
      <ContentWrapper onClick={() => handleActionClick(index)}>
        <Title
          onClick={() => {
            router.push(`${HubsProfileDetails.path.replace(':id', id)}`)
          }}
        >
          View
        </Title>

        <Title onClick={() => updateHub(id)} id={id}>
          Update
        </Title>
        <Title onClick={() => deleteData(id)} id={id}>
          Delete
        </Title>
        {item?.status !== 'Active' ? (
          <Title
            onClick={() => {
              deactivateHub(item?._id)
              setValue('Active')
            }}
          >
            Active
          </Title>
        ) : (
          <Title
            onClick={() => {
              deactivateHub(item?._id)
              setValue('Inactive')
            }}
          >
            Inactive
          </Title>
        )}
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

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 115,
      filteredValue: searchedText ? [searchedText] : null,
      onFilter: (value: any, record: any) => {
        return (
          String(record?.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record?.addressDetails?.pincode).toLowerCase().includes(value.toLowerCase())
        )
      },
    },
    {
      title: 'Address',
      dataIndex: 'addressDetails',
      key: 'addressDetails',
      width: 115,
      render: (addressDetails) => (
        // Access the address details properties as needed
        <NumberWrapper>
          {addressDetails?.building},{addressDetails?.city}, {addressDetails?.state},{addressDetails?.country},
          {addressDetails?.pincode}
        </NumberWrapper>
      ),
    },

    {
      title: 'Status',
      dataIndex: 'status',
      width: 100,
      key: 'status',
      render: (data) => {
        return <HubStatusWrapper status={data}>{data === 'Active' ? 'Active' : 'Inactive'}</HubStatusWrapper>
      },
    },
    {
      title: 'Action',
      dataIndex: '_id',
      width: 80,
      key: 'x',
      render: (id, item, index) => {
        // console.log('item', item)
        return (
          <PopoverWrapper>
            <Popover
              key={item._id}
              placement="bottomLeft"
              content={content(id, index, item)}
              trigger="hover"
              open={popoverOpen[index]}
              onOpenChange={(open) => handlePopoverOpenChange(index, open)}
            >
              <OptionIcon />
            </Popover>
          </PopoverWrapper>
        )
      },
      fixed: 'right',
    },
  ]

  return (
    <TableWrapper>
      <Table
        columns={columns}
        dataSource={hubsDetails?.hubList}
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
      <Modal isOpen={updateModal}>
        <UpdateHubsModal
          showModal={(value: boolean) => setUpdateModal(value)}
          id={hubId}
          hubDetails={hubsDetails?.hubList?.find((e: any) => e._id === hubId)}
          getHubs={() => {
            getHubs()
          }}
        />
      </Modal>
      <Modal isOpen={deleteModal}>
        <DeleteHubModal
          showModal={(value: boolean) => setDeleteModal(value)}
          id={deleteId}
          getHubs={() => {
            getHubs()
          }}
        />
      </Modal>
      <Modal isOpen={hubStatusModal}>
        <HubStatusModal
          showModal={(value: boolean) => setHubStatusModal(value)}
          id={hubId}
          title={value === 'Active' ? 'Active' : 'Inactive'}
          subTitle={value === 'Active' ? 'activate' : 'inactivate'}
          value={value === 'Active' ? 'Active' : 'Inactive'}
          singleHubDetail={() => {
            getHubs()
          }}
        />
      </Modal>
    </TableWrapper>
  )
}

export default HubsData
