import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UPDATE_SCHEMA } from 'validations/driverDetails'
import Button from 'components/Button'
import SelectField from 'components/SelectField'
import { IModalProps, IUpdateStatusData } from 'interfaces/views'
import { filterOptions } from 'views/updateModal/data'
import CloseIcon from 'assets/svg/CloseIcon'
import { InputWrapper } from 'styles/views/inviteAgentScreen/agentDetailSection'
import { TextWrapper } from 'styles/views/signin'
import {
  Label,
  ModalContainer,
  AddContentContainer,
  HeadingContainer,
  HeadingWrapper,
  AddFormContainer,
  FormWrapper,
  ButtonWrapper,
} from 'styles/views/successfulModal'

const UpdateStatus = ({ showModal }: IModalProps) => {
  const { handleSubmit, control } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(UPDATE_SCHEMA),
    defaultValues: {
      status: '',
    },
  })

  const submitData = async (data: IUpdateStatusData) => {
    data
  }

  return (
    <ModalContainer>
      <AddContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Update Status</HeadingWrapper>
          <CloseIcon onClick={() => showModal(false)} />
        </HeadingContainer>
        <FormWrapper onSubmit={handleSubmit(submitData)}>
          <AddFormContainer>
            <InputWrapper error={false}>
              <Label>Update Status </Label>

              <TextWrapper>
                <SelectField
                  options={filterOptions}
                  control={control}
                  name="status"
                  placeholder="Select Update Status"
                />
              </TextWrapper>
            </InputWrapper>
          </AddFormContainer>
          <ButtonWrapper>
            <Button label="Cancel" variant="contained" className="cancel" onClick={() => showModal(false)} />
            <Button label="Update" variant="contained" type="submit" />
          </ButtonWrapper>
        </FormWrapper>
      </AddContentContainer>
    </ModalContainer>
  )
}

export default UpdateStatus
