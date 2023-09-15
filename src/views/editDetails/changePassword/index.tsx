import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import zxcvbn from 'zxcvbn'
import { yupResolver } from '@hookform/resolvers/yup'
import usePost from 'hooks/usePost'
import APIS from 'constants/api'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import { VALIDATION_SCHEMA_CHANGE } from 'validations/loginValidation'
import EyeIcon from 'assets/svg/EyeIcon'
import CloseEyeIcon from 'assets/svg/CloseEyeIcon'
import RadioButton from 'assets/svg/RadioButton'
import CheckedICon from 'assets/svg/CheckedICon'
import { DashboardRoute } from 'constants/routes'

import {
  ChangePasswordWrapper,
  HeadingWrapper,
  PasswordContainer,
  LoginTextDetail,
  PasswordHeading,
  PasswordSubHeading,
  LoginFormWrapper,
  PasswordTextWrap,
  PasswordInputWrapper,
  Label,
  PasswordValidationWrapper,
  Progress,
  PasswordStrengthBar,
  ValidationText,
  ValidationCotainer,
  PasswordStrengthText,
  ErrorMessage,
  ValidationWrapper,
} from 'styles/views/signin'
import { EditButtonWrapper } from 'styles/views/dashboard'
import { PasswordWrapper } from 'styles/views/inviteAgentScreen/driverDetailsSection'

const ChangePassword = () => {
  const [passwordScore, setPasswordScore] = useState<any>()
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConPassword, setShowConPassword] = useState(false)
  const { mutateAsync } = usePost()

  const {
    handleSubmit,
    control,
    reset,
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

  const submitData = async (payload: any) => {
    const { currentPassword, newPassword } = payload
    reset()
    await mutateAsync({
      url: APIS.CHANGE_PASSWORD,
      payload: {
        currentPassword,
        newPassword,
      },
    })
  }
  const password = watch('newPassword', '')
  const isLengthValid = password.length >= 8
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /\d/.test(password)

  useEffect(() => {
    const score = zxcvbn(password)
    setPasswordScore((score.score * 100) / 4)
  }, [password])

  const router = useHistory()

  const onHandleClick = () => {
    router.push(`${DashboardRoute.path}`)
  }

  return (
    <ChangePasswordWrapper>
      <HeadingWrapper>
        <LoginTextDetail>
          <PasswordHeading>Your Password</PasswordHeading>
          <PasswordSubHeading>Modify your account&apos;s password for enhanced security.</PasswordSubHeading>
        </LoginTextDetail>
      </HeadingWrapper>
      <PasswordContainer>
        <LoginFormWrapper onSubmit={handleSubmit(submitData)}>
          <PasswordWrapper>
            <PasswordInputWrapper error={errors.currentPassword}>
              <Label>Current Password*</Label>
              <PasswordTextWrap>
                <TextInput
                  error={errors.currentPassword}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password "
                  name="currentPassword"
                  control={control}
                />
                {showPassword ? (
                  <CloseEyeIcon onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <EyeIcon onClick={() => setShowPassword(!showPassword)} />
                )}
                <ErrorMessage>{errors?.currentPassword?.message}</ErrorMessage>
              </PasswordTextWrap>
            </PasswordInputWrapper>
            <PasswordInputWrapper error={errors.newPassword}>
              <Label>New Password*</Label>
              <PasswordTextWrap>
                <TextInput
                  error={errors.newPassword}
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter Password "
                  name="newPassword"
                  control={control}
                />
                {showNewPassword ? (
                  <CloseEyeIcon onClick={() => setShowNewPassword(!showNewPassword)} />
                ) : (
                  <EyeIcon onClick={() => setShowNewPassword(!showNewPassword)} />
                )}
                <ErrorMessage>{errors?.newPassword?.message}</ErrorMessage>
              </PasswordTextWrap>
            </PasswordInputWrapper>
            <PasswordInputWrapper error={errors.confirmPassword}>
              <Label>Confirm Password*</Label>
              <PasswordTextWrap>
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
              </PasswordTextWrap>
            </PasswordInputWrapper>
            <PasswordValidationWrapper>
              <PasswordStrengthBar>
                <Progress width={passwordScore} />
              </PasswordStrengthBar>
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
          </PasswordWrapper>
          <EditButtonWrapper>
            <Button label="Cancel" variant="contained" className="cancel" onClick={onHandleClick} />
            <Button label="Save" variant="contained" />
          </EditButtonWrapper>
        </LoginFormWrapper>
      </PasswordContainer>
    </ChangePasswordWrapper>
  )
}

export default ChangePassword
