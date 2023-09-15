import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { message } from 'antd'
import { AppContext } from 'context/payloadContext'
import APIS from 'constants/api'
import usePost from 'hooks/usePost'
import { DRIVER_UPDATE_SCHEMA } from 'validations/driverDetails'
import DragFile from 'components/Drag'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import Modal from 'components/Modal'
import { dragData } from 'components/Drag/data'
import SelectField from 'components/SelectField'
import DocumentViewModal from 'views/documentViewModal'
import EyeIcon from 'assets/svg/EyeIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import CloseIcon from 'assets/svg/CloseIcon'
import { InputWrapper } from 'styles/views/inviteAgentScreen/agentDetailSection'
import { ResendText, ExpiredOtp } from 'styles/views/driverFlowHome'
import { ErrorMessage, TextWrapper, FileName, FileWrapper } from 'styles/views/signin'
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

export interface IModalProps {
  showModal(value: boolean): void
  handleClick: (e: any) => void
  orderDetail: string
  task: any
  getTask: () => void
}

const DriverUpdateStatusModal = ({ showModal, handleClick, orderDetail, task, getTask }: IModalProps) => {
  const [countdown, setCountdown] = useState(59) // Set initial countdown time in seconds
  const [isActive, setIsActive] = useState(true)
  const [viewModal, setViewModal] = useState(false)
  const [filePath, setFilePath] = useState('')
  const [ispreview, setIsPreviewed] = useState<boolean>(false)
  const { payloadData, setPayloadData } = useContext(AppContext)
  const { mutateAsync } = usePost()

  const {
    handleSubmit,
    control,
    setValue,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(DRIVER_UPDATE_SCHEMA),
  })

  const values = getValues()
  const submitData = async (data: any) => {
    const payload = {
      taskId: task._id,
      status: data?.status,
      link: data?.uploadImage,
      description: data?.description || '',
    }

    if (data) {
      setPayloadData(payload)
      await mutateAsync({
        url: `${APIS.CREATE_TASK_STATUS}`,
        payload: payload,
      })
    }

    showModal(false)
    getTask()
  }

  const filterOptions = [
    { value: 'Order-picked-up', label: 'Out for order Pickup', disabled: true },
    { value: 'Out-for-delivery', label: 'Out for delivery' },
    { value: 'Order-delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' },
  ]

  const RTOFilterOption = [{ value: 'RTO-Delivered', label: 'RTO Delivered' }]

  const index = filterOptions.findIndex((element) => {
    if (element.value === task?.status) {
      return true
    }
  })

  useEffect(() => {
    let countdownTimer: string | number | NodeJS.Timeout | undefined

    if (isActive && orderDetail === 'delivered') {
      countdownTimer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 0) {
            return prevCountdown - 1
          } else {
            clearInterval(countdownTimer)
            setIsActive(false)
            return 0
          }
        })
      }, 1000)
    }

    return () => clearInterval(countdownTimer)
  }, [isActive, orderDetail])

  // Function to format the countdown in minutes and seconds
  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60)
    const seconds = countdown % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  // Function to handle the resend click event
  const handleResendClick = () => {
    if (!isActive) {
      setCountdown(59)
      setIsActive(true)
    }
  }
  const Upload = async (name: string, e: any) => {
    const { file, onSuccess } = e
    const formData = new FormData()
    formData.append('image', file)
    name

    const fileSizeInBytes = e?.file?.size
    const fileSizeInMB = fileSizeInBytes / 1048576

    const supportedTypes = ['image/jpeg', 'image/jpg']
    const isFileTypeSupported = supportedTypes.includes(e?.file?.type)

    if (isFileTypeSupported && fileSizeInMB <= 2) {
      try {
        e.onProgress({ percent: 0 })
        const response = await mutateAsync({
          url: APIS.UPLOAD_FILE,
          payload: formData,
        })
        e.onProgress({ percent: 100 })
        onSuccess(response?.message)
        setValue('uploadImage', response?.data?.url)
        setIsPreviewed(true)
        clearErrors('uploadImage')
      } catch (error) {
        message.error(`${e.file.name} file upload failed.`)
      }
    } else {
      message.error('Invalid file format. Please upload a JPEG, JPG')
    }
  }

  const handlePreviewClose = () => {
    setViewModal(false)
    setFilePath('')
  }
  const handleRemove = (name: any) => {
    setValue(name, '')
    setIsPreviewed(false)
  }

  const handlePreviewClick = () => {
    values?.uploadImage
    const file: any = {
      url: values?.uploadImage, // Provide the image URL or preview URL here
    }
    setViewModal(true)
    setFilePath(file.url)
    handlePreview(file)
  }

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      return
    }

    window.open(file?.url, '_blank')
  }
  const fileUrl = getValues('uploadImage')

  return (
    <>
      <ModalContainer>
        <AddContentContainer>
          <HeadingContainer>
            <HeadingWrapper>Update Status</HeadingWrapper>
            <CloseIcon onClick={() => showModal(false)} />
          </HeadingContainer>
          <FormWrapper onSubmit={handleSubmit(submitData)}>
            <AddFormContainer>
              <InputWrapper error={false}>
                <Label>Agent-Assigned Status* </Label>
                <TextWrapper>
                  <SelectField
                    options={
                      task?.status === 'RTO-Initiated'
                        ? RTOFilterOption
                        : filterOptions.map((_e, i) => {
                            return {
                              ..._e,
                              disabled: _e.value !== 'Cancelled' && _e.value !== 'Customer-not-found' && i != index + 1,
                            }
                          })
                    }
                    control={control}
                    name="status"
                    placeholder="Select Agent-Assigned Status"
                    handleValue={(e: any) => handleClick(e)}
                  />
                  <ErrorMessage>{errors?.status?.message}</ErrorMessage>
                </TextWrapper>
              </InputWrapper>
              {orderDetail !== 'delivered' && (
                <InputWrapper error={false}>
                  <Label>Upload Image (Attachment)*</Label>
                  <TextWrapper>
                    <DragFile name="uploadImage" Upload={Upload} dragData={dragData.photoUpload} />
                    {payloadData?.uploadImage ? (
                      <FileName>{payloadData?.uploadImage}</FileName>
                    ) : (
                      <FileWrapper>
                        <FileName>{fileUrl}</FileName>
                        {ispreview && (
                          <div>
                            <EyeIcon onClick={handlePreviewClick} />
                            <DeleteIcon onClick={() => handleRemove('uploadImage')} />
                          </div>
                        )}
                      </FileWrapper>
                    )}
                    <ErrorMessage>{errors?.uploadImage?.message}</ErrorMessage>
                  </TextWrapper>
                </InputWrapper>
              )}
              {orderDetail === 'delivered' && (
                <InputWrapper error={errors.otp}>
                  <Label>Enter OTP*</Label>
                  <TextWrapper>
                    <TextInput placeholder="0000" control={control} name="otp" />
                    <ResendText>
                      {isActive ? (
                        <span>
                          Resend OTP In <span>{formatCountdown()}</span>
                        </span>
                      ) : (
                        <ExpiredOtp>
                          OTP has been expired <span onClick={handleResendClick}>Resend</span>
                        </ExpiredOtp>
                      )}
                    </ResendText>
                    <ErrorMessage>{errors?.otp?.message}</ErrorMessage>
                  </TextWrapper>
                </InputWrapper>
              )}
            </AddFormContainer>
            <ButtonWrapper>
              <Button label="Cancel" variant="contained" className="cancel" onClick={() => showModal(false)} />
              <Button label="Update Status" variant="contained" type="submit" />
            </ButtonWrapper>
          </FormWrapper>
        </AddContentContainer>
      </ModalContainer>
      <Modal isOpen={viewModal}>
        <DocumentViewModal filePath={filePath} handlePreviewClose={handlePreviewClose} />
      </Modal>
    </>
  )
}

export default DriverUpdateStatusModal
