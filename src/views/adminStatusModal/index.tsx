import usePost from 'hooks/usePost'
import Button from 'components/Button'
import APIS from 'constants/api'
import { IDeactiveModalProps } from 'interfaces/views'
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

const AdminStatusModal = ({ showModal, id, title, subTitle, value, fetchAdmin }: IDeactiveModalProps) => {
  const { mutateAsync } = usePost()

  const adminStatusModal = async (id: string) => {
    await mutateAsync({
      url: `${APIS.ADMIN_STATUS}`,
      payload: {
        enabled: value,
        adminId: id,
      },
    })
    fetchAdmin()
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
          <Description>Are you sure you want to {subTitle?.toLocaleLowerCase()}?</Description>
        </ContentWrapper>
        <ButtonWrap>
          <Button label="No" variant="contained" onClick={() => showModal(false)} className="cancel" />
          <Button label="Yes" variant="contained" onClick={() => adminStatusModal(id)} type="submit" />
        </ButtonWrap>
      </ContentContainer>
    </DeleteModalContainer>
  )
}

export default AdminStatusModal
