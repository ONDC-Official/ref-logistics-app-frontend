import { Breadcrumb } from 'antd'
import AdminPrivateLayout from 'components/Layouts/adminPrivateLayout'
import HubsProfileDetails from 'views/hubsProfileDetail'
import { IssuesMainWrapper, HeadingWrapper, BreadcrumbWrapper, MainHeading } from 'styles/pages/gpsTracker'

const HubDetail = () => {
  const HubBreadcrumb: React.FC = () => (
    <Breadcrumb
      separator=">"
      items={[
        {
          title: 'Hubs',
          href: '/hubs',
        },
        {
          title: 'Hub Details',
        },
      ]}
    />
  )
  return (
    <AdminPrivateLayout>
      <IssuesMainWrapper>
        <HeadingWrapper>
          <BreadcrumbWrapper>
            <HubBreadcrumb />
            <MainHeading>Hub Details</MainHeading>
          </BreadcrumbWrapper>
        </HeadingWrapper>
        <HubsProfileDetails />
      </IssuesMainWrapper>
    </AdminPrivateLayout>
  )
}

export default HubDetail
