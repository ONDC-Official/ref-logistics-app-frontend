import { Breadcrumb } from 'antd'
import AdminPrivateLayout from 'components/Layouts/adminPrivateLayout'
import IssueSummarySection from 'views/issueSummarySection'
import { IssuesMainWrapper, HeadingWrapper, BreadcrumbWrapper, MainHeading } from 'styles/pages/gpsTracker'

const IssueSummary = () => {
  const TaskBreadcrumb: React.FC = () => (
    <Breadcrumb
      separator=">"
      items={[
        {
          title: 'Issues',
          href: '/complaints',
        },
        {
          title: 'Issue Summary',
        },
      ]}
    />
  )

  return (
    <AdminPrivateLayout>
      <IssuesMainWrapper>
        <HeadingWrapper>
          <BreadcrumbWrapper>
            <TaskBreadcrumb />
            <MainHeading>Issue Summary</MainHeading>
          </BreadcrumbWrapper>
        </HeadingWrapper>
        <IssueSummarySection />
      </IssuesMainWrapper>
    </AdminPrivateLayout>
  )
}

export default IssueSummary
