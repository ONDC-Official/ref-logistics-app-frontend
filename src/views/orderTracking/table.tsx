import React from 'react'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import moment from 'moment'
import { OrderTableItem, OrderTableProps } from 'interfaces/views'
import { LocationWrapper } from 'styles/views/orderTracking'
import { InfoDetailsLink } from 'styles/views/driverProfileDetails'

const OrderTable: React.FC<OrderTableProps> = ({ details }) => {
  const handlePreviewClick = (item: any) => {
    window.open(item, '_blank')
  }

  const columns: ColumnsType<OrderTableItem> = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (data) => {
        return <LocationWrapper>{data}</LocationWrapper>
      },
    },

    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (data) => {
        const inputDateTime = data
        const outputFormat = 'DD MMM YYYY'
        const convertedDateTime = moment(inputDateTime).format(outputFormat)
        return <LocationWrapper>{convertedDateTime}</LocationWrapper>
      },
    },
    {
      title: 'Time',
      dataIndex: 'createdAt',
      key: 'time',
      render: (data) => {
        const inputDateTime = data
        const outputFormat = 'h:mma'
        const convertedDateTime = moment(inputDateTime).format(outputFormat)
        return <LocationWrapper>{convertedDateTime}</LocationWrapper>
      },
    },
    {
      title: 'Proof',
      dataIndex: 'link',
      key: 'link',
      render: (data) => {
        return (
          <LocationWrapper>
            {data ? <InfoDetailsLink onClick={() => handlePreviewClick(data)}>Download</InfoDetailsLink> : 'NA'}
          </LocationWrapper>
        )
      },
    },
  ]

  return <Table columns={columns} dataSource={details} pagination={false} />
}

export default OrderTable
