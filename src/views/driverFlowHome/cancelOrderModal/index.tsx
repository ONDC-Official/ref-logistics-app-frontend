import { useForm } from 'react-hook-form'
import APIS from 'constants/api'
import usePost from 'hooks/usePost'
import SelectField from 'components/SelectField'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from 'components/Button'
import { CANCEL_ACTION_SCHEMA } from 'validations/agentDetailsValidation'

import { ICancelModalProps } from 'interfaces/views'
import { filterOptions } from 'views/driverFlowHome/cancelOrderModal/data'
import CloseIcon from 'assets/svg/CloseIcon'
import { InputWrapper } from 'styles/views/inviteAgentScreen/agentDetailSection'
import { TextWrapper } from 'styles/views/signin'
import { ErrorMessage } from 'styles/views/signin'

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

const CancelOrderModal = ({ showModal, task, getTask }: ICancelModalProps) => {
  const { mutateAsync } = usePost()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(CANCEL_ACTION_SCHEMA),
    defaultValues: {
      description: '',
    },
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
              <Label> Reason for Cancellation* </Label>
              <TextWrapper>
                <SelectField
                  options={filterOptions}
                  control={control}
                  name="description"
                  placeholder="Please Select Reason for Cancellation"
                />
                <ErrorMessage>{errors?.description?.message}</ErrorMessage>
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
