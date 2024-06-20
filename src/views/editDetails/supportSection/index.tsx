import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AppContext } from 'context/payloadContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SUPPORT_SCHEMA } from 'validations/supportSchema'
import usePost from 'hooks/usePost'
import APIS from 'constants/api'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import { DashboardRoute } from 'constants/routes'
import { EditButtonWrapper } from 'styles/views/dashboard'
import { MainWrapper, FormWrapper, SupportWrapper, DetailsWrapper, InputWrapper } from 'styles/views/editDetails'
import { ErrorMessage, Label } from 'styles/views/signin'

const Support = () => {
  const { userInfo } = useContext(AppContext)
  const { mutateAsync } = usePost()
  const router = useHistory()

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(SUPPORT_SCHEMA),
    defaultValues: {
      phone: '',
      email: '',
      uri: '',
    },
  })
  useEffect(() => {
    setValue('uri', userInfo?.supportDetails[0]?.uri)
    setValue('email', userInfo?.supportDetails[0]?.email)
    setValue('phone', userInfo?.supportDetails[0]?.phone)
  }, [userInfo])

  const submitData = async (data: any) => {
    const payload = {
      phone: data?.phone,
      email: data?.email,
      uri: data?.uri,
    }
    try {
      await mutateAsync({
        url: APIS.UPDATE_SUPPORT,
        payload: payload,
      })
    } catch (error) {
      error
    }
  }

  const onHandleClick = () => {
    router.push(`${DashboardRoute.path}`)
  }

  return (
    <MainWrapper>
      <FormWrapper onSubmit={handleSubmit(submitData)}>
        <SupportWrapper>
          <DetailsWrapper>
            <InputWrapper error={errors?.phone}>
              <Label>Mobile Number*</Label>
              <TextInput
                placeholder="Enter Mobile Number"
                type="number"
                control={control}
                name="phone"
                error={errors?.phone}
              />
              <ErrorMessage>{errors?.phone?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper error={errors?.email}>
              <Label>Email*</Label>
              <TextInput placeholder="Enter Email" control={control} name="email" error={errors?.email} />
              <ErrorMessage>{errors?.email?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper error={errors?.uri}>
              <Label>URI*</Label>
              <TextInput placeholder="Enter URI" control={control} name="uri" error={errors?.uri} />
              <ErrorMessage>{errors?.uri?.message}</ErrorMessage>
            </InputWrapper>
          </DetailsWrapper>
        </SupportWrapper>
        <EditButtonWrapper>
          <Button label="Cancel" variant="contained" className="cancel" onClick={onHandleClick} />
          <Button label="Save" type="submit" variant="contained" />
        </EditButtonWrapper>
      </FormWrapper>
    </MainWrapper>
  )
}

export default Support
