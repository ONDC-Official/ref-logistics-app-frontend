import { useEffect, useState, useContext } from 'react'
import { CloseCircleOutlined } from '@ant-design/icons'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import useFormPost from 'hooks/useFormPost'
import SelectField from 'components/SelectField'
import { IHubsDetails } from 'interfaces/views'
import usePost from 'hooks/usePost'
import { HUBS_DETAIL_SCHEMA } from 'validations/agentDetailsValidation'
import APIS from 'constants/api'
import TextInput from 'components/TextInput'
import NumberInput from 'components/NumberInput'
import Button from 'components/Button'
import HubMapComponent from 'components/MapComponent/hubMap'
import { AppContext } from 'context/payloadContext'
import { IAddHUbModalProps } from 'interfaces'
import CloseIcon from 'assets/svg/CloseIcon'
import { ErrorMessage } from 'styles/views/signin'
import { InputWrapper } from 'styles/views/inviteAgentScreen/agentDetailSection'
import Spinner from 'components/Loader'
import { SelectWrapper } from 'styles/components/SelectField'
import { DriverInfoWrapper, HubInfoContainer } from 'styles/views/driverProfileDetails'

import {
  Label,
  ModalContainer,
  AddContentContainer,
  HeadingContainer,
  HeadingWrapper,
  ButtonWrapper,
  FormWrapper,
  UpdateDriverDetailContainer,
} from 'styles/views/successfulModal'
import { LocationWrapper, Title } from 'styles/views/inviteAgentScreen/driverDetailsSection'

const AddHubsModal = ({ showModal, getHubs }: IAddHUbModalProps) => {
  const [loader, setLoader] = useState(false)
  const [dragPincode, setDragPincode] = useState('')
  const [locality, setLocality] = useState([{}])
  const [isValidPincode, setisValidPincode] = useState(true)
  const [myArray, setMyArray] = useState<number[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [servicableInputValue, setServicableInputValue] = useState<string>('')

  const { payloadData, setPayloadData } = useContext(AppContext)
  const { mutateAsync } = usePost()

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(HUBS_DETAIL_SCHEMA),
    defaultValues: {
      name: '',
      building: '',
      pincode: '',
      city: '',
      state: '',
      country: '',
      locality: '',
      serviceablePincode: '',
    },
  })

  useEffect(() => {
    setValue('name', payloadData.name)
    setValue('building', payloadData?.addressDetails?.building)
    setValue('locality', payloadData?.addressDetails?.locality)
    setValue('city', payloadData?.addressDetails?.city)
    setValue('state', payloadData?.addressDetails?.state)
    setValue('country', payloadData?.addressDetails?.country)
    setValue('pincode', payloadData?.addressDetails?.pincode)
    setValue('serviceablePincode', payloadData?.serviceablePincode || '')
  }, [payloadData])

  const { pincode, city, serviceablePincode } = watch()

  const getAddressDetails = async (pincode: string) => {
    try {
      setLoader(true)
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
      if (response.data[0]?.Status === 'Error') {
        toast.error('Invalid Pin code')
        setLoader(false)
        setValue('locality', '')
        setValue('state', '')
        setValue('city', '')
        setValue('country', '')
      } else if (response.data && response.data[0] && response.data[0].PostOffice) {
        const { State, Block, Country, District } = response.data[0].PostOffice[0]
        const postOffices = response.data[0].PostOffice
        const nameList = postOffices.map((postOffice: { Name: string }) => postOffice.Name)
        setLocality(nameList)
        setValue('locality', nameList[0])
        setValue('state', State)
        setValue('city', Block === 'NA' ? District : Block)
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

  const getPinDetails = async () => {
    try {
      setLoader(true)
      const response = await axios.get(`https://api.postalpincode.in/pincode/${serviceablePincode}`)
      if (response.data[0]?.Status === 'Error') {
        toast.dismiss()
        toast.error('Invalid Pin code')
        setLoader(false)
        setisValidPincode(true)
      } else if (response.data && response.data[0] && response.data[0].PostOffice) {
        setLoader(false)
        setisValidPincode(false)
      }
    } catch (err: any) {
      toast.dismiss()
      toast.error(`${err.response.data.error}`)
    }
  }

  useEffect(() => {
    if (inputValue?.length === 6) {
      getAddressDetails(inputValue)
    }

    if (dragPincode?.length === 6) {
      getAddressDetails(dragPincode)
    }
  }, [inputValue, dragPincode])

  useEffect(() => {
    if (servicableInputValue?.length === 6) {
      getPinDetails()
    }
  }, [servicableInputValue])

  const localities = []

  for (let i = 0; i < locality.length; i++) {
    const localityObject = {
      value: locality[i],
    }
    localities.push(localityObject)
  }

  const onAddPincodes = () => {
    const newValue = parseInt(inputValue)

    // Check if the entered value is a valid 6-digit number
    if (!isNaN(newValue) && inputValue.length === 6) {
      if (!myArray.includes(newValue)) {
        const updatedArray = [...myArray, newValue]
        setMyArray(updatedArray)
        setInputValue('')
      } else {
        toast.error('Pincode already exists.')
      }
    }
  }

  const submitData = async (data: IHubsDetails) => {
    const payload: any = {
      addressDetails: {
        location: {
          coordinates: [30.733315, 76.779419],
        },
        building: data?.building,
        locality: data?.locality,
        city: data?.city,
        state: data?.state,
        country: data?.country,
        pincode: data?.pincode.toString(),
      },
      name: data?.name,
      status: 'Inactive',
      serviceablePincode: myArray,
    }
    setPayloadData(payload)
    const res = await mutateAsync({
      url: APIS.CREATE_HUB,
      payload: payload,
    })
    if (res) {
      showModal(false)
      getHubs()
    }

    reset()
  }

  function handleDeleteItem(index: any) {
    const updatedPincodes = [...myArray]
    updatedPincodes.splice(index, 1)
    setMyArray(updatedPincodes)
  }

  const formPost = useFormPost()
  formPost

  const handleFormatter = (value: any) => {
    setInputValue(value)
    const numericValue = value.replace(/[e.+\\-]/g, '')
    if (pincode) setInputValue(value)
    if (serviceablePincode) setServicableInputValue(value)

    if (numericValue.length >= 6) {
      return numericValue.slice(0, 6)
    }

    return numericValue
  }

  return (
    <ModalContainer>
      {loader && <Spinner />}
      <ToastContainer />
      <AddContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Add Hub</HeadingWrapper>
          <CloseIcon onClick={() => showModal(false)} />
        </HeadingContainer>
        <FormWrapper onSubmit={handleSubmit(submitData)} className="form-title">
          <UpdateDriverDetailContainer>
            <DriverInfoWrapper>
              <LocationWrapper>
                <InputWrapper error={errors.name}>
                  <Label>Hub Name*</Label>
                  <TextInput placeholder="Enter Hub Name" control={control} name="name" error={errors.name} />
                  <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                </InputWrapper>
                <Title>Location Details</Title>
                <HubMapComponent setDragPincode={setDragPincode} />
              </LocationWrapper>
              <HubInfoContainer>
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
                  <NumberInput
                    placeholder="Enter Pincode"
                    control={control}
                    name="pincode"
                    value={inputValue}
                    maxLength={6}
                    formatter={handleFormatter}
                    error={errors.pincode}
                  />
                  <ErrorMessage>{errors?.pincode?.message}</ErrorMessage>
                </InputWrapper>
                <SelectWrapper error={errors.locality}>
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
                </SelectWrapper>
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
                <InputWrapper error={errors.serviceablePincode}>
                  <Label>Serviceable Pincode*</Label>
                  <InputWrapper error={errors.serviceablePincode}>
                    <NumberInput
                      placeholder="Enter Serviceable Pincode"
                      control={control}
                      name="serviceablePincode"
                      maxLength={6}
                      value={inputValue}
                      formatter={handleFormatter}
                      error={errors.serviceablePincode}
                    />
                    <ErrorMessage>
                      {errors?.serviceablePincode?.message || myArray.length === 0
                        ? errors?.serviceablePincode?.message
                        : null}
                    </ErrorMessage>
                  </InputWrapper>
                </InputWrapper>
                <Button
                  type="button"
                  label="Add Pincode"
                  variant={isValidPincode ? 'disabled' : 'outline'}
                  onClick={onAddPincodes}
                  className="addPin"
                />

                {myArray.length !== 0 && (
                  <>
                    <Title>Added Serviceable Pincode List</Title>
                    <Label>
                      {/* <ErrorMessage>{errorMessage}</ErrorMessage> */}

                      <ul>
                        {myArray.map((item, index) => (
                          <li key={index}>
                            {item}
                            <span
                              style={{ cursor: 'pointer', marginLeft: '5px', color: 'red' }}
                              onClick={() => handleDeleteItem(index)}
                            >
                              <CloseCircleOutlined rev={undefined} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </Label>
                  </>
                )}
              </HubInfoContainer>
            </DriverInfoWrapper>
          </UpdateDriverDetailContainer>
          <ButtonWrapper className="button-container">
            <Button label="Cancel" variant="contained" className="cancel" onClick={() => showModal(false)} />
            <Button type="submit" label="Submit" variant="contained" />
          </ButtonWrapper>
        </FormWrapper>
      </AddContentContainer>
    </ModalContainer>
  )
}

export default AddHubsModal
