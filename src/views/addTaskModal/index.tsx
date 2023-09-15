import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { AGENT_KYC_SCHEMA_STEP1 } from 'validations/agentDetailsValidation'
import AvailableTime from 'components/TimePicker'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import SelectField from 'components/SelectField'
import CloseIcon from 'assets/svg/CloseIcon'
import { InputWrapper } from 'styles/views/inviteAgentScreen/agentDetailSection'
import { ErrorMessage, TextWrapper } from 'styles/views/signin'

import {
  Label,
  ModalContainer,
  AddContentContainer,
  HeadingContainer,
  HeadingWrapper,
  ButtonWrapper,
  InputContainer,
  OrderFormContainer,
} from 'styles/views/successfulModal'

export interface IModalProps {
  showModal(value: boolean): void
}

const AddTaskModal = ({ showModal }: IModalProps) => {
  const {
    handleSubmit,
    control,
    // reset,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(AGENT_KYC_SCHEMA_STEP1),
    defaultValues: {
      orderNumber: '',
      pickLocation: '',
      dropLocation: '',
      allocation: '',
    },
  })
  const submitData = async (data: any) => {
    data
  }
  const filterOptions = [
    { value: 'Name', label: 'Name' },
    { value: 'Date', label: 'Date' },
    { value: 'City', label: 'City' },
  ]

  return (
    <ModalContainer>
      <AddContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Add Task</HeadingWrapper>
          <CloseIcon onClick={() => showModal(false)} />
        </HeadingContainer>
        <OrderFormContainer onSubmit={handleSubmit(submitData)}>
          <InputWrapper error={errors.orderNumber}>
            <Label>Order Number</Label>
            <TextWrapper>
              <TextInput placeholder="#466577" control={control} name="orderNumber" error={errors.orderNumber} />
              <ErrorMessage>{errors?.orderNumber?.message}</ErrorMessage>
            </TextWrapper>
          </InputWrapper>
          <InputWrapper error={errors.pickLocation}>
            <Label>Pick Location</Label>
            <TextWrapper>
              <SelectField
                options={filterOptions}
                control={control}
                name="pickLocation"
                placeholder=" Select Pick Location"
              />
              <ErrorMessage>{errors?.pickLocation?.message}</ErrorMessage>
            </TextWrapper>
          </InputWrapper>
          <InputWrapper error={errors.dropLocation}>
            <Label>Drop Location</Label>
            <TextWrapper>
              <SelectField options={filterOptions} control={control} name="dropLocation" placeholder="Sort By" />
              <ErrorMessage>{errors?.dropLocation?.message}</ErrorMessage>
            </TextWrapper>
          </InputWrapper>
          <InputContainer>
            <InputWrapper error={errors.pickLocation}>
              <Label>Pick Date</Label>
              <TextWrapper>
                <DatePicker defaultValue={dayjs('01/01/2015')} format={'DD/MM/YYYY'} />
                <ErrorMessage>{errors?.pickLocation?.message}</ErrorMessage>
              </TextWrapper>
            </InputWrapper>
            <InputWrapper error={errors.dropLocation}>
              <Label>Pick Time</Label>
              <TextWrapper>
                <AvailableTime />
              </TextWrapper>
            </InputWrapper>
          </InputContainer>
          <InputContainer>
            <InputWrapper error={errors.pickLocation}>
              <Label>Drop Date</Label>
              <TextWrapper>
                <DatePicker defaultValue={dayjs('01/01/2015')} format={'DD/MM/YYYY'} />
                <ErrorMessage>{errors?.pickLocation?.message}</ErrorMessage>
              </TextWrapper>
            </InputWrapper>
            <InputWrapper error={errors.dropLocation}>
              <Label>Drop Time</Label>
              <TextWrapper>
                <AvailableTime />
              </TextWrapper>
            </InputWrapper>
          </InputContainer>
          <InputWrapper error={errors.allocation}>
            <Label>Driver Allocation</Label>
            <TextWrapper>
              <SelectField options={filterOptions} control={control} name="allocation" placeholder="Sort By" />
              <ErrorMessage>{errors?.allocation?.message}</ErrorMessage>
            </TextWrapper>
          </InputWrapper>

          <ButtonWrapper>
            <Button label="Cancel" variant="contained" onClick={() => showModal(false)} className="cancel" />
            <Button label="Submit" variant="contained" />
          </ButtonWrapper>
        </OrderFormContainer>
      </AddContentContainer>
    </ModalContainer>
  )
}

export default AddTaskModal
