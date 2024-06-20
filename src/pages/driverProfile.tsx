import { Breadcrumb } from 'antd'
import AdminPrivateLayout from 'components/Layouts/adminPrivateLayout'
import DriverProfileDetails from 'views/driverProfileDetails'
import { IssuesMainWrapper, HeadingWrapper, BreadcrumbWrapper, MainHeading } from 'styles/pages/gpsTracker'

const DriverProfile = () => {
  const DriverBreadcrumb: React.FC = () => (
    <Breadcrumb
      separator=">"
      items={[
        {
          title: 'Drivers',
          href: '/driver',
        },
        {
          title: 'Driver’s Profile',
        },
      ]}
    />
  )
  return (
    <AdminPrivateLayout>
      <IssuesMainWrapper>
        <HeadingWrapper>
          <BreadcrumbWrapper>
            <DriverBreadcrumb />
            <MainHeading>Driver&apos;s Profile</MainHeading>
          </BreadcrumbWrapper>
        </HeadingWrapper>
        <DriverProfileDetails />
      </IssuesMainWrapper>
    </AdminPrivateLayout>
  )
}

export default DriverProfile
