import React, { useEffect, useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import APIS from 'constants/api'
import { ForgotPasswordRoute, InviteScreenRoute } from 'constants/routes'
import ROLES from 'constants/role'
import usePost from 'hooks/usePost'
import { VALIDATION_SCHEMA } from 'validations/loginValidation'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import { ILoginData } from 'interfaces/views'
import OndcLogo from 'assets/images/ondc_logo.png'
import LoginImage from 'assets/images/login_image.png'
import EyeIcon from 'assets/svg/EyeIcon'
import CloseEyeIcon from 'assets/svg/CloseEyeIcon'
const { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } = require('react-simple-captcha')
import {
  LoginMainContainer,
  LeftSection,
  MobileLogoWrapper,
  LogoWrapper,
  LoginRightSection,
  WecomeInformation,
  ImageWrap,
  WelComeTextInfo,
  WelcomeHeading,
  WelcomeDetail,
  LoginContainer,
  LoginOptionsContainer,
  LoginTextDetail,
  LoginText,
  LogInSubText,
  MainLoginFormWrapper,
  TextWrapper,
  PasswordTextWrapper,
  ErrorMessage,
  InputWrapper,
  Label,
  ForgotText,
} from 'styles/views/signin'

export interface Props {
  history: RouteComponentProps['history']
}

const Login: React.FC<Props> = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useHistory()

  const { mutateAsync } = usePost()
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ILoginData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(VALIDATION_SCHEMA),
    defaultValues: {
      email: '',
      password: '',
      captcha: '',
    },
  })
  const submitData = async (data: ILoginData) => {
    if (validateCaptcha(data?.captcha) === true) {
      delete data.captcha
    } else {
      toast.error('Invalid Captcha')
      reset({
        email: data?.email,
        password: data?.password,
        captcha: '',
      })
      return
    }

    try {
      const payload = data
      const res = await mutateAsync({
        url: APIS.LOG_IN,
        payload: payload,
      })

      if (res) {
        const checkRole = res.data.currentUser.role?.name
        const checkEnable = res.data.currentUser.enabled
        await localStorage.setItem('accessToken', res.data.token)
        reset()

        if (checkEnable && [ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(checkRole)) {
          router.push(InviteScreenRoute.path)
        }

        window.location.reload()
      }
    } catch (error) {
      validateCaptcha()
      reset({
        email: data?.email,
        password: data?.password,
        captcha: '',
      })
    }
  }

  const navigateToAbout = () => {
    router.push(`${ForgotPasswordRoute.path}`)
  }

  useEffect(() => {
    localStorage.clear()
  }, [])

  useEffect(() => {
    // Assuming loadCaptchaEnginge is a function you've defined or imported
    loadCaptchaEnginge(6)
  }, [])

  return (
    <>
      <LoginMainContainer>
        <LeftSection>
          <LogoWrapper>
            <img src={OndcLogo} alt="OndcLogo" />
          </LogoWrapper>
          <WecomeInformation>
            <ImageWrap>
              <img src={LoginImage} alt="LoginImage" />
            </ImageWrap>
            <WelComeTextInfo>
              <WelcomeHeading>Welcome back!</WelcomeHeading>
              <WelcomeDetail>
                Your Ultimate Logistics Solution! Streamline and optimize your logistics operations with ease.
              </WelcomeDetail>
            </WelComeTextInfo>
          </WecomeInformation>
        </LeftSection>

        <LoginRightSection>
          <MobileLogoWrapper>
            <img src={OndcLogo} alt="OndcLogo" />
          </MobileLogoWrapper>
          <LoginContainer>
            <LoginTextDetail>
              <LoginText>Log In</LoginText>
              <LogInSubText>Please enter your registered email below.</LogInSubText>
            </LoginTextDetail>
          </LoginContainer>
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
                  {errors.email ? <ErrorMessage>{errors?.email?.message}</ErrorMessage> : <ErrorMessage />}
                </TextWrapper>
              </InputWrapper>
              <InputWrapper error={errors.password}>
                <Label>Password*</Label>
                <PasswordTextWrapper>
                  <TextInput
                    error={errors.password}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter Password "
                    name="password"
                    control={control}
                  />
                  {showPassword ? (
                    <CloseEyeIcon onClick={() => setShowPassword(!showPassword)} />
                  ) : (
                    <EyeIcon onClick={() => setShowPassword(!showPassword)} />
                  )}
                  <ErrorMessage>{errors?.password?.message}</ErrorMessage>
                </PasswordTextWrapper>
              </InputWrapper>
              <div className="form-group">
                <div className="">
                  <div className="captcha-container">
                    <LoadCanvasTemplate reloadText="Reload My Captcha" reloadColor="#196AAB" />
                  </div>
                  <div className="input-block">
                    <TextWrapper>
                      <TextInput
                        error={errors.captcha}
                        type={'text'}
                        placeholder="Enter Captcha "
                        name="captcha"
                        control={control}
                      />
                      <ErrorMessage>{errors?.captcha?.message}</ErrorMessage>
                    </TextWrapper>
                  </div>
                </div>
              </div>

              <ForgotText>
                <span onClick={navigateToAbout}> Forgot password?</span>
              </ForgotText>
              <Button type="submit" label="Login" variant="contained" />
            </MainLoginFormWrapper>
          </LoginOptionsContainer>
        </LoginRightSection>
      </LoginMainContainer>
    </>
  )
}

export default Login
