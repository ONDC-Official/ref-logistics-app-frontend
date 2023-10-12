import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Radio } from 'antd'
import APIS from 'constants/api'
import useGet from 'hooks/useGet'
import usePost from 'hooks/usePost'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import MapComponent from 'components/MapComponent/index'
import { IDriversInfo, IAssignModalProps } from 'interfaces/views'
import AvatarImage from 'assets/images/avatar_image.png'
import CloseIcon from 'assets/svg/CloseIcon'
import { InputWrapper } from 'styles/views/inviteAgentScreen/agentDetailSection'
import { TextWrapper } from 'styles/views/signin'
import {
  DriverInfoCardWrapper,
  DriverInfoCardContainer,
  DriverInfo,
  DriverInfoWrapper,
  ImageWrap,
  DriverName,
  NameWrap,
} from 'styles/views/taskDetails'
import { LocationWrapper, LocationImage } from 'styles/views/inviteAgentScreen/driverDetailsSection'
import {
  Label,
  ModalContainer,
  HeadingContainer,
  HeadingWrapper,
  ButtonWrapper,
  AssignFormContainer,
  AssignedFormWrapper,
} from 'styles/views/successfulModal'

const AssignTasksModal = ({ showModal, activeTask, refetchTask }: IAssignModalProps) => {
  const [checkedDriver, setIsCheckedDriver] = useState<string | null>(null)
  const { mutateAsync } = usePost()
  const [driversData, setdriversData] = useState([])
  const { refetch: getTask, data } = useGet('get-task', `${APIS.ALL_TASK}/${activeTask}`)

  useEffect(() => {
    getTask()
  }, [])

  const { control, handleSubmit } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  })

  useEffect(() => {
    const fetchData = async () => {
      if (data?.data?.task?.fulfillments[0]?.start?.location?.gps) {
        const res = await mutateAsync({
          url: `${APIS.AGENT_SEARCH}`,
          payload: {
            startLocation: `${data?.data?.task?.fulfillments[0]?.start?.location?.gps}`,
            endLocation: `${data?.data?.task?.fulfillments[0]?.end?.location?.gps}`,
          },
        })

        if (res?.data?.agents.length !== 0) {
          toast.dismiss()
          toast.success(`${res?.data?.agents.length} driver found`)
        } else {
          toast.dismiss()
          toast.error(`No Driver Found`)
        }

        setdriversData(res?.data?.agents || [])
      }
    }

    fetchData()
  }, [data])

  const onHandleChange = (e: any) => {
    if (e.target.checked) {
      setIsCheckedDriver(e.target.value)
    }
  }

  const submitData = async () => {
    if (driversData.length !== 0) {
      if (checkedDriver != null) {
        await mutateAsync({
          url: `${APIS.ASSIGNE_AGENT}`,
          payload: {
            taskId: activeTask,
            agentId: checkedDriver,
          },
        })
      } else {
        toast.dismiss()
        toast.error('Please Select Driver')
      }

      refetchTask()
    }
  }

  return (
    <ModalContainer>
      <HeadingContainer>
        <HeadingWrapper>Assign Driver</HeadingWrapper>
        <CloseIcon onClick={() => showModal(false)} />
      </HeadingContainer>
      <AssignFormContainer onSubmit={handleSubmit(submitData)}>
        <AssignedFormWrapper>
          <InputWrapper error={false}>
            <Label>Pick up Location</Label>
            <TextWrapper>
              <TextInput
                placeholder={`${data?.data?.task?.fulfillments[0]?.start?.location?.address?.name}, ${data?.data?.task?.fulfillments[0]?.start?.location?.address?.city}, ${data?.data?.task?.fulfillments[0]?.start?.location?.address?.state}, ${data?.data?.task?.fulfillments[0]?.start?.location?.address?.area_code}`}
                control={control}
                name="pickUpLocation"
                disabled
              />
            </TextWrapper>
          </InputWrapper>
          <InputWrapper error={false}>
            <Label>Delivery Location</Label>
            <TextWrapper>
              <TextInput
                placeholder={`${data?.data?.task?.fulfillments[0]?.end?.location?.address?.name}, ${data?.data?.task?.fulfillments[0]?.end?.location?.address?.city}, ${data?.data?.task?.fulfillments[0]?.end?.location?.address?.state}, ${data?.data?.task?.fulfillments[0]?.end?.location?.address?.area_code}`}
                control={control}
                name="deliveryLocation"
                disabled
              />
            </TextWrapper>
          </InputWrapper>
          <LocationWrapper>
            <Label>Searching Drivers with in 5 KM Radius </Label>
            <LocationImage>
              <MapComponent />
            </LocationImage>
          </LocationWrapper>
          <DriverInfoCardWrapper>
            <Radio.Group onChange={(e) => onHandleChange(e)} name={'selectedDriver'}>
              {driversData?.map((data: IDriversInfo) => {
                return (
                  <DriverInfoCardContainer key={data?._id}>
                    <DriverInfo>
                      <DriverInfoWrapper>
                        <ImageWrap>
                          <img src={AvatarImage} alt="avatar" />
                        </ImageWrap>
                        <NameWrap>
                          <DriverName>{data?.userId?.name}</DriverName>
                          <DriverName className="mobile">{data?.userId?.mobile}</DriverName>
                        </NameWrap>
                      </DriverInfoWrapper>
                      <Radio value={data?._id} />
                    </DriverInfo>
                  </DriverInfoCardContainer>
                )
              })}
            </Radio.Group>
          </DriverInfoCardWrapper>
        </AssignedFormWrapper>
        <ButtonWrapper>
          <Button label="Cancel" variant="contained" onClick={() => showModal(false)} className="cancel" />
          {/* <Button label="Assign" variant={'contained'} type="submit" /> */}
          <Button label="Assign" variant={driversData.length === 0 ? 'disabled' : 'contained'} type="submit" />
        </ButtonWrapper>
      </AssignFormContainer>
    </ModalContainer>
  )
}

export default AssignTasksModal
