import { useEffect, useState } from 'react'
import { Breadcrumb } from 'antd'
import { useParams } from 'react-router-dom'
import { IParamId } from 'interfaces/pages'
import useGet from 'hooks/useGet'
import APIS from 'constants/api'
import Modal from 'components/Modal'
import AdminPrivateLayout from 'components/Layouts/adminPrivateLayout'
import UpdateStatus from 'views/updateModal'
import OrderDetail from 'views/adminDashboard/gpsTracker'
import {
  MainWrapper,
  HeadingWrapper,
  BreadcrumbWrapper,
  MainHeading,
  DetailContainer,
  DetailSection,
} from 'styles/pages/gpsTracker'

const GPSIssueTracker = () => {
  const [updateModal, setUpdateModal] = useState(false)
  const { id }: IParamId = useParams()
  const { refetch: getTrackData, data: trackIssue } = useGet('track-trackIssue', `${APIS.SINGLE_TASK_ISSUES}/${id}`)

  useEffect(() => {
    getTrackData()
  }, [getTrackData])

  const TaskBreadcrumb: React.FC = () => (
    <Breadcrumb
      separator=">"
      items={[
        {
          title: 'All Orders',
          href: '/tasks',
        },
        {
          title: 'Task Details',
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
            <MainHeading>Order Details</MainHeading>
          </BreadcrumbWrapper>
        </HeadingWrapper>
        <DetailContainer>
          <DetailSection>
            <OrderDetail details={trackIssue} />
          </DetailSection>
        </DetailContainer>
      </MainWrapper>
      <Modal isOpen={updateModal}>
        <UpdateStatus showModal={(value: boolean) => setUpdateModal(value)} />
      </Modal>
    </AdminPrivateLayout>
  )
}

export default GPSIssueTracker
