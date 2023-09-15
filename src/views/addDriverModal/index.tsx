import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { DatePicker } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import moment from 'moment'
import { toast, ToastContainer } from 'react-toastify'
import usePost from 'hooks/usePost'
import APIS from 'constants/api'
import { IUpdateModalProps } from 'interfaces/views'
import { IParamId } from 'interfaces/pages'
import TextInput from 'components/TextInput'
import Spinner from 'components/Loader'
import SelectField from 'components/SelectField'
import { UPDATE_DRIVER_DETAIL_SCHEMA } from 'validations/agentDetailsValidation'
import Button from 'components/Button'
import CloseIcon from 'assets/svg/CloseIcon'

import {
  ModalContainer,
  AddContentContainer,
  HeadingContainer,
  HeadingWrapper,
  UpdateDriverDetailContainer,
  ButtonWrapper,
} from 'styles/views/successfulModal'
import { DriverInfoWrapper, Heading, DriverInfoContainer } from 'styles/views/driverProfileDetails'
import { ErrorMessage, Label, TextWrapper } from 'styles/views/signin'
import { FormWrapper, InputWrapper } from 'styles/views/editDetails'

const UpdateDriverModal = ({ showModal, singleDriverDetail, getDriverDetails }: IUpdateModalProps) => {
  const { id }: IParamId = useParams()
  const [loader, setLoader] = useState(false)
  const [locality, setLocality] = useState([{}])

  const { mutateAsync } = usePost()
  const agentDetails = singleDriverDetail?.data?.agentDetails

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(UPDATE_DRIVER_DETAIL_SCHEMA),
    defaultValues: {
      firstName: `${agentDetails?.firstName}`,
      lastName: `${agentDetails?.lastName}`,
      deliveryExperience: `${agentDetails?.deliveryExperience}`,
      vehicleNumber: `${agentDetails?.vehicleDetails?.vehicleNumber}`,
      makeYear: `${agentDetails?.vehicleDetails?.makeYear}`,
      weight: `${agentDetails?.vehicleDetails?.maxWeightCapacity?.weight}`,
      deliveryType: `${agentDetails?.deliveryType}`,
      accountNumber: `${agentDetails?.bankDetails?.accountNumber}`,
      IFSCcode: `${agentDetails?.bankDetails?.IFSCcode}`,
      branchName: `${agentDetails?.bankDetails?.branchName}`,
      bankName: `${agentDetails?.bankDetails?.bankName}`,
      holderName: `${agentDetails?.bankDetails?.accountHolderName}`,
      building: `${agentDetails?.addressDetails?.building}`,
      pincode: `${agentDetails?.addressDetails?.pincode}`,
      city: `${agentDetails?.addressDetails?.city}`,
      state: `${agentDetails?.addressDetails?.state}`,
      country: `${agentDetails?.addressDetails?.country}`,
      locality: `${agentDetails?.addressDetails?.locality}`,
    },
  })

  const { pincode, city } = watch()

  const getAddressDetails = async () => {
    try {
      setLoader(true)
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
      if (response.data[0]?.Status === 'Error') {
        toast.error('Invalid Pin code')
        setLoader(false)
      } else if (response.data && response.data[0] && response.data[0].PostOffice) {
        const { State, Block, Country } = response.data[0].PostOffice[0]
        const postOffices = response.data[0].PostOffice
        const nameList = postOffices.map((postOffice: { Name: string }) => postOffice.Name)
        setLocality(nameList)
        setValue('locality', nameList[0])
        setValue('state', State)
        setValue('city', Block)
        setValue('country', Country)
        clearErrors('locality')
        clearErrors('state')
        clearErrors('city')
        clearErrors('country')
        setLoader(false)
      }
    } catch (err: any) {
      toast.error(`${err.response.data.error}`)
      err.response.data.error
    }
  }

  useEffect(() => {
    if (pincode?.length === 6) {
      getAddressDetails()
    }
  }, [pincode])

  const localities = []

  for (let i = 0; i < locality.length; i++) {
    const localityObject = {
      value: locality[i],
    }
    localities.push(localityObject)
  }

  const { IFSCcode } = watch()

  const getBankDetails = async () => {
    setLoader(true)
    try {
      const response = await axios.get(`https://ifsc.razorpay.com/${IFSCcode}`)
      if (response.data[0]?.Status === 'Error') {
        setLoader(false)
        toast.error('Inavlid IFSC code')
      } else if (response.data) {
        const { BANK, BRANCH } = response.data
        setValue('branchName', BRANCH)
        setValue('bankName', BANK)
        setLoader(false)
      }
    } catch (err: any) {
      setLoader(false)
      toast.error('Invalid IFSC Code')
    }
  }

  useEffect(() => {
    if (IFSCcode?.length === 11) {
      getBankDetails()
    }
  }, [IFSCcode])

  const submitData = async (data: any) => {
    const payload = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      deliveryExperience: data?.deliveryExperience,
      addressDetails: {
        building: data?.building,
        pincode: data?.pincode,
        city: data?.city,
        state: data?.state,
        locality: data?.locality,
        country: data?.country,
      },
      vehicleDetails: {
        makeYear: data?.makeYear,
        vehicleNumber: data?.vehicleNumber,
        maxWeightCapacity: {
          weight: data?.weight,
        },
      },
      deliveryType: data?.deliveryType,
      bankDetails: {
        accountHolderName: data?.holderName,
        accountNumber: data?.accountNumber,
        IFSCcode: data?.IFSCcode,
        bankName: data?.bankName,
        branchName: data?.branchName,
      },
    }

    const res = await mutateAsync({
      url: `${APIS.UPDATE_DRIVER}/${id}/update`,
      payload: payload,
    })
    showModal(false)
    if (res) {
      getDriverDetails()
    }
  }

  const makeYearWatchValue = watch('makeYear')

  const deliveryMethods = [
    { value: 'Express Delivery', label: 'Express Delivery' },
    { value: 'Standard Delivery', label: 'Standard Delivery' },
    { value: 'Immediate Delivery', label: 'Immediate Delivery' },
    { value: 'Same Day Delivery', label: 'Same Day Delivery' },
    { value: 'Next Day Delivery', label: 'Next Day Delivery' },
  ]

  const handleValue = (value: string[]) => {
    value
  }

  // Disable years in the future
  const disabledDate = (current: { year: () => number }) => {
    return current && current.year() > moment().year()
  }

  return (
    <ModalContainer>
      {loader && <Spinner />}
      <ToastContainer />
      <AddContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Update Driver</HeadingWrapper>
          <CloseIcon onClick={() => showModal(false)} />
        </HeadingContainer>

        <FormWrapper onSubmit={handleSubmit(submitData)}>
          <UpdateDriverDetailContainer>
            <DriverInfoWrapper>
              <Heading>Driver&apos;s Details</Heading>
              <DriverInfoContainer>
                <InputWrapper error={errors?.firstName}>
                  <Label>First Name*</Label>
                  <TextInput
                    placeholder="Enter First Name"
                    control={control}
                    name="firstName"
                    error={errors?.firstName}
                  />
                  <ErrorMessage>{errors?.firstName?.message}</ErrorMessage>
                </InputWrapper>
                <InputWrapper error={errors?.lastName}>
                  <Label>Last Name*</Label>
                  <TextInput placeholder="Enter Last Name" control={control} name="lastName" error={errors?.lastName} />
                  <ErrorMessage>{errors?.lastName?.message}</ErrorMessage>
                </InputWrapper>
                <InputWrapper error={errors?.deliveryExperience}>
                  <Label>Delivery Experience</Label>
                  <TextInput
                    placeholder="Enter Delivery Experience"
                    control={control}
                    name="deliveryExperience"
                    error={errors?.deliveryExperience}
                  />
                  <ErrorMessage>{errors?.deliveryExperience?.message}</ErrorMessage>
                </InputWrapper>
              </DriverInfoContainer>
            </DriverInfoWrapper>
            <DriverInfoWrapper>
              <Heading>Address Details</Heading>
              <DriverInfoContainer>
                <InputWrapper error={errors.building}>
                  <Label>Building*</Label>
                  <TextInput
                    placeholder="Building, apartment, house no"
                    control={control}
                    name="building"
                    error={errors.building}
                  />
                  <ErrorMessage>{errors?.building?.message}</ErrorMessage>
                </InputWrapper>
                <InputWrapper error={errors.pincode}>
                  <Label>Pincode*</Label>
                  <TextInput placeholder="Enter Pincode" control={control} name="pincode" error={errors.pincode} />
                  <ErrorMessage>{errors?.pincode?.message}</ErrorMessage>
                </InputWrapper>

                <InputWrapper error={errors.locality}>
                  <Label>Select Locality*</Label>
                  <SelectField
                    placeholder="Select Locality"
                    control={control}
                    name="locality"
                    options={localities}
                    disabled={city ? false : true}
                    error={errors.locality}
                  />
                  <ErrorMessage>{errors?.locality?.message}</ErrorMessage>
                </InputWrapper>
                <InputWrapper error={false}>
                  <Label>City*</Label>
                  <TextInput placeholder="City" control={control} name="city" disabled />
                </InputWrapper>
                <InputWrapper error={false}>
                  <Label>State*</Label>
                  <TextInput placeholder="State" control={control} name="state" disabled />
                </InputWrapper>
                <InputWrapper error={false}>
                  <Label>Country*</Label>
                  <TextInput placeholder="Country" control={control} name="country" disabled />
                </InputWrapper>
              </DriverInfoContainer>
            </DriverInfoWrapper>

            <DriverInfoWrapper>
              <Heading>Vehicle Details </Heading>
              <DriverInfoContainer>
                <InputWrapper error={errors?.vehicleNumber}>
                  <Label>Vehicle Number*</Label>
                  <TextInput
                    placeholder="Enter Vehicle Number"
                    control={control}
                    name="vehicleNumber"
                    error={errors?.vehicleNumber}
                    handleInputChange={(e: any) => {
                      setValue('vehicleNumber', e.target.value.toUpperCase())
                    }}
                  />
                  <ErrorMessage>{errors?.vehicleNumber?.message}</ErrorMessage>
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
                <InputWrapper error={errors.weight}>
                  <Label>Max. Weight Capacity*</Label>
                  <InputWrapper error={errors?.weight}>
                    <TextInput type="number" placeholder="Enter Max. Weight Capacity" control={control} name="weight" />
                    <ErrorMessage>{errors?.weight?.message}</ErrorMessage>
                  </InputWrapper>
                </InputWrapper>
                <InputWrapper error={errors.deliveryType}>
                  <Label>Delivery Methos*</Label>
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
              </DriverInfoContainer>
            </DriverInfoWrapper>
            <DriverInfoWrapper>
              <Heading>Bank Details </Heading>
              <DriverInfoContainer>
                <InputWrapper error={errors.holderName}>
                  <Label>Account Holder Name*</Label>
                  <TextWrapper>
                    <TextInput
                      placeholder="Enter Account Holder Name"
                      control={control}
                      name="holderName"
                      error={errors.holderName}
                    />
                    <ErrorMessage>{errors?.holderName?.message}</ErrorMessage>
                  </TextWrapper>
                </InputWrapper>
                <InputWrapper error={errors.accountNumber}>
                  <Label>Account Number*</Label>
                  <TextWrapper>
                    <TextInput
                      placeholder="Enter Account Number"
                      control={control}
                      name="accountNumber"
                      error={errors.accountNumber}
                    />
                    <ErrorMessage>{errors?.accountNumber?.message}</ErrorMessage>
                  </TextWrapper>
                </InputWrapper>
                <InputWrapper error={errors.IFSCcode}>
                  <Label>IFSC Code*</Label>
                  <TextWrapper>
                    <TextInput
                      placeholder="Enter IFSC Code"
                      control={control}
                      name="IFSCcode"
                      error={errors.IFSCcode}
                      handleInputChange={(e: any) => {
                        setValue('IFSCcode', e.target.value.toUpperCase())
                      }}
                    />
                    <ErrorMessage>{errors?.IFSCcode?.message}</ErrorMessage>
                  </TextWrapper>
                </InputWrapper>
                <InputWrapper error={false}>
                  <Label>Bank Name*</Label>
                  <TextWrapper>
                    <TextInput placeholder="Bank Name" control={control} name="bankName" disabled />
                    <ErrorMessage>{errors?.bankName?.message}</ErrorMessage>
                  </TextWrapper>
                </InputWrapper>
                <InputWrapper error={false}>
                  <Label>Branch Name*</Label>
                  <TextWrapper>
                    <TextInput placeholder="Branch name" control={control} name="branchName" disabled />
                    <ErrorMessage>{errors?.branchName?.message}</ErrorMessage>
                  </TextWrapper>
                </InputWrapper>
              </DriverInfoContainer>
            </DriverInfoWrapper>
          </UpdateDriverDetailContainer>

          <ButtonWrapper>
            <Button label="Cancel" variant="contained" onClick={() => showModal(false)} className="cancel" />
            <Button type="submit" label="Update" variant="contained" />
          </ButtonWrapper>
        </FormWrapper>
      </AddContentContainer>
    </ModalContainer>
  )
}

export default UpdateDriverModal
