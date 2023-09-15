import usePost from 'hooks/usePost'
import Button from 'components/Button'
import APIS from 'constants/api'
import CloseIcon from 'assets/svg/CloseIcon'
import DeleteBinIcon from 'assets/svg/DeleteBinIcon'
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

const DeleteTaskModal = ({ showModal, id, fetchDrivers }: IDeleteModalProps) => {
  const { mutateAsync } = usePost()

  const deleteDriver = async (id: string) => {
    try {
      await mutateAsync({
        url: `${APIS.DELETE_DRIVER}/${id}`,
      })
      fetchDrivers()
      showModal(false)
    } catch (error) {
      error
    }
  }

  return (
    <DeleteModalContainer>
      <CloseBtn onClick={() => showModal(false)}>
        <CloseIcon />
      </CloseBtn>
      <ContentContainer>
        <DeleteBinIcon />

        <ContentWrapper>
          <HeadingWrapper>Delete Driver</HeadingWrapper>
          <Description>Are you sure, you want to delete this Driver.</Description>
        </ContentWrapper>
        <ButtonWrap>
          <Button label="Cancel" variant="contained" onClick={() => showModal(false)} className="cancel" />
          <Button label="Delete" variant="contained" onClick={() => deleteDriver(id)} type="submit" />
        </ButtonWrap>
      </ContentContainer>
    </DeleteModalContainer>
  )
}

export default DeleteTaskModal
