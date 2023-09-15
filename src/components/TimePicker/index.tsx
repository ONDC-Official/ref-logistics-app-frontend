import { Space, TimePicker } from 'antd'
import type { Dayjs } from 'dayjs'

const onChange = (time: Dayjs | null, timeString: string) => {
  return { time, timeString }
}

const AvailableTime = () => (
  <Space wrap style={{ width: '100%' }}>
    <TimePicker
      use12Hours
      format="h:mm a"
      onChange={(time, timeString) => onChange(time, timeString)}
      style={{ width: '100%' }}
    />
  </Space>
)

export default AvailableTime
