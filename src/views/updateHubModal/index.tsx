import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast, ToastContainer } from 'react-toastify'
// import { CloseCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import usePost from 'hooks/usePost'
import useFormPost from 'hooks/useFormPost'
import { HUBS_DETAIL_SCHEMA } from 'validations/agentDetailsValidation'
import APIS from 'constants/api'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import HubMapComponent from 'components/MapComponent/hubMap'
import SelectField from 'components/SelectField'
import { IHubsDetails } from 'interfaces/views'
import { IUpdateModalProps } from 'interfaces'
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

const UpdateHubsModal = ({ showModal, id, getHubs, hubDetails }: IUpdateModalProps) => {
  const [loader, setLoader] = useState(false)
  const [locality, setLocality] = useState([{}])
  // const [inputValue, setInputValue] = useState<string>('')
  // const [myArray, setMyArray] = useState<number[]>([])

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(HUBS_DETAIL_SCHEMA),
    defaultValues: {
      name: `${hubDetails?.name}`,
      building: `${hubDetails?.addressDetails?.building}`,
      pincode: `${hubDetails?.addressDetails?.pincode}`,
      city: `${hubDetails?.addressDetails?.city}`,
      state: `${hubDetails?.addressDetails?.state}`,
      country: `${hubDetails?.addressDetails?.country}`,
      locality: `${hubDetails?.addressDetails?.locality}`,
      serviceablePincode: `${hubDetails?.serviceablePincode}`,
    },
  })

  const { mutateAsync } = usePost()

  const { pincode, city } = watch()

  const getAddressDetails = async () => {
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

  const submitData = async (data: IHubsDetails) => {
    const payload: any = {
      ...hubDetails,
      addressDetails: {
        location: {
          coordinates: [30.733315, 76.779419],
        },
        building: data?.building,
        locality: data?.locality,
        city: data?.city,
        state: data?.state,
        country: data?.country,
        pincode: data?.pincode,
      },
      name: data?.name,
      serviceablePincode: data?.serviceablePincode,

      currentLocation: {
        coordinates: [30.733315, 76.779419],
      },
    }
    const res = await mutateAsync({
      url: `${APIS.UPDATE_HUB}/${id}`,
      payload: payload,
    })
    showModal(false)
    if (res) {
      getHubs()
    }
  }

  // const onAddPincodes = () => {
  //   const newValue = parseInt(inputValue)
  //   if (!isNaN(newValue)) {
  //     const updatedArray = [...myArray, newValue]
  //     setMyArray(updatedArray)
  //   }

  //   setInputValue('')
  // }

  // const handleInputChange = (e: any) => {
  //   setInputValue(e.target.value)
  // }

  // function handleDeleteItem(index: any) {
  //   getHubs()
  //   const updatedPincodes = [...myArray]
  //   updatedPincodes.splice(index, 1)
  //   setMyArray(updatedPincodes)
  // }

  const formPost = useFormPost()
  formPost

  return (
    <ModalContainer>
      {loader && <Spinner />}
      <ToastContainer />
      <AddContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Update Hub</HeadingWrapper>
          <CloseIcon onClick={() => showModal(false)} />
        </HeadingContainer>
        <FormWrapper onSubmit={handleSubmit(submitData)} className="form-title">
          <UpdateDriverDetailContainer>
            <DriverInfoWrapper>
              <LocationWrapper>
                <InputWrapper error={errors.name}>
                  <Label>Name*</Label>
                  <TextInput placeholder="Enter Name" control={control} name="name" error={errors.name} />
                  <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                </InputWrapper>
                <Title>Location Details</Title>
                <HubMapComponent />
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
                  <TextInput
                    placeholder="Enter Pincode"
                    control={control}
                    name="pincode"
                    error={errors.pincode}
                    type="number"
                    maxLength={6}
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

                <InputWrapper error={false}>
                  <Label>Serviceable Pincode*</Label>
                  {hubDetails?.serviceablePincode.length !== 0 ? (
                    <ul>
                      {hubDetails?.serviceablePincode.map((items: any) => (
                        <li key={items._id}>
                          {items}
                          {/* <span
                            style={{ cursor: 'pointer', marginLeft: '5px', color: 'red' }}
                            onClick={() => handleDeleteItem(index)}
                          >
                            <CloseCircleOutlined rev={undefined} />
                          </span> */}
                          {/*  <span
                            style={{ cursor: 'pointer', marginLeft: '5px', color: 'blue' }}
                            onClick={() => handleDeleteItem(index)}
                          >
                            <EditOutlined rev={undefined} />
                          </span> */}
                          {/* <button onClick={() => handleEdit(item)}>Edit</button> */}
                          {/* <button onClick={() => handleDelete(item)}>Delete</button> */}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    'NA'
                  )}
                </InputWrapper>

                {/* <></>

                <InputWrapper error={errors.serviceablePincode}>
                  <TextInput
                    placeholder="Enter Serviceable Pincode"
                    control={control}
                    name="serviceablePincode"
                    type="number"
                    handleInputChange={handleInputChange}
                  />
                  <ErrorMessage>{errors?.serviceablePincode?.message}</ErrorMessage>
                </InputWrapper>
                <Button
                  type="button"
                  label="Add Pincode"
                  variant="outline"
                  onClick={onAddPincodes}
                  className="addPin"
                />

                {myArray.length !== 0 && (
                  <>
                    <Title>Added Serviceable Pincode List</Title>
                    <Label>
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
                )} */}
              </HubInfoContainer>
            </DriverInfoWrapper>
          </UpdateDriverDetailContainer>
          <ButtonWrapper className="button-container">
            <Button label="Cancel" variant="contained" className="cancel" onClick={() => showModal(false)} />
            <Button type="submit" label="Update" variant="contained" />
          </ButtonWrapper>
        </FormWrapper>
      </AddContentContainer>
    </ModalContainer>
  )
}

export default UpdateHubsModal
