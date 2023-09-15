import { useForm } from 'react-hook-form'
import APIS from 'constants/api'
import usePost from 'hooks/usePost'
import SelectField from 'components/SelectField'
import Button from 'components/Button'
import CloseIcon from 'assets/svg/CloseIcon'
import { InputWrapper } from 'styles/views/inviteAgentScreen/agentDetailSection'
import { TextWrapper } from 'styles/views/signin'
import {
  Label,
  ModalContainer,
  AddContentContainer,
  HeadingContainer,
  HeadingWrapper,
  CancelFormContainer,
  FormWrapper,
  ButtonWrapper,
} from 'styles/views/successfulModal'

export interface IModalProps {
  showModal(value: boolean): void
  task: any
  getTask: () => void
}

const CancelOrderModal = ({ showModal, task, getTask }: IModalProps) => {
  const { mutateAsync } = usePost()
  const { handleSubmit, control } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  })

  const submitData = async (data: any) => {
    await mutateAsync({
      url: `${APIS.CREATE_TASK_STATUS}`,
      payload: {
        taskId: task?._id,
        status: 'Customer-not-found',
        description: data?.description,
      },
    })
    showModal(false)
    getTask()
  }

  const filterOptions = [
    {
      value: 'Buyer not found or cannot be contacted',
      label: 'Buyer not found or cannot be contacted',
    },
    {
      value: 'Buyer does not want product any more',
      label: 'Buyer does not want product any more',
    },
    {
      value: 'Buyer refused to accept delivery',
      label: 'Buyer refused to accept delivery',
    },
    {
      value: 'Address not found',
      label: 'Address not found',
    },
    {
      value: 'Buyer not available at location',
      label: 'Buyer not available at location',
    },
    {
      value: 'Accident / rain / strike / vehicle issues',
      label: 'Accident / rain / strike / vehicle issues',
    },
    {
      value: 'Order delivery delayed or not possible',
      label: 'Order delivery delayed or not possible',
    },
  ]

  return (
    <ModalContainer>
      <AddContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Cancel Order</HeadingWrapper>
          <CloseIcon onClick={() => showModal(false)} />
        </HeadingContainer>
        <FormWrapper onSubmit={handleSubmit(submitData)}>
          <CancelFormContainer>
            <InputWrapper error={false}>
              <Label> Select reason for cancellation </Label>

              <TextWrapper>
                <SelectField options={filterOptions} control={control} name="description" placeholder="Select" />
              </TextWrapper>
            </InputWrapper>
          </CancelFormContainer>
          <ButtonWrapper>
            <Button label="Cancel" variant="contained" className="cancel" onClick={() => showModal(false)} />
            <Button label="Submit" variant="contained" type="submit" className="cancel-now" />
          </ButtonWrapper>
        </FormWrapper>
      </AddContentContainer>
    </ModalContainer>
  )
}

export default CancelOrderModal
