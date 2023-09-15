import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { InviteAdminRoute, InviteAgentRoute } from 'constants/routes'
import { AppContext } from 'context/payloadContext'
import AdminIcon from 'assets/svg/AdminIcon'
import AgentIcon from 'assets/svg/AgentIcon'
import {
  InviteWrapper,
  InviteContainer,
  HeadingWrapper,
  MainHeading,
  SubHeading,
  SelectionWrapper,
  AdminWrapper,
  AdminImageBackground,
  TitleSection,
} from 'styles/views/inviteScreen'

const InviteSection = () => {
  const { setPayloadData, userInfo } = useContext(AppContext)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const router = useHistory()

  const handleClick = (index: number) => {
    if (index === 0) {
      router.push(`${InviteAdminRoute.path}`)
      setActiveIndex(index)
    } else {
      router.push(`${InviteAgentRoute.path}`)
      setActiveIndex(index)
      setPayloadData({})
    }
  }

  return (
    <InviteWrapper>
      <InviteContainer>
        <HeadingWrapper>
          <MainHeading>Invite Admin & Driver</MainHeading>
          <SubHeading>
            Welcome {userInfo?.name}! We&apos;re delighted to have you join us. Get ready to expand the team with
            talented Drivers and Admins. Please invite them.
          </SubHeading>
        </HeadingWrapper>
        <SelectionWrapper>
          <AdminWrapper active={activeIndex === 0} onClick={() => handleClick(0)}>
            <AdminImageBackground>
              <AdminIcon />
            </AdminImageBackground>
            <TitleSection active={activeIndex === 0}>Invite Admin</TitleSection>
          </AdminWrapper>
          <AdminWrapper active={activeIndex === 1} onClick={() => handleClick(1)}>
            <AdminImageBackground>
              <AgentIcon />
            </AdminImageBackground>
            <TitleSection active={activeIndex === 1}>Invite Driver</TitleSection>
          </AdminWrapper>
        </SelectionWrapper>
      </InviteContainer>
    </InviteWrapper>
  )
}

export default InviteSection
