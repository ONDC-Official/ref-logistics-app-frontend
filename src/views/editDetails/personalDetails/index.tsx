import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { PERSONAL_DETAILS_SCHEMA } from 'validations/driverDetails'
import usePost from 'hooks/usePost'
import { AppContext } from 'context/payloadContext'
import APIS from 'constants/api'
import { DashboardRoute } from 'constants/routes'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import BackArrow from 'assets/svg/BackArrow'
import { ErrorMessage } from 'styles/views/signin'
import { Label } from 'styles/views/inviteAgentScreen/agentDetailSection'
import {
  PersonalDetailsContainer,
  PersonalDetailsWrapper,
  DetailSection,
  DetailsContainer,
  InputWrapper,
} from 'styles/views/inviteAgentScreen/driverDetailsSection'
import { EditButtonWrapper } from 'styles/views/dashboard'

const PersonalDetails = () => {
  const { userInfo } = useContext(AppContext)
  const { mutateAsync } = usePost()

  const router = useHistory()

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(PERSONAL_DETAILS_SCHEMA),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  const submitData = async (data: any) => {
    const payload = {
      name: data?.name,
    }
    try {
      await mutateAsync({
        url: APIS.UPDATE_PROFILE,
        payload: payload,
      })
    } catch (error) {
      error
    }
  }

  const onHandleClick = () => {
    router.push(`${DashboardRoute.path}`)
  }

  useEffect(() => {
    setValue('name', userInfo?.name)
    setValue('email', userInfo?.email)
    setValue('phone', userInfo?.mobile ? userInfo?.mobile.replace('+91', '') : userInfo?.mobile)
  }, [userInfo])

  return (
    <PersonalDetailsContainer>
      <BackArrow />
      <PersonalDetailsWrapper onSubmit={handleSubmit(submitData)}>
        <DetailSection>
          <DetailsContainer>
            <InputWrapper error={errors?.name}>
              <Label>Name*</Label>
              <TextInput placeholder="Enter Name" control={control} name="name" error={errors?.name} />
              <ErrorMessage>{errors?.name?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper error={errors?.email}>
              <Label>Email*</Label>
              <TextInput placeholder="Enter Email" control={control} name="email" error={errors?.email} disabled />
              <ErrorMessage>{errors?.email?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper error={errors?.phone}>
              <Label>Mobile Number*</Label>
              <TextInput
                placeholder="Enter Mobile Number"
                type="number"
                control={control}
                name="phone"
                error={errors?.phone}
                disabled
              />
              <ErrorMessage>{errors?.phone?.message}</ErrorMessage>
            </InputWrapper>
          </DetailsContainer>
        </DetailSection>
        <EditButtonWrapper>
          <Button label="Cancel" variant="contained" className="cancel" onClick={onHandleClick} />
          <Button label="Save" variant="contained" type="submit" />
        </EditButtonWrapper>
      </PersonalDetailsWrapper>
    </PersonalDetailsContainer>
  )
}

export default PersonalDetails
