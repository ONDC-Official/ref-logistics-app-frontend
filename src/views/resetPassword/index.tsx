import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import zxcvbn from 'zxcvbn'
import { yupResolver } from '@hookform/resolvers/yup'
import APIS from 'constants/api'
import usePost from 'hooks/usePost'
import { VALIDATION_SCHEMA_CREATE } from 'validations/loginValidation'
import Modal from 'components/Modal'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import SuccessfulModal from 'views/successfulModal'
import { modalData } from 'views/successfulModal/data'
import EyeIcon from 'assets/svg/EyeIcon'
import CloseEyeIcon from 'assets/svg/CloseEyeIcon'
import RadioButton from 'assets/svg/RadioButton'
import CheckedICon from 'assets/svg/CheckedICon'
import OndcLogo from 'assets/images/ondc_logo.png'
import { IResetPasswordData } from 'interfaces/views'
import {
  LoginRightSection,
  LoginContainer,
  LoginOptionsContainer,
  ResetTextDetail,
  LoginText,
  LogInSubText,
  LoginFormWrapper,
  TextWrap,
  TextWrapper,
  InputWrapper,
  Label,
  PasswordValidationWrapper,
  Progress,
  ProgressBar,
  ValidationText,
  ValidationCotainer,
  ValidationWrapper,
  PasswordStrengthText,
  MobileLogoWrapper,
  ErrorMessage,
} from 'styles/views/signin'

const ResetPasswordSection = () => {
  const [passwordScore, setPasswordScore] = useState<any>()
  const [showPassword, setShowPassword] = useState(false)
  const [showConPassword, setShowConPassword] = useState(false)
  const [successModal, setSuccessModal] = useState(false)

  const { mutateAsync } = usePost()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<IResetPasswordData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(VALIDATION_SCHEMA_CREATE),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const submitData = async (data: IResetPasswordData) => {
    const payload = {
      password: data.password,
      token: token,
    }

    try {
      const res = await mutateAsync({
        url: APIS.RESET_PASSWORD,
        payload: payload,
        config: {
          headers: {
            authorization: token,
          },
        },
      })

      if (res) {
        setSuccessModal(true)
      }
    } catch (err: any) {
      err
    }
  }

  const password = watch('password', '')
  const isLengthValid = password.length >= 8
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /\d/.test(password)

  useEffect(() => {
    const score = zxcvbn(password)
    setPasswordScore((score.score * 100) / 4)
  }, [password])

  useEffect(() => {
    localStorage.removeItem('accessToken')
  }, [])

  return (
    <>
      <LoginRightSection>
        <MobileLogoWrapper>
          <img src={OndcLogo} alt="OndcLogo" />
        </MobileLogoWrapper>
        <LoginContainer>
          <ResetTextDetail>
            <LoginText>Reset Your Password</LoginText>
            <LogInSubText>Please create new password!</LogInSubText>
          </ResetTextDetail>
        </LoginContainer>
        <LoginOptionsContainer>
          <LoginFormWrapper onSubmit={handleSubmit(submitData)}>
            <InputWrapper error={errors.password}>
              <Label>New Password*</Label>
              <TextWrap>
                <TextInput
                  error={errors.password}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter New Password "
                  name="password"
                  control={control}
                />
                {showPassword ? (
                  <CloseEyeIcon onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <EyeIcon onClick={() => setShowPassword(!showPassword)} />
                )}
                <ErrorMessage>{errors?.password?.message}</ErrorMessage>
              </TextWrap>
            </InputWrapper>
            <InputWrapper error={errors.confirmPassword}>
              <Label>Confirm Password*</Label>
              <TextWrapper>
                <TextInput
                  error={errors.confirmPassword}
                  type={showConPassword ? 'text' : 'password'}
                  placeholder="Confirm Password "
                  name="confirmPassword"
                  control={control}
                />
                {showConPassword ? (
                  <CloseEyeIcon onClick={() => setShowConPassword(!showConPassword)} />
                ) : (
                  <EyeIcon onClick={() => setShowConPassword(!showConPassword)} />
                )}
                <ErrorMessage>{errors?.confirmPassword?.message}</ErrorMessage>
              </TextWrapper>
            </InputWrapper>
            <PasswordValidationWrapper>
              <ProgressBar>
                <Progress width={passwordScore} />
              </ProgressBar>
              <PasswordStrengthText>Password Strength</PasswordStrengthText>
              <ValidationCotainer>
                <ValidationWrapper>
                  {isLengthValid ? <CheckedICon /> : <RadioButton />}
                  <ValidationText>Use 8 or more characters.</ValidationText>
                </ValidationWrapper>
                <ValidationWrapper>
                  {hasLetter ? <CheckedICon /> : <RadioButton />}
                  <ValidationText>Use a minimum of one letter.</ValidationText>
                </ValidationWrapper>
                <ValidationWrapper>
                  {hasNumber ? <CheckedICon /> : <RadioButton />}
                  <ValidationText>Use a minimum of one number.</ValidationText>
                </ValidationWrapper>
              </ValidationCotainer>
            </PasswordValidationWrapper>
            <Button type="submit" label="Reset Password" variant="contained" />
          </LoginFormWrapper>
        </LoginOptionsContainer>
      </LoginRightSection>

      <Modal isOpen={successModal}>
        <SuccessfulModal showModal={(value: boolean) => setSuccessModal(value)} modalData={modalData.passwordReset} />
      </Modal>
    </>
  )
}

export default ResetPasswordSection
