import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import useGet from 'hooks/useGet'
import { IParamId } from 'interfaces/pages'
import APIS from 'constants/api'
import { DashboardRoute } from 'constants/routes'
import OrderTracking from 'views/orderTracking'
import Logo from 'assets/images/ondc_logo.png'
import { MainWrapper, HeaderSection, LogoWrapper } from 'styles/pages/orderTrackingDetail'

const OrderTrackingDetail = () => {
  const { id }: IParamId = useParams()
  const router = useHistory()
  const { refetch: fetchTrackingDetails, data: trackingDetails } = useGet('all-tasksData', `${APIS.ALL_TASK}/${id}`)

  useEffect(() => {
    fetchTrackingDetails()
  }, [fetchTrackingDetails])

  return (
    <MainWrapper>
      <HeaderSection>
        <LogoWrapper
          onClick={() => {
            router.push(`${DashboardRoute.path}`)
          }}
        >
          <img src={Logo} alt="ONDC-Logo" />
        </LogoWrapper>
      </HeaderSection>
      <OrderTracking trackingDetails={trackingDetails} />
    </MainWrapper>
  )
}

export default OrderTrackingDetail
