import usePost from 'hooks/usePost'
import Button from 'components/Button'
import APIS from 'constants/api'
import CloseIcon from 'assets/svg/CloseIcon'
import { IDeleteModalProps } from 'interfaces/views'
import {
  DeleteModalContainer,
  CloseBtn,
  ContentContainer,
  ContentWrapper,
  HeadingWrapper,
  Description,
  ButtonWrap,
} from 'styles/views/successfulModal'

const DeactivateDriver = ({ showModal, id, title, value, fetchDrivers }: IDeleteModalProps) => {
  const { mutateAsync } = usePost()

  const deactivateDriver = async (id: string) => {
    await mutateAsync({
      url: `${APIS.DEACTIVATE_DRIVER}`,
      payload: {
        enabled: value,
        agentId: id,
      },
    })
    fetchDrivers()
    showModal(false)
  }

  return (
    <DeleteModalContainer>
      <CloseBtn onClick={() => showModal(false)}>
        <CloseIcon />
      </CloseBtn>
      <ContentContainer>
        <ContentWrapper>
          <HeadingWrapper>{title}</HeadingWrapper>
          <Description>Are you sure, you want to {title?.toLocaleLowerCase()}</Description>
        </ContentWrapper>
        <ButtonWrap>
          <Button label="No" variant="contained" onClick={() => showModal(false)} className="cancel" />
          <Button label="Yes" variant="contained" onClick={() => deactivateDriver(id)} type="submit" />
        </ButtonWrap>
      </ContentContainer>
    </DeleteModalContainer>
  )
}

export default DeactivateDriver
