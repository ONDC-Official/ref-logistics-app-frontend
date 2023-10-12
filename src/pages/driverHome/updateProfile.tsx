import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import usePost from 'hooks/usePost'
import APIS from 'constants/api'
import { AppContext } from 'context/payloadContext'
import { IUpdateProfile } from 'interfaces/pages'
import { UPDATE_DETAILS_SCHEMA } from 'validations/driverDetails'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import { ProfileRoutes } from 'constants/routes'
import MobileTopbar from 'components/MobileTopbar'
import MobileNavbar from 'components/MobileNav'
import BackArrow from 'assets/svg/BackArrow'
import { ErrorMessage } from 'styles/views/signin'
import { Label } from 'styles/views/inviteAgentScreen/agentDetailSection'
import { TextWrapper } from 'styles/views/signin'
import {
  UpdateDetailsContainer,
  PersonalDetailsUpdate,
  PersonalDetailsWrapper,
  InputWrapper,
} from 'styles/views/inviteAgentScreen/driverDetailsSection'
import { UpdateButtonWrapper } from 'styles/views/dashboard'

const UpdateProfile = () => {
  const { userInfo } = useContext(AppContext)
  const { mutateAsync } = usePost()
  const router = useHistory()

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(UPDATE_DETAILS_SCHEMA),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  useEffect(() => {
    setValue('name', userInfo?.name)
    setValue('email', userInfo?.email)
    setValue('phone', userInfo?.mobile ? userInfo?.mobile.replace('+91', '') : userInfo?.mobile)
  }, [userInfo])

  const submitData = async (data: IUpdateProfile) => {
    const payload = {
      name: data?.name,
    }
    try {
      const res = await mutateAsync({
        url: APIS.UPDATE_PROFILE,
        payload: payload,
      })
      if (res) {
        router.push(`${ProfileRoutes.path}`)
      }
    } catch (error) {
      error
    }
  }

  const handleBack = () => {
    router.goBack()
  }

  useEffect(() => {
    return () => {
      window.location.reload()
    }
  }, [])

  return (
    <UpdateDetailsContainer>
      <PersonalDetailsUpdate>
        <MobileTopbar />

        <BackArrow onClick={handleBack} />
        <PersonalDetailsWrapper onSubmit={handleSubmit(submitData)}>
          <InputWrapper error={errors?.name}>
            <Label>Name</Label>
            <TextWrapper>
              <TextInput placeholder="Enter Name" control={control} name="name" error={errors?.name} />
              <ErrorMessage>{errors?.name?.message}</ErrorMessage>
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
              <TextInput placeholder="Enter Mobile Number" control={control} name="phone" type="number" disabled />
            </TextWrapper>
          </InputWrapper>
          <UpdateButtonWrapper>
            <Button label="Update" variant="contained" type="submit" className="update" />
          </UpdateButtonWrapper>
        </PersonalDetailsWrapper>
      </PersonalDetailsUpdate>
      <MobileNavbar />
    </UpdateDetailsContainer>
  )
}

export default UpdateProfile
