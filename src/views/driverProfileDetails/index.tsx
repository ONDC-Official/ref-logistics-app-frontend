import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CopyOutlined } from '@ant-design/icons'
import { message } from 'antd'
import useGet from 'hooks/useGet'
import APIS from 'constants/api'
import Button from 'components/Button'
import Modal from 'components/Modal'
import { IParamId } from 'interfaces/pages'
import AddDriverModal from 'views/addDriverModal'
import AvatarImage from 'assets/images/avatar_image.png'
import CloseEyeIcon from 'assets/svg/CloseEyeIcon'
import EyeIcon from 'assets/svg/EyeIcon'

import {
  DriverProfileContainer,
  DriverDetailsWrapper,
  DriverDetails,
  DetailWrapper,
  Title,
  Detail,
  DriverTaskWrapper,
  TaskDetailWrapper,
  TaskDetail,
  TaskTitle,
  DriverInfoWrapper,
  Heading,
  DriverInfoContainer,
  InfoWrapper,
  InformationWrapper,
  InfoTitle,
  DriverInfo,
  InfoDetails,
  DriverInfoDetails,
  InfoDetailsLink,
  ButtonWrapper,
  MaskPanCard,
} from 'styles/views/driverProfileDetails'

const DriverProfileDetails = () => {
  const [showPan, setShowPan] = useState(false)
  const [updateDriver, setUpdateDriver] = useState(false)

  const { id }: IParamId = useParams()
  const { refetch: getDriverDetails, data: singleDriverDetail } = useGet(
    'single-driver-detail',
    `${APIS.GET_DRIVER_DETAIL}/${id}`,
  )

  const handlePreviewClick = (item: any) => {
    window.open(item, '_blank')
  }
  const [messageApi, contextHolder] = message.useMessage()

  const Success = () => {
    messageApi.open({
      type: 'success',
      content: 'Id copied to clipboard',
      duration: 1,
    })
  }

  const updateDriverDetail = () => {
    setUpdateDriver(true)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`${agentDetails?._id}`)
    Success()
  }

  const agentDetails = singleDriverDetail?.data?.agentDetails
  const panDetails = agentDetails?.KYCDetails?.PANdetails

  const maskPan = (pan: string) => {
    if (showPan) {
      return pan
    } else {
      const maskedPan = pan ? '**********' : ''
      return maskedPan
    }
  }

  useEffect(() => {
    getDriverDetails()
  }, [getDriverDetails])

  return (
    <>
      {singleDriverDetail?.data?.agentDetails && (
        <DriverProfileContainer>
          <DriverDetailsWrapper>
            <DriverDetails>
              <img src={AvatarImage} alt="avatar" />
              <DetailWrapper>
                <Title>Driver Name</Title>
                <Detail>{agentDetails?.userId?.name}</Detail>
              </DetailWrapper>
            </DriverDetails>
            <DriverTaskWrapper>
              <TaskDetailWrapper>
                <TaskDetail>{singleDriverDetail?.data?.tasksInProgress}</TaskDetail>
                <TaskTitle>In Progress</TaskTitle>
              </TaskDetailWrapper>
              <TaskDetailWrapper>
                <TaskDetail>{singleDriverDetail?.data?.totalTasksCount}</TaskDetail>
                <TaskTitle>Total Orders</TaskTitle>
              </TaskDetailWrapper>
              <TaskDetailWrapper>
                <TaskDetail>{singleDriverDetail?.data?.completedTasks}</TaskDetail>
                <TaskTitle>Completed Orders</TaskTitle>
              </TaskDetailWrapper>
            </DriverTaskWrapper>
          </DriverDetailsWrapper>
          <DriverInfoWrapper>
            <Heading>Driver&apos;s Details</Heading>
            <DriverInfoContainer>
              <InfoWrapper>
                <InfoTitle>Name</InfoTitle>
                <InfoDetails>{agentDetails?.userId?.name}</InfoDetails>
              </InfoWrapper>

              <InfoWrapper>
                <InfoTitle>Delivery Experience</InfoTitle>
                <InfoDetails>{agentDetails?.deliveryExperience}</InfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>Email</InfoTitle>
                <DriverInfoDetails>{agentDetails?.userId?.email}</DriverInfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>Mobile Number</InfoTitle>
                <InfoDetails>{agentDetails?.userId?.mobile}</InfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>DOB</InfoTitle>
                <InfoDetails>{agentDetails?.dob}</InfoDetails>
              </InfoWrapper>
            </DriverInfoContainer>
            <InformationWrapper>
              <InfoTitle>Driver ID</InfoTitle>
              <DriverInfo>
                <DriverInfoDetails>{agentDetails?._id}</DriverInfoDetails>
                {contextHolder}
                <CopyOutlined rev={agentDetails?._id} onClick={handleCopy} />
              </DriverInfo>
            </InformationWrapper>
          </DriverInfoWrapper>
          <DriverInfoWrapper>
            <Heading>Address Details</Heading>
            <DriverInfoContainer>
              <InfoWrapper>
                <InfoTitle>Building</InfoTitle>
                <InfoDetails>{agentDetails?.addressDetails?.building}</InfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>Pin Code</InfoTitle>
                <InfoDetails>{agentDetails?.addressDetails?.pincode}</InfoDetails>
              </InfoWrapper>

              <InfoWrapper>
                <InfoTitle>Locality</InfoTitle>
                <InfoDetails>{agentDetails?.addressDetails?.locality}</InfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>City</InfoTitle>
                <InfoDetails>{agentDetails?.addressDetails?.city}</InfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>State</InfoTitle>
                <InfoDetails>{agentDetails?.addressDetails?.state}</InfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>Country</InfoTitle>
                <InfoDetails>{agentDetails?.addressDetails?.country}</InfoDetails>
              </InfoWrapper>
            </DriverInfoContainer>
          </DriverInfoWrapper>
          <DriverInfoWrapper>
            <Heading>KYC Details </Heading>
            <DriverInfoContainer>
              <InfoWrapper>
                <InfoTitle>PAN Details</InfoTitle>
                <MaskPanCard>
                  <InfoDetails>{maskPan(panDetails)}</InfoDetails>
                  {showPan ? (
                    <CloseEyeIcon onClick={() => setShowPan(!showPan)} />
                  ) : (
                    <EyeIcon onClick={() => setShowPan(!showPan)} />
                  )}
                </MaskPanCard>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>Driving Licence Number</InfoTitle>
                <InfoDetails>{agentDetails?.KYCDetails?.aadhaarNumber}</InfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>PAN Card</InfoTitle>
                <InfoDetailsLink onClick={() => handlePreviewClick(agentDetails?.KYCDetails?.PANcard)}>
                  Download
                </InfoDetailsLink>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>Driving Licence Document</InfoTitle>
                <InfoDetailsLink onClick={() => handlePreviewClick(agentDetails?.KYCDetails?.drivingLicense)}>
                  Download
                </InfoDetailsLink>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>Address Proof</InfoTitle>
                <InfoDetailsLink onClick={() => handlePreviewClick(agentDetails?.KYCDetails?.addressProof)}>
                  Download
                </InfoDetailsLink>
              </InfoWrapper>

              <InfoWrapper>
                <InfoTitle>ID Proof</InfoTitle>
                <InfoDetailsLink onClick={() => handlePreviewClick(agentDetails?.KYCDetails?.IDproof)}>
                  Download
                </InfoDetailsLink>
              </InfoWrapper>
            </DriverInfoContainer>
          </DriverInfoWrapper>
          <DriverInfoWrapper>
            <Heading>Vehicle Details </Heading>
            <DriverInfoContainer>
              <InfoWrapper>
                <InfoTitle>Vehicle Number</InfoTitle>
                <InfoDetails>{agentDetails?.vehicleDetails?.vehicleNumber}</InfoDetails>
              </InfoWrapper>

              <InfoWrapper>
                <InfoTitle>Vehicle Registration Document</InfoTitle>
                <InfoDetailsLink
                  onClick={() => handlePreviewClick(agentDetails?.vehicleDetails?.vehicleRegistrationDocument)}
                >
                  Download
                </InfoDetailsLink>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>Make Year</InfoTitle>
                <InfoDetails>{agentDetails?.vehicleDetails?.makeYear}</InfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>Max. Weight Capacity</InfoTitle>
                <InfoDetails>
                  {agentDetails?.vehicleDetails?.maxWeightCapacity?.weight}
                  {agentDetails?.vehicleDetails?.maxWeightCapacity?.unit}
                </InfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>Delivery Methods</InfoTitle>
                {agentDetails?.deliveryType?.map((item: any, index: number) => {
                  return <InfoDetails key={index}>{item}</InfoDetails>
                })}
              </InfoWrapper>
            </DriverInfoContainer>
          </DriverInfoWrapper>
          <DriverInfoWrapper>
            <Heading>Bank Details </Heading>
            <DriverInfoContainer>
              <InfoWrapper>
                <InfoTitle>Account Holder Name</InfoTitle>
                <InfoDetails>{agentDetails?.bankDetails?.accountHolderName}</InfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>Account Number</InfoTitle>
                <InfoDetails>{agentDetails?.bankDetails?.accountNumber}</InfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>Bank Name</InfoTitle>
                <InfoDetails>{agentDetails?.bankDetails?.bankName}</InfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>Branch Name</InfoTitle>
                <InfoDetails>{agentDetails?.bankDetails?.branchName}</InfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>IFSC Code</InfoTitle>
                <InfoDetails>{agentDetails?.bankDetails?.IFSCcode}</InfoDetails>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>Cancelled Cheque Document</InfoTitle>
                <InfoDetailsLink onClick={() => handlePreviewClick(agentDetails?.bankDetails?.cancelledCheque)}>
                  Download
                </InfoDetailsLink>
              </InfoWrapper>
            </DriverInfoContainer>
          </DriverInfoWrapper>
          <ButtonWrapper>
            <Button label="Update Driver" variant="contained" type="submit" onClick={updateDriverDetail} />
          </ButtonWrapper>
          <Modal isOpen={updateDriver}>
            <AddDriverModal
              showModal={(value: boolean) => setUpdateDriver(value)}
              singleDriverDetail={singleDriverDetail}
              getDriverDetails={() => {
                getDriverDetails()
              }}
            />
          </Modal>
        </DriverProfileContainer>
      )}
    </>
  )
}

export default DriverProfileDetails
