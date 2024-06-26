import React from 'react'
import { Breadcrumb } from 'antd'
import AdminPrivateLayout from 'components/Layouts/adminPrivateLayout'
import TaskDetails from 'views/taskDetails'
import { MainWrapper, HeadingWrapper, BreadcrumbWrapper, MainHeading } from 'styles/pages/addTask'

const AddTask = () => {
  const TaskBreadcrumb: React.FC = () => (
    <Breadcrumb
      separator=">"
      items={[
        {
          title: 'All Orders',
          href: '/tasks',
        },
        {
          title: 'Add New Orders',
        },
      ]}
    />
  )

  return (
    <AdminPrivateLayout>
      <MainWrapper>
        <HeadingWrapper>
          <BreadcrumbWrapper>
            <TaskBreadcrumb />
          </BreadcrumbWrapper>
          <MainHeading>Add Order</MainHeading>
        </HeadingWrapper>
        <TaskDetails />
      </MainWrapper>
    </AdminPrivateLayout>
  )
}

export default AddTask
