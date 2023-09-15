import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useLocation } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import zxcvbn from 'zxcvbn'
import { ChangePasswordRoute } from 'constants/routes'
import { VALIDATION_SCHEMA_CHANGE } from 'validations/loginValidation'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import Modal from 'components/Modal'
import { modalData } from 'views/successfulModal/data'
import SuccessfulModal from 'views/successfulModal'
import EyeIcon from 'assets/svg/EyeIcon'
import CloseEyeIcon from 'assets/svg/CloseEyeIcon'
import BackArrow from 'assets/svg/BackArrow'
import RadioButton from 'assets/svg/RadioButton'
import CheckedICon from 'assets/svg/CheckedICon'
import OndcLogo from 'assets/images/ondc_logo.png'
import { MobileLogoWrapper } from 'styles/views/signin'
import { IChangePassword } from 'interfaces/pages'
import {
  MainWrapper,
  ChangePasswordContainer,
  LoginContainer,
  LoginOptionsContainer,
  LoginTextDetail,
  ChangePasswordHeading,
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
  PasswordStrengthText,
  ErrorMessage,
  ValidationWrapper,
  SvgWrapper,
} from 'styles/views/signin'

const ChangePassword = () => {
  const [width, setWidth] = useState(0)
  const [successModal, setSuccessModal] = useState(false)
  const [passwordScore, setPasswordScore] = useState<any>()
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setNewShowPassword] = useState(false)
  const [showConPassword, setShowConPassword] = useState(false)
  const location = useLocation()
  const router = useHistory()
  const handleBack = () => {
    router.goBack()
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(VALIDATION_SCHEMA_CHANGE),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const submitData = async (payload: IChangePassword) => {
    payload
  }
  const password = watch('newPassword', '')
  const isLengthValid = password.length >= 8
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /\d/.test(password)

  useEffect(() => {
    const score = zxcvbn(password)
    setPasswordScore((score.score * 100) / 4)
  }, [password])

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  return (
    <MainWrapper>
      {location.pathname === `${ChangePasswordRoute.path}` && (
        <MobileLogoWrapper>
          <img src={OndcLogo} alt="OndcLogo" />
        </MobileLogoWrapper>
      )}
      <ChangePasswordContainer>
        <LoginContainer>
          {width <= 767 && (
            <SvgWrapper>
              <BackArrow onClick={handleBack} />
            </SvgWrapper>
          )}
          <LoginTextDetail>
            <ChangePasswordHeading>Change Password</ChangePasswordHeading>
          </LoginTextDetail>
        </LoginContainer>
        <LoginOptionsContainer>
          <LoginFormWrapper onSubmit={handleSubmit(submitData)}>
            <InputWrapper error={errors.currentPassword}>
              <Label>Current Password*</Label>
              <TextWrap>
                <TextInput
                  error={errors.currentPassword}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Current Password "
                  name="currentPassword"
                  control={control}
                />
                {showPassword ? (
                  <CloseEyeIcon onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <EyeIcon onClick={() => setShowPassword(!showPassword)} />
                )}
                <ErrorMessage>{errors?.currentPassword?.message}</ErrorMessage>
              </TextWrap>
            </InputWrapper>
            <InputWrapper error={errors.newPassword}>
              <Label>New Password*</Label>
              <TextWrap>
                <TextInput
                  error={errors.newPassword}
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter New Password "
                  name="newPassword"
                  control={control}
                />
                {showNewPassword ? (
                  <CloseEyeIcon onClick={() => setNewShowPassword(!showNewPassword)} />
                ) : (
                  <EyeIcon onClick={() => setNewShowPassword(!showNewPassword)} />
                )}
                <ErrorMessage>{errors?.newPassword?.message}</ErrorMessage>
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

            <Button type="submit" label="Update Password" variant="contained" className="pwd" />
          </LoginFormWrapper>
        </LoginOptionsContainer>
      </ChangePasswordContainer>
      <Modal isOpen={successModal}>
        <SuccessfulModal showModal={(value: boolean) => setSuccessModal(value)} modalData={modalData.passwordChange} />
      </Modal>
    </MainWrapper>
  )
}

export default ChangePassword
