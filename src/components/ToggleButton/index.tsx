import React from 'react'
import { Switch } from 'antd'

const onChange = (checked: boolean) => {
  return `switch to ${checked}`
}

const SwitchButton: React.FC = () => <Switch defaultChecked onChange={onChange} />

export default SwitchButton
