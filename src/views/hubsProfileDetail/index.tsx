import { Key, ReactChild, ReactFragment, ReactPortal, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useGet from 'hooks/useGet'
import APIS from 'constants/api'
// import Modal from 'components/Modal'
// import Button from 'components/Button'
// import AddPinModal from 'views/addPInModal'
import { IParamId } from 'interfaces/pages'

import {
  DriverProfileContainer,
  DriverDetailsWrapper,
  DetailWrapper,
  Title,
  Detail,
  DriverInfoWrapper,
  Heading,
  DriverInfoContainer,
  InfoWrapper,
  InfoTitle,
  InfoDetails,
} from 'styles/views/driverProfileDetails'
import { HubStatusWrapper } from 'styles/views/adminDashboard/tableDescription'
// import { ButtonWrapper } from 'styles/views/issueSummarySection'

const HubsProfileDetails = () => {
  // const [addPincodeModal, setAddPincodeModal] = useState(false)

  const { id }: IParamId = useParams()
  const { refetch: getHubDetails, data: singleHubDetail } = useGet(
    'single-driver-detail',
    `${APIS.GET_HUB_DETAIL}/${id}`,
  )

  useEffect(() => {
    getHubDetails()
  }, [getHubDetails])

  // const setPincode = () => {
  //   setAddPincodeModal(true)
  // }

  return (
    <>
      {singleHubDetail?.data && (
        <DriverProfileContainer>
          <DriverDetailsWrapper>
            <DetailWrapper>
              <Title>Hub Name</Title>
              <Detail>{singleHubDetail?.data?.name}</Detail>
            </DetailWrapper>
            <DetailWrapper>
              <Title>Hub Status</Title>
              <HubStatusWrapper status={singleHubDetail?.data?.status === 'Active' ? 'Active' : 'Inactive'}>
                {singleHubDetail?.data?.status === 'Active' ? 'Active' : 'Inactive'}
              </HubStatusWrapper>
            </DetailWrapper>
          </DriverDetailsWrapper>

          <DriverInfoWrapper>
            <Heading>Address Details</Heading>
            <DriverInfoContainer>
              <InfoWrapper>
                <InfoTitle>Building</InfoTitle>
                <InfoDetails>{singleHubDetail?.data?.addressDetails?.building}</InfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>Pin Code</InfoTitle>
                <InfoDetails>{singleHubDetail?.data?.addressDetails?.pincode}</InfoDetails>
              </InfoWrapper>

              <InfoWrapper>
                <InfoTitle>Locality</InfoTitle>
                <InfoDetails>
                  {singleHubDetail?.data?.addressDetails?.locality
                    ? singleHubDetail?.data?.addressDetails?.locality
                    : 'NA'}
                </InfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>City</InfoTitle>
                <InfoDetails>{singleHubDetail?.data?.addressDetails?.city}</InfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>State</InfoTitle>
                <InfoDetails>{singleHubDetail?.data?.addressDetails?.state}</InfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>Country</InfoTitle>
                <InfoDetails>{singleHubDetail?.data?.addressDetails?.country}</InfoDetails>
              </InfoWrapper>
            </DriverInfoContainer>
          </DriverInfoWrapper>
          <DriverDetailsWrapper>
            {singleHubDetail?.data?.serviceablePincode.length !== 0 ? (
              <DriverInfoWrapper>
                <Heading>Serviceable Pincode</Heading>
                <DriverInfoContainer>
                  {/* <InfoDetails>{singleHubDetail?.data?.serviceablePincode}</InfoDetails> */}
                  <InfoDetails>
                    {singleHubDetail?.data?.serviceablePincode.map(
                      (
                        item: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined,
                        index: Key | null | undefined,
                      ) => (
                        <li key={index}>{item}</li>
                      ),
                    )}
                  </InfoDetails>
                </DriverInfoContainer>
              </DriverInfoWrapper>
            ) : null}
            {/* <ButtonWrapper>
              <Button label="ADD PIN" variant="outline" onClick={setPincode} />
            </ButtonWrapper> */}
          </DriverDetailsWrapper>

          {/* <Modal isOpen={addPincodeModal}>
            <AddPinModal
              showModal={(value: boolean) => setAddPincodeModal(value)}
              getHubDetails={getHubDetails}
              singleHubDetail={singleHubDetail}
              id={id}
            />
          </Modal> */}
        </DriverProfileContainer>
      )}
    </>
  )
}

export default HubsProfileDetails
