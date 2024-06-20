import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import usePost from 'hooks/usePost'
import APIS from 'constants/api'
import { IPayloadData } from 'interfaces/views'
import { VALIDATION_SCHEMA_EMAIL } from 'validations/loginValidation'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import ForgotEmailSent from 'pages/forgotEmailSent'
import OndcLogo from 'assets/images/ondc_logo.png'
import {
  RightSection,
  LoginContainer,
  LoginOptionsContainer,
  LoginTextDetail,
  LoginText,
  LogInSubText,
  MainLoginFormWrapper,
  TextWrapper,
  InputWrapper,
  Label,
  MobileLogoWrapper,
  ErrorMessage,
} from 'styles/views/signin'

const ForgotPasswordSection = () => {
  const [emailSent, setEmailSent] = useState<boolean>(false)
  const { mutateAsync } = usePost()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(VALIDATION_SCHEMA_EMAIL),
    defaultValues: {
      email: '',
    },
  })

  const submitData = async (data: IPayloadData) => {
    const payload = data
    try {
      const response = await mutateAsync({
        url: APIS.FORGOT_PASSWORD,
        payload: payload,
      })
      if (response.message === 'Password reset link sent on email') {
        setEmailSent(true)
      }
    } catch (err) {
      err
    }
  }

  return (
    <>
      {!emailSent ? (
        <RightSection>
          <MobileLogoWrapper>
            <img src={OndcLogo} alt="OndcLogo" />
          </MobileLogoWrapper>

          <LoginContainer>
            <LoginTextDetail>
              <LoginText>Forgot Password?</LoginText>
              <LogInSubText>Please enter your registered email below</LogInSubText>
            </LoginTextDetail>
            <LoginOptionsContainer>
              <MainLoginFormWrapper onSubmit={handleSubmit(submitData)}>
                <InputWrapper error={errors.email}>
                  <Label>Email*</Label>
                  <TextWrapper>
                    <TextInput
                      error={errors.email}
                      type="text"
                      placeholder="Enter Email "
                      control={control}
                      name="email"
                    />
                    <ErrorMessage>{errors?.email?.message}</ErrorMessage>
                  </TextWrapper>
                </InputWrapper>

                <Button type="submit" label="Submit" variant="contained" />
              </MainLoginFormWrapper>
            </LoginOptionsContainer>
          </LoginContainer>
        </RightSection>
      ) : (
        <ForgotEmailSent />
      )}
    </>
  )
}

export default ForgotPasswordSection
