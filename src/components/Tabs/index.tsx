import React from 'react'
import { Tabs } from 'antd'
import { CommonTabsProps } from 'interfaces'

const { TabPane } = Tabs

const CommonTabs: React.FC<CommonTabsProps> = ({ items, apiRefresh }) => {
  const handleChange = (key: string) => {
    apiRefresh(key)
  }

  return (
    <Tabs defaultActiveKey={items[0].key} onChange={handleChange}>
      {items.map((item) => (
        <TabPane key={item.key} tab={item.label}>
          {item.children}
        </TabPane>
      ))}
    </Tabs>
  )
}

export default CommonTabs
