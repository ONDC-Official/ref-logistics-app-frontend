import React from 'react'
import CountUp from 'react-countup'
import { RecordSectionProps } from 'interfaces/views'
import AgentIcon from 'assets/svg//AgentCountingIcon'
import IssuesIcon from 'assets/svg/IssuesIcon'
import OrderIcon from 'assets/svg/OrderIcon'
import {
  RecordContainer,
  CardContainer,
  DetailContainer,
  IconWrapper,
  CountingSection,
  Description,
  SubDescription,
} from 'styles/views/RecordSection'
import { StatusButton } from 'styles/views/adminDashboard/tableDescription'

const RecordSection: React.FC<RecordSectionProps> = ({
  totalOnlineDriver,
  totalDriverCount,
  totalIssueCount,
  totalTaskCount,
}) => {
  const cardData = [
    {
      id: 1,
      icon: <AgentIcon />,
      number: totalDriverCount,
      description: 'Total Driver Added',
      subDescription: 'Driver Available',
      onlineCount: totalOnlineDriver,
    },
    {
      id: 2,
      icon: <OrderIcon />,
      number: totalTaskCount,
      description: 'Total Tasks Created',
      subDescription: '',
      onlineCount: null,
    },
    {
      id: 3,
      icon: <IssuesIcon />,
      number: totalIssueCount,
      description: 'Total Issues Created',
      subDescription: '',
      onlineCount: null,
    },
  ]

  return (
    <RecordContainer>
      {cardData?.map((items) => {
        return (
          <CardContainer key={items?.id}>
            <DetailContainer>
              <IconWrapper>{items?.icon}</IconWrapper>
              <CountingSection>
                <CountUp start={0} end={items?.number} duration={2} separator="," />
              </CountingSection>
            </DetailContainer>
            <Description>{items?.description}</Description>
            <SubDescription>
              {items?.subDescription}
              <SubDescription className="count">{items?.onlineCount}</SubDescription>
              {items?.onlineCount ? <StatusButton /> : ''}
            </SubDescription>
          </CardContainer>
        )
      })}
    </RecordContainer>
  )
}

export default RecordSection
