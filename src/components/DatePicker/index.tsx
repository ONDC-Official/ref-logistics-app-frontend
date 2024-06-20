import React from 'react'
import type { DatePickerProps } from 'antd'
import { DatePicker, Space } from 'antd'

const onChange: DatePickerProps['onChange'] = (dateString) => {
  dateString
}

const SelectDate: React.FC = () => (
  <Space direction="vertical">
    <DatePicker onChange={onChange} ref={undefined} />
  </Space>
)

export default SelectDate
