import usePost from 'hooks/usePost'
import Button from 'components/Button'
import APIS from 'constants/api'
import { IHubModalProps } from 'interfaces/views'
import CloseIcon from 'assets/svg/CloseIcon'
import {
  DeleteModalContainer,
  CloseBtn,
  ContentContainer,
  ContentWrapper,
  HeadingWrapper,
  Description,
  ButtonWrap,
} from 'styles/views/successfulModal'

const HubStatusModal = ({ showModal, singleHubDetail, value, id, title, subTitle }: IHubModalProps) => {
  const { mutateAsync } = usePost()

  const hubStatusModal = async (id: string) => {
    await mutateAsync({
      url: `${APIS.UPDATE_HUB}/${id}`,
      payload: {
        status: value,
      },
    })

    singleHubDetail()
    showModal(false)
  }

  return (
    <DeleteModalContainer>
      <CloseBtn onClick={() => showModal(false)}>
        <CloseIcon />
      </CloseBtn>
      <ContentContainer>
        <ContentWrapper>
          <HeadingWrapper>{title} Hub</HeadingWrapper>
          <Description>Are you sure you want to {subTitle?.toLocaleLowerCase()} hub?</Description>
        </ContentWrapper>
        <ButtonWrap>
          <Button label="No" variant="contained" onClick={() => showModal(false)} className="cancel" />
          <Button label="Yes" variant="contained" onClick={() => hubStatusModal(id)} type="submit" />
        </ButtonWrap>
      </ContentContainer>
    </DeleteModalContainer>
  )
}

export default HubStatusModal
