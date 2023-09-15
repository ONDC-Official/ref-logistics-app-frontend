import Button from 'components/Button'
import CloseIcon from 'assets/svg/CloseIcon'
import TickIcon from 'assets/svg/TickIcon'
import { ISuccessModalProps } from 'interfaces/views'
import {
  SuccessfulModalContainer,
  CloseButtonWrapper,
  ContentContainer,
  ContentWrapper,
  HeadingWrapper,
  Description,
} from 'styles/views/successfulModal'

const SuccessfulModal = ({ showModal, modalData, action = true }: ISuccessModalProps) => {
  return (
    <SuccessfulModalContainer>
      <CloseButtonWrapper onClick={() => showModal(false)}>
        <CloseIcon />
      </CloseButtonWrapper>
      <ContentContainer>
        <ContentWrapper>
          <TickIcon />
          <HeadingWrapper>{modalData.heading}</HeadingWrapper>
          <Description>{modalData.detail}</Description>
        </ContentWrapper>
        <Button
          label="Okay"
          variant="contained"
          onClick={() => {
            if (action) {
              showModal(false)
              window.localStorage.clear()
              window.location.href = '/'
            } else {
              showModal(false)
            }
          }}
        />
      </ContentContainer>
    </SuccessfulModalContainer>
  )
}

export default SuccessfulModal
