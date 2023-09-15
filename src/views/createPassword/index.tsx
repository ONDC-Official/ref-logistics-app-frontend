import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import zxcvbn from 'zxcvbn'
import APIS from 'constants/api'
import usePost from 'hooks/usePost'
import useGet from 'hooks/useGet'
import { VALIDATION_SCHEMA_CREATE } from 'validations/loginValidation'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import Modal from 'components/Modal'
import { modalData } from 'views/successfulModal/data'
import SuccessfulModal from 'views/successfulModal'
import RadioButton from 'assets/svg/RadioButton'
import CheckedICon from 'assets/svg/CheckedICon'
import EyeIcon from 'assets/svg/EyeIcon'
import CloseEyeIcon from 'assets/svg/CloseEyeIcon'
import OndcLogo from 'assets/images/ondc_logo.png'
import {
  RightSection,
  LoginContainer,
  LoginOptionsContainer,
  LoginTextDetail,
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

const CreatePasswordSection = () => {
  const [passwordScore, setPasswordScore] = useState<any>()
  const [successModal, setSuccessModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConPassword, setShowConPassword] = useState(false)
  const data: { token?: string } = useParams()

  const { mutateAsync } = usePost()
  const { refetch: fetchData } = useGet('admin-verify', `/v1/auth/verifyInviteLink/${data?.token}`)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const ref1 = useRef(null)
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(VALIDATION_SCHEMA_CREATE),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const submitData = async (payload: { password: string }) => {
    const { password } = payload
    reset()
    if (payload) {
      const res = await mutateAsync({
        url: APIS.CREATE_PASSWORD,
        payload: {
          userId: data?.token,
          password: password,
        },
      })
      if (res) {
        setSuccessModal(true)
      }
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

  return (
    <>
      <RightSection>
        <MobileLogoWrapper>
          <img src={OndcLogo} alt="OndcLogo" />
        </MobileLogoWrapper>
        <LoginContainer>
          <LoginTextDetail>
            <LoginText>Create Password</LoginText>
            <LogInSubText>Generate a strong and secure password for your account.</LogInSubText>
          </LoginTextDetail>
        </LoginContainer>
        <LoginOptionsContainer>
          <LoginFormWrapper onSubmit={handleSubmit(submitData)}>
            <InputWrapper error={errors.password}>
              <Label>New Password*</Label>
              <TextWrap>
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
              </TextWrap>
            </InputWrapper>
            <InputWrapper error={errors.confirmPassword}>
              <Label>Confirm Password*</Label>
              <TextWrapper>
                <TextInput
                  error={errors.confirmPassword}
                  type={showConPassword ? 'text' : 'password'}
                  placeholder="Enter Password "
                  name="confirmPassword"
                  control={control}
                />
                {showConPassword ? (
                  <CloseEyeIcon onClick={() => setShowConPassword(!showConPassword)} />
                ) : (
                  <EyeIcon onClick={() => setShowConPassword(!showConPassword)} />
                )}
                {errors.confirmPassword ? (
                  <ErrorMessage>{errors?.confirmPassword?.message}</ErrorMessage>
                ) : (
                  <ErrorMessage />
                )}
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

            <Button type="submit" label="Create Password" variant="contained" ref={ref1} />
          </LoginFormWrapper>
        </LoginOptionsContainer>
      </RightSection>
      <Modal isOpen={successModal}>
        <SuccessfulModal showModal={(value: boolean) => setSuccessModal(value)} modalData={modalData.accountCreate} />
      </Modal>
    </>
  )
}

export default CreatePasswordSection
