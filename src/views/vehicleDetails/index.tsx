import React, { useContext, useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import { DatePicker, message } from 'antd'
import dayjs from 'dayjs'
import { DRIVER_DETAILS_SCHEMA } from 'validations/driverDetails'
import usePost from 'hooks/usePost'
import APIS from 'constants/api'
import { DashboardRoute, InviteAgentRoute } from 'constants/routes'
import { AppContext } from 'context/payloadContext'
import Button from 'components/Button'
import DragFile from 'components/Drag'
import { dragData } from 'components/Drag/data'
import SelectField from 'components/SelectField'
import TextInput from 'components/TextInput'
import Modal from 'components/Modal'
import { IVehicleDetails, VehicleDetailsProps } from 'interfaces/views'
import { vehichleDetailsOptions } from 'views/vehicleDetails/data'
import DocumentViewModal from 'views/documentViewModal'
import EyeIcon from 'assets/svg/EyeIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import { Label, InputContainer, DriverFormContainer } from 'styles/views/successfulModal'
import { InputWrapper } from 'styles/views/inviteAgentScreen/agentDetailSection'
import { ErrorMessage, TextWrapper, FileWrapper, FileIconWrapper, UploadedFileName } from 'styles/views/signin'
import {
  AgentDetailWrapper,
  HeadingWrapper,
  MainHeading,
  SubHeading,
  ButtonContainer,
  WeightWrapper,
  WeightButtonContainer,
} from 'styles/views/inviteAgentScreen/agentDetailSection'
import { ButtonWrapper } from 'styles/views/successfulModal'

const VehicleDetails = ({ next, showModal }: VehicleDetailsProps) => {
  const { payloadData, setPayloadData } = useContext(AppContext)
  const [activeIndex, setActiveIndex] = useState(true)
  const [viewModal, setViewModal] = useState(false)
  const [filePath, setFilePath] = useState('')

  const [ispreview, setIsPreviewed] = useState<{ [key: string]: boolean }>({})
  const location = useLocation()

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(DRIVER_DETAILS_SCHEMA),
    defaultValues: {
      vehicleNumber: '',
      makeYear: '',
      weight: '',
      brandName: '',
      ownerType: '',
      intercity: 'No',
      vehicleRegistrationDocument: '',
      unit: 'kg',
      deliveryType: '',
    },
  })

  const routerLocation = useLocation()

  useEffect(() => {
    setValue('vehicleNumber', payloadData?.vehicleDetails?.vehicleNumber?.toUpperCase())
    setValue('makeYear', payloadData?.vehicleDetails?.makeYear || getValues('makeYear'))
    setValue('weight', payloadData?.vehicleDetails?.maxWeightCapacity?.weight)
    setValue('brandName', payloadData?.vehicleDetails?.brandName)
    setValue('intercity', payloadData?.vehicleDetails?.intercity)
    setValue('ownerType', payloadData?.vehicleDetails?.ownerType)
    setValue('vehicleRegistrationDocument', payloadData?.vehicleDetails?.vehicleRegistrationDocument)
    setValue('unit', payloadData?.vehicleDetails?.unit)
    setValue('deliveryType', payloadData?.deliveryType)
    if (payloadData?.vehicleDetails?.vehicleRegistrationDocument !== undefined) {
      setIsPreviewed(() => ({
        ['vehicleRegistrationDocument']: true,
      }))
    }
  }, [payloadData])

  const values = getValues()
  const handleValue = (value: string[]) => {
    value
  }

  const submitData = async (data: IVehicleDetails) => {
    const payload = {
      ...payloadData,
      vehicleDetails: {
        vehicleNumber: data.vehicleNumber,
        brandName: data.brandName,
        ownerType: data.ownerType,
        makeYear: data.makeYear,
        intercity: data.intercity,
        vehicleRegistrationDocument: data.vehicleRegistrationDocument,
        maxWeightCapacity: {
          weight: data.weight,
          unit: data.unit,
        },
      },
      deliveryType: data.deliveryType,
    }

    if (data) {
      setPayloadData(payload)
      if (next) next()
    }
  }

  useEffect(() => {
    if (activeIndex) {
      setValue('unit', 'kg')
    } else {
      setValue('unit', 'lbs')
    }
  }, [activeIndex])

  const deliveryMethods = [
    { value: 'Express Delivery', label: 'Express Delivery' },
    // { value: 'Standard Delivery', label: 'Standard Delivery' },
    { value: 'Immediate Delivery', label: 'Immediate Delivery' },
    { value: 'Same Day Delivery', label: 'Same Day Delivery' },
    { value: 'Next Day Delivery', label: 'Next Day Delivery' },
  ]

  const filterOptions = vehichleDetailsOptions.vehicleBrands.map((brand: string, index: number) => {
    return { value: brand, label: brand, key: `${index + 1}` }
  })

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
        setValue('vehicleRegistrationDocument', response?.data?.url)
        if (response?.data?.url)
          setIsPreviewed(() => ({
            ['vehicleRegistrationDocument']: true,
          }))

        clearErrors('vehicleRegistrationDocument')
      } catch (error) {
        message.error(`${e.file.name} file upload failed.`)
      }
    }
  }

  const makeYearWatchValue = watch('makeYear')

  const handlePreviewClose = () => {
    setViewModal(false)
    setFilePath('')
  }

  const handlePreviewClick = () => {
    values?.vehicleRegistrationDocument
    const file: any = {
      url: values?.vehicleRegistrationDocument, // Provide the image URL or preview URL here
    }
    setViewModal(true)
    setFilePath(file.url)
    handlePreview(file)
  }

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      return
    }
  }
  const handleRemove = (name: string) => {
    setValue('vehicleRegistrationDocument', '')
    setIsPreviewed(() => ({
      [name]: false,
    }))
  }

  // Disable years in the future
  const disabledDate = (current: { year: () => number }) => {
    return current && current.year() > moment().year()
  }

  useEffect(() => {
    if (viewModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [viewModal])

  const showFileName = (fileUrl: any) => {
    const parts = fileUrl.split('/')
    const fileName = parts[parts.length - 1]
    return fileName
  }

  return (
    <>
      <AgentDetailWrapper>
        {location.pathname === `${InviteAgentRoute.path}` && (
          <HeadingWrapper>
            <MainHeading>Vehicle Details</MainHeading>
            <SubHeading>Complete information about the vehicle, including make, model, and registration.</SubHeading>
          </HeadingWrapper>
        )}
        <DriverFormContainer onSubmit={handleSubmit(submitData)}>
          <InputContainer>
            <InputWrapper error={errors.vehicleNumber}>
              <Label>Vehicle Number*</Label>
              <TextWrapper>
                <TextInput
                  placeholder="Enter Vehicle Number"
                  control={control}
                  name="vehicleNumber"
                  handleInputChange={(e: any) => {
                    setValue('vehicleNumber', e.target.value.toUpperCase())
                  }}
                />
                <ErrorMessage>{errors?.vehicleNumber?.message}</ErrorMessage>
              </TextWrapper>
            </InputWrapper>
            <InputWrapper error={false}>
              <Label>Brand Name</Label>

              <TextWrapper>
                <SelectField
                  showSearch
                  options={filterOptions}
                  control={control}
                  name="brandName"
                  placeholder="Select Brand Name"
                />
              </TextWrapper>
            </InputWrapper>
          </InputContainer>
          <InputContainer>
            <InputWrapper error={false}>
              <Label>Owner Type</Label>
              <TextWrapper>
                <SelectField
                  options={vehichleDetailsOptions.ownerType}
                  control={control}
                  name="ownerType"
                  placeholder="Select Owner Type"
                />
              </TextWrapper>
            </InputWrapper>
            <InputWrapper error={errors.makeYear}>
              <Label>Make Year*</Label>
              <TextWrapper>
                <Controller
                  control={control}
                  name="makeYear"
                  render={({ field }) => {
                    return (
                      <DatePicker
                        {...field}
                        picker="year"
                        format={'YYYY'}
                        disabledDate={(current) => disabledDate(dayjs(current))}
                        onChange={(value: any) => {
                          setValue('makeYear', `${moment(value.$d).format('YYYY')}`)
                          trigger('makeYear')
                        }}
                        value={makeYearWatchValue ? dayjs(makeYearWatchValue, 'YYYY') : null}
                        placeholder="Select Make Year"
                      />
                    )
                  }}
                />
                <ErrorMessage>{errors?.makeYear?.message}</ErrorMessage>
              </TextWrapper>
            </InputWrapper>
          </InputContainer>
          <InputContainer>
            <InputWrapper error={errors.weight}>
              <Label>Max. Weight Capacity*</Label>
              <InputWrapper error={errors?.weight}>
                <WeightWrapper>
                  <TextInput type="number" placeholder="Enter Max. Weight Capacity" control={control} name="weight" />
                  <WeightButtonContainer>
                    <Button
                      type="button"
                      label="Kg"
                      variant={activeIndex ? 'contained' : 'text'}
                      onClick={() => setActiveIndex(true)}
                      className={activeIndex ? '' : 'lbs'}
                    />
                    <Button
                      type="button"
                      label="Lbs"
                      variant={!activeIndex ? 'contained' : 'text'}
                      className={activeIndex ? 'lbs' : ''}
                      onClick={() => setActiveIndex(false)}
                    />
                  </WeightButtonContainer>
                </WeightWrapper>
                <ErrorMessage>{errors?.weight?.message}</ErrorMessage>
              </InputWrapper>
            </InputWrapper>
          </InputContainer>
          <InputWrapper error={errors.deliveryType}>
            <Label>Delivery Methods*</Label>
            <TextWrapper>
              <SelectField
                options={deliveryMethods}
                control={control}
                name="deliveryType"
                placeholder="Select Delivery Method"
                mode="multiple"
                onChange={handleValue}
              />
              <ErrorMessage>{errors?.deliveryType?.message}</ErrorMessage>
            </TextWrapper>
          </InputWrapper>
          <InputWrapper error={false}>
            <Label>Upload Registration File (Attachment)*</Label>
            <TextWrapper>
              <DragFile Upload={Upload} name="vehicleRegistrationDocument" dragData={dragData.documentUpload} />
              <FileWrapper>
                {ispreview.vehicleRegistrationDocument ? (
                  <FileIconWrapper>
                    <EyeIcon onClick={handlePreviewClick} />
                    <DeleteIcon onClick={() => handleRemove('vehicleRegistrationDocument')} />
                    <UploadedFileName>{showFileName(values?.vehicleRegistrationDocument)}</UploadedFileName>
                  </FileIconWrapper>
                ) : null}
              </FileWrapper>
            </TextWrapper>
            <ErrorMessage>{errors?.vehicleRegistrationDocument?.message}</ErrorMessage>
          </InputWrapper>

          {routerLocation.pathname === `${DashboardRoute.path}` ? (
            <ButtonWrapper>
              <Button label="Cancel" variant="contained" className="cancel" onClick={() => showModal(false)} />
              <Button type="submit" label="Submit" variant="contained" />
            </ButtonWrapper>
          ) : (
            <ButtonContainer>
              <Button type="submit" label="Continue" variant="contained" />
            </ButtonContainer>
          )}
        </DriverFormContainer>
      </AgentDetailWrapper>
      <Modal isOpen={viewModal}>
        <DocumentViewModal filePath={filePath} handlePreviewClose={handlePreviewClose} />
      </Modal>
    </>
  )
}

export default VehicleDetails
