import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Checkbox, DatePicker } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import dayjs from 'dayjs'
import { ADD_TASK_VALIDATION } from 'validations/addTaskValidation'
import Button from 'components/Button'
import AvailableTime from 'components/TimePicker'
import TextInput from 'components/TextInput'
import SelectField from 'components/SelectField'
import { IDriverData } from 'interfaces'
import { ITaskDetailsData } from 'interfaces/views'
import { driverData } from 'views/taskDetails/data'
import { InputWrapper } from 'styles/views/inviteAgentScreen/agentDetailSection'
import { ErrorMessage, TextWrapper } from 'styles/views/signin'
import { Label, ButtonContainer, ButtonWrap, InputContainer } from 'styles/views/successfulModal'
import {
  TaskDetailContainer,
  DetailsContainer,
  DetailsWrapper,
  TaskHeading,
  TaskDetailsWrapper,
  SelectDriversContainer,
  DriverHeadingWrapper,
  DriverSubheading,
  DriverCardWrapper,
  DriverCardContainer,
  DriverInfo,
  DriverInfoWrapper,
  ImageWrap,
  DriverName,
  TaskInfoWrapper,
  TaskInfo,
  TaskLabel,
  TaskNumber,
} from 'styles/views/taskDetails'

const TaskDetails = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(ADD_TASK_VALIDATION),
    defaultValues: {
      orderNumber: '',
      pickLocation: '',
      dropLocation: '',
      allocation: '',
      pickDate: '',
      dropDate: '',
    },
  })
  const submitData = async (data: ITaskDetailsData) => {
    data
  }
  const filterOptions = [
    { value: 'Name', label: 'Name' },
    { value: 'Date', label: 'Date' },
    { value: 'City', label: 'City' },
  ]
  const onChange = (e: CheckboxChangeEvent) => {
    e
  }
  const router = useHistory()
  const handleBack = () => {
    router.goBack()
  }

  return (
    <TaskDetailContainer onSubmit={handleSubmit(submitData)}>
      <DetailsContainer>
        <DetailsWrapper>
          <TaskHeading>Task Details</TaskHeading>
          <TaskDetailsWrapper>
            <InputWrapper error={false}>
              <Label>Order Number</Label>
              <TextWrapper>
                <TextInput
                  placeholder="#466577"
                  control={control}
                  name="orderNumber"
                  error={errors.orderNumber}
                  disabled
                />
              </TextWrapper>
            </InputWrapper>
            <InputWrapper error={errors.pickLocation}>
              <Label>Pick Location</Label>
              <TextWrapper>
                <SelectField
                  options={filterOptions}
                  control={control}
                  name="pickLocation"
                  placeholder="Select PickUp Location"
                />
                <ErrorMessage>{errors?.pickLocation?.message}</ErrorMessage>
              </TextWrapper>
            </InputWrapper>
            <InputWrapper error={errors.dropLocation}>
              <Label>Drop Location</Label>
              <TextWrapper>
                <SelectField
                  options={filterOptions}
                  control={control}
                  name="dropLocation"
                  placeholder="Select Drop Location"
                />
                <ErrorMessage>{errors?.dropLocation?.message}</ErrorMessage>
              </TextWrapper>
            </InputWrapper>
            <InputContainer>
              <InputWrapper error={errors.pickDate}>
                <Label>Pick Date</Label>
                <TextWrapper>
                  <Controller
                    control={control}
                    name="pickDate"
                    render={({ field: { onChange } }) => {
                      return (
                        <DatePicker defaultValue={dayjs('01/01/2015')} format={'DD MMM YYYY'} onChange={onChange} />
                      )
                    }}
                  />
                  <ErrorMessage>{errors?.pickDate?.message}</ErrorMessage>
                </TextWrapper>
              </InputWrapper>
              <InputWrapper error={false}>
                <Label>Pick Time</Label>
                <TextWrapper>
                  <AvailableTime />
                </TextWrapper>
              </InputWrapper>
            </InputContainer>
            <InputContainer>
              <InputWrapper error={errors.dropDate}>
                <Label>Drop Date</Label>
                <TextWrapper>
                  <Controller
                    control={control}
                    name="dropDate"
                    render={({ field: { onChange } }) => {
                      return (
                        <DatePicker defaultValue={dayjs('01/01/2015')} format={'DD MMM YYYY'} onChange={onChange} />
                      )
                    }}
                  />
                  <ErrorMessage>{errors?.dropDate?.message}</ErrorMessage>
                </TextWrapper>
              </InputWrapper>
              <InputWrapper error={false}>
                <Label>Drop Time</Label>
                <TextWrapper>
                  <AvailableTime />
                </TextWrapper>
              </InputWrapper>
            </InputContainer>
            <InputWrapper error={errors.allocation}>
              <Label>Driver Allocation</Label>
              <TextWrapper>
                <SelectField options={filterOptions} control={control} name="allocation" placeholder="Select Driver" />
                <ErrorMessage>{errors?.allocation?.message}</ErrorMessage>
              </TextWrapper>
            </InputWrapper>
          </TaskDetailsWrapper>
        </DetailsWrapper>
        <SelectDriversContainer>
          <DriverHeadingWrapper>
            <TaskHeading>Select Drivers</TaskHeading>
            <DriverSubheading>Lorem ipsum dolor sit amet</DriverSubheading>
          </DriverHeadingWrapper>
          <DriverCardWrapper>
            {driverData.map((data: IDriverData) => {
              return (
                <DriverCardContainer key={data.id}>
                  <DriverInfo>
                    <DriverInfoWrapper>
                      <ImageWrap>
                        <img src={data.driverImage} alt="LoginImage" />
                      </ImageWrap>
                      <DriverName>{data.drivername}</DriverName>
                    </DriverInfoWrapper>
                    <Checkbox onChange={onChange} />
                  </DriverInfo>
                  <TaskInfoWrapper>
                    <TaskInfo>
                      <TaskLabel>In Progress</TaskLabel>
                      <TaskNumber>{data.inProgress}</TaskNumber>
                    </TaskInfo>
                    <TaskInfo>
                      <TaskLabel>Currrent Orders</TaskLabel>
                      <TaskNumber>{data.currentTask}</TaskNumber>
                    </TaskInfo>
                    <TaskInfo>
                      <TaskLabel>Completed Orders</TaskLabel>
                      <TaskNumber>{data.completedTask}</TaskNumber>
                    </TaskInfo>
                  </TaskInfoWrapper>
                </DriverCardContainer>
              )
            })}
          </DriverCardWrapper>
        </SelectDriversContainer>
      </DetailsContainer>

      <ButtonContainer>
        <Button label="Cancel" variant="contained" className="cancel" type="button" onClick={handleBack} />
        <ButtonWrap>
          <Button label="Save as draft" variant="contained" className="cancel" type="button" />
          <Button label="Create Task" variant="contained" type="submit" />
        </ButtonWrap>
      </ButtonContainer>
    </TaskDetailContainer>
  )
}

export default TaskDetails
