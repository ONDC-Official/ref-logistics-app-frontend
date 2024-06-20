import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { message } from 'antd'
import usePost from 'hooks/usePost'
import { AGENTKYCDETAILSVALIDATION_SCHEMA } from 'validations/agentDetailsValidation'
import { AppContext } from 'context/payloadContext'
import APIS from 'constants/api'
import DragFile from 'components/Drag'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import Modal from 'components/Modal'
import { dragData } from 'components/Drag/data'
import { IKYCData, IKYCDetailsProps } from 'interfaces/views'
import DocumentViewModal from 'views/documentViewModal'
import EyeIcon from 'assets/svg/EyeIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import CloseEyeIcon from 'assets/svg/CloseEyeIcon'
import { ErrorMessage, TextWrapper, FileWrapper, FileIconWrapper, UploadedFileName } from 'styles/views/signin'
import {
  AgentDetailWrapper,
  FormWrapper,
  HeadingWrapper,
  InputWrapper,
  Label,
  MainHeading,
  SubHeading,
  DetailWrapper,
  ButtonContainer,
  PanInputWrapper,
} from 'styles/views/inviteAgentScreen/agentDetailSection'

const KYCDetails = ({ next }: IKYCDetailsProps) => {
  const { payloadData, setPayloadData } = useContext(AppContext)
  const [ispreview, setIsPreviewed] = useState<{ [key: string]: boolean }>({})
  const [showPan, setShowPan] = useState(false)
  const [filePath, setFilePath] = useState('')
  const [viewModal, setViewModal] = useState(false)

  const {
    handleSubmit,
    control,
    setValue,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(AGENTKYCDETAILSVALIDATION_SCHEMA),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      panNumber: '',
      aadhaarNumber: '',
      drivingLicense: '',
    },
  })

  useEffect(() => {
    setValue('email', payloadData.email)
    setValue('firstName', payloadData.firstName)
    setValue('lastName', payloadData.lastName)
    setValue('phone', payloadData.mobile)
    setValue('panNumber', payloadData?.KYCDetails?.PANdetails)
    setValue('aadhaarNumber', payloadData?.KYCDetails?.aadhaarNumber)
    setValue('drivingLicense', payloadData?.KYCDetails?.drivingLicense)
    if (payloadData?.KYCDetails?.drivingLicense !== undefined) {
      setIsPreviewed(() => ({
        ['drivingLicense']: true,
      }))
    }
  }, [payloadData])

  const submitData = (data: IKYCData) => {
    const payload = {
      ...payloadData,
      KYCDetails: {
        ...payloadData?.KYCDetails,
        PANdetails: data?.panNumber,
        aadhaarNumber: data?.aadhaarNumber,
        drivingLicense: data?.drivingLicense,
      },
    }
    if (data) {
      setPayloadData(payload)
      next()
    }
  }

  const { mutateAsync } = usePost()

  const Upload = async (name: string, e: any) => {
    const { file, onSuccess } = e
    const formData = new FormData()
    formData.append('image', file)
    name

    const fileSizeInBytes = e?.file?.size
    const fileSizeInMB = fileSizeInBytes / 1048576

    const supportedTypes = ['application/pdf', 'image/jpeg', 'image/jpg']
    const isFileTypeSupported = supportedTypes.includes(e?.file?.type)

    if (isFileTypeSupported && fileSizeInMB <= 2) {
      try {
        e.onProgress({ percent: 0 })
        const response = await mutateAsync({
          url: APIS.UPLOAD_FILE,
          payload: formData,
        })
        e.onProgress({ percent: 100 })
        onSuccess(response?.data?.message)
        setValue('drivingLicense', response?.data?.url)
        if (response?.data?.url) {
          setIsPreviewed(() => ({
            ['drivingLicense']: true,
          }))
        }

        clearErrors('drivingLicense')
      } catch (error) {
        message.error(`${e.file.name} file upload failed.`)
      }
    }
  }
  // const fileUrl = getValues('drivingLicense')
  const values = getValues()
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      return
    }
  }
  const handlePreviewClick = () => {
    values?.drivingLicense
    const file: any = {
      url: values?.drivingLicense,
    }
    setViewModal(true)
    setFilePath(file.url)
    handlePreview(file)
  }
  const handleRemove = (name: string) => {
    setValue('drivingLicense', '')
    setIsPreviewed(() => ({
      [name]: false,
    }))
  }
  const handlePreviewClose = () => {
    setViewModal(false)
    setFilePath('')
  }

  const showFileName = (fileUrl: any) => {
    const parts = fileUrl.split('/')
    const fileName = parts[parts.length - 1]
    return fileName
  }

  return (
    <>
      <AgentDetailWrapper>
        <HeadingWrapper>
          <MainHeading>Add KYC Details</MainHeading>
          <SubHeading>Submit and update your Know Your Customer (KYC) information effortlessly.</SubHeading>
        </HeadingWrapper>

        <FormWrapper onSubmit={handleSubmit(submitData)}>
          <DetailWrapper>
            <InputWrapper error={false}>
              <Label>First Name*</Label>
              <TextWrapper>
                <TextInput placeholder="Enter First Name" control={control} name="firstName" disabled />
              </TextWrapper>
            </InputWrapper>
            <InputWrapper error={false}>
              <Label> Last Name*</Label>
              <TextWrapper>
                <TextInput placeholder="Enter Last Name" control={control} name="lastName" disabled />
              </TextWrapper>
            </InputWrapper>
            <InputWrapper error={false}>
              <Label>Email*</Label>
              <TextWrapper>
                <TextInput placeholder="Enter Email" control={control} name="email" disabled />
              </TextWrapper>
            </InputWrapper>
            <InputWrapper error={false}>
              <Label>Mobile Number*</Label>
              <TextWrapper>
                <TextInput placeholder="Enter Mobile Number " control={control} name="phone" disabled />
              </TextWrapper>
            </InputWrapper>
            <PanInputWrapper error={errors.panNumber}>
              <Label>Pan Number*</Label>
              <TextWrapper>
                <TextInput
                  placeholder="Enter Pan Number"
                  control={control}
                  name="panNumber"
                  error={errors.panNumber}
                  type={showPan ? 'text' : 'password'}
                  maxLength={10}
                  autocomplete={'off'}
                  handleInputChange={(e: any) => {
                    setValue('panNumber', e.target.value.toUpperCase())
                  }}
                />
                {showPan ? (
                  <CloseEyeIcon onClick={() => setShowPan(!showPan)} />
                ) : (
                  <EyeIcon onClick={() => setShowPan(!showPan)} />
                )}
                <ErrorMessage>{errors?.panNumber?.message}</ErrorMessage>
              </TextWrapper>
            </PanInputWrapper>
            <InputWrapper error={errors.aadhaarNumber}>
              <Label>Driving Licence Number*</Label>
              <TextInput
                placeholder="Enter Driving Licence Number"
                control={control}
                name="aadhaarNumber"
                error={errors.aadhaarNumber}
                handleInputChange={(e: any) => {
                  setValue('aadhaarNumber', e.target.value.toUpperCase())
                }}
              />
              <ErrorMessage>{errors?.aadhaarNumber?.message}</ErrorMessage>
            </InputWrapper>
          </DetailWrapper>
          <InputWrapper error={false}>
            <Label>Upload License (Attachment)*</Label>
            <TextWrapper>
              <DragFile Upload={Upload} name="drivingLicense" dragData={dragData.documentUpload} />
              <FileWrapper>
                {ispreview.drivingLicense ? (
                  <FileIconWrapper>
                    <EyeIcon onClick={handlePreviewClick} />
                    <DeleteIcon onClick={() => handleRemove('drivingLicense')} />
                    <UploadedFileName>{showFileName(values?.drivingLicense)}</UploadedFileName>
                  </FileIconWrapper>
                ) : null}
              </FileWrapper>
            </TextWrapper>
          </InputWrapper>

          <ErrorMessage>{errors?.drivingLicense?.message}</ErrorMessage>
          <ButtonContainer>
            <Button type="submit" label="Continue" variant="contained" />
          </ButtonContainer>
        </FormWrapper>
      </AgentDetailWrapper>
      <Modal isOpen={viewModal}>
        <DocumentViewModal filePath={filePath} handlePreviewClose={handlePreviewClose} />
      </Modal>
    </>
  )
}

export default KYCDetails
