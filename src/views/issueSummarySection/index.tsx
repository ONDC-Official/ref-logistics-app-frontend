import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { GPSIssueTrack } from 'constants/routes'
import APIS from 'constants/api'
import { ISSUE_TYPES } from 'constants/fulfillmentCodes'
import useGet from 'hooks/useGet'
import Modal from 'components/Modal'
import Button from 'components/Button'
import ActionModal from 'views/issuesActionModal'
import ActionStepper from 'views/issueSummarySection/actionStepper'
import { IParamId } from 'interfaces/pages'
import BadFeedbackIcon from 'assets/svg/BadFeedbackIcon'
import GoodFeedbackIcon from 'assets/svg/GoodFeedbackIcon'

import {
  IssueSummaryContainer,
  IssueDetailsWrapper,
  IssueDetails,
  IssueHeading,
  IssueNumber,
  ButtonWrapper,
  FeedBackWrapper,
  GoodFeedBackWrapper,
  CustomerDetailsWrapper,
  CustomerDetailsContainer,
  CustomerHeading,
  CustomerInfoContainer,
  CustomerInfo,
  CustomerInfoHeading,
  CustomerInfoDetails,
  StatusButton,
  OrderDetails,
  OrderInfoDetails,
  OrderDescription,
  DescriptionHeading,
  Description,
  ActionTakenDetails,
} from 'styles/views/issueSummarySection'

const IssueSummarySection = () => {
  const [actionModal, setActionModal] = useState(false)

  const setAction = () => {
    setActionModal(true)
  }
  const router = useHistory()

  const { id }: IParamId = useParams()
  const { refetch: getSingleIssues, data: singleIssueDetail } = useGet('get-issues', `${APIS.GET_ISSUE}/${id}`)
  useEffect(() => {
    getSingleIssues()
  }, [])

  const data = singleIssueDetail?.data?.issue?.sub_category
  const subCategoryCode = data ? ISSUE_TYPES[data as keyof typeof ISSUE_TYPES] : ''

  return (
    <>
      <IssueSummaryContainer>
        <IssueDetailsWrapper>
          <IssueDetails>
            <IssueHeading>Issue ID</IssueHeading>
            <IssueNumber>{singleIssueDetail?.data?.issue?.id}</IssueNumber>
          </IssueDetails>
          <ButtonWrapper>
            {singleIssueDetail?.data?.issue?.status === 'CLOSED' && (
              <>
                {' '}
                {singleIssueDetail?.data?.issue?.rating === 'THUMBS-DOWN' ? (
                  <FeedBackWrapper>
                    <BadFeedbackIcon />
                    <OrderInfoDetails>Bad Feedback</OrderInfoDetails>
                  </FeedBackWrapper>
                ) : (
                  <GoodFeedBackWrapper>
                    <GoodFeedbackIcon />
                    <OrderInfoDetails>Good Feedback</OrderInfoDetails>
                  </GoodFeedBackWrapper>
                )}
              </>
            )}
            {singleIssueDetail?.data?.issue?.issueState === 'Processing' &&
              singleIssueDetail?.data?.issue?.status === 'OPEN' && (
                <Button label="Action" variant="contained" className="cancel" onClick={setAction} />
              )}
            <Button
              label="Order Detail"
              variant="contained"
              type="submit"
              onClick={() => {
                router.push(`${GPSIssueTrack.path.replace(':id', singleIssueDetail?.data?.issue?.transaction_id)}`)
              }}
            />
          </ButtonWrapper>
        </IssueDetailsWrapper>
        <CustomerDetailsWrapper>
          <CustomerDetailsContainer>
            <CustomerHeading>Customer Detail</CustomerHeading>
            <CustomerInfoContainer>
              <CustomerInfo>
                <CustomerInfoHeading>Name</CustomerInfoHeading>
                <CustomerInfoDetails>
                  {singleIssueDetail?.data?.issue?.complainant_info?.person?.name}
                </CustomerInfoDetails>
              </CustomerInfo>
              <CustomerInfo>
                <CustomerInfoHeading>Email</CustomerInfoHeading>
                <CustomerInfoDetails>
                  {singleIssueDetail?.data?.issue?.complainant_info?.contact?.email}
                </CustomerInfoDetails>
              </CustomerInfo>
              <CustomerInfo>
                <CustomerInfoHeading>Mobile Number</CustomerInfoHeading>
                <CustomerInfoDetails>
                  {singleIssueDetail?.data?.issue?.complainant_info?.contact?.phone}
                </CustomerInfoDetails>
              </CustomerInfo>
              <CustomerInfo>
                <CustomerInfoHeading>Status</CustomerInfoHeading>
                <StatusButton status={singleIssueDetail?.data?.issue?.status}>
                  {singleIssueDetail?.data?.issue?.status}
                </StatusButton>
              </CustomerInfo>
            </CustomerInfoContainer>
          </CustomerDetailsContainer>
        </CustomerDetailsWrapper>
        <OrderDetails>
          <CustomerHeading>Issue Details</CustomerHeading>
          <CustomerInfoContainer>
            <CustomerInfo>
              <CustomerInfoHeading>Issue ID</CustomerInfoHeading>
              <OrderInfoDetails>{singleIssueDetail?.data?.issue?.id}</OrderInfoDetails>
            </CustomerInfo>
            <CustomerInfo>
              <CustomerInfoHeading>Issue Type</CustomerInfoHeading>
              <OrderInfoDetails>{singleIssueDetail?.data?.issue?.issue_type}</OrderInfoDetails>
            </CustomerInfo>
            <CustomerInfo>
              <CustomerInfoHeading>Category</CustomerInfoHeading>
              <OrderInfoDetails>{singleIssueDetail?.data?.issue?.category}</OrderInfoDetails>
            </CustomerInfo>
            <CustomerInfo>
              <CustomerInfoHeading>Issue Subcategory</CustomerInfoHeading>
              <OrderInfoDetails>{subCategoryCode}</OrderInfoDetails>
            </CustomerInfo>
          </CustomerInfoContainer>
          <OrderDescription>
            <DescriptionHeading>Short Description</DescriptionHeading>
            <Description>{singleIssueDetail?.data?.issue?.description?.short_desc}</Description>
          </OrderDescription>
          <OrderDescription>
            <DescriptionHeading>Long Description</DescriptionHeading>
            <Description>{singleIssueDetail?.data?.issue?.description?.long_desc}</Description>
          </OrderDescription>
        </OrderDetails>
        <ActionTakenDetails>
          <CustomerHeading>Action Taken</CustomerHeading>
          <ActionStepper singleIssueDetail={singleIssueDetail} />
        </ActionTakenDetails>
      </IssueSummaryContainer>

      <Modal isOpen={actionModal}>
        <ActionModal
          showModal={(value: boolean) => setActionModal(value)}
          id={id}
          getIssues={() => {
            getSingleIssues()
          }}
        />
      </Modal>
    </>
  )
}

export default IssueSummarySection
