import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import APIS from 'constants/api'
import { OTPLoginRoute } from 'constants/routes'
import usePost from 'hooks/usePost'
import { DRIVER_LOGIN_VALIDATION_SCHEMA } from 'validations/loginValidation'
import { IPayloadData, Props } from 'interfaces/pages'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import OndcLogo from 'assets/images/ondc_logo.png'
import { DriverMainWrapper } from 'styles/views/driverFlowHome'
import {
  DriverMobileLogoWrapper,
  DriverLoginContainer,
  LoginTextDetail,
  LoginText,
  LogInSubText,
  LoginFormWrapper,
  TextWrapper,
  ErrorMessage,
  InputWrapper,
  Label,
} from 'styles/views/signin'

const DriverLogin: React.FC<Props> = () => {
  const history = useHistory()
  const { mutateAsync } = usePost()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IPayloadData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(DRIVER_LOGIN_VALIDATION_SCHEMA),
    defaultValues: {
      mobile: '',
    },
  })
  const submitData = async (data: IPayloadData) => {
    const payload = data
    const res = await mutateAsync({
      url: APIS.DRIVER_LOGIN,
      payload: payload,
    })

    if (res?.exist) {
      localStorage.setItem('online', 'false')

      history.push({
        pathname: OTPLoginRoute.path,
        state: { payload },
      })
    }
  }

  useEffect(() => {
    if (window.innerWidth >= 500) {
      toast.info('For better experience switch to mobile view or open this link in Mobile.')
    }
  }, [])

  return (
    <>
      <DriverMainWrapper>
        <DriverMobileLogoWrapper>
          <img src={OndcLogo} alt="OndcLogo" />
        </DriverMobileLogoWrapper>
        <DriverLoginContainer>
          <LoginTextDetail>
            <LoginText>Log In</LoginText>
            <LogInSubText>Please enter your registered mobile number below.</LogInSubText>
          </LoginTextDetail>
          <LoginFormWrapper onSubmit={handleSubmit(submitData)}>
            <InputWrapper error={errors.mobile}>
              <Label>Mobile Number*</Label>
              <TextWrapper>
                <TextInput
                  placeholder="Enter Mobile Number"
                  control={control}
                  name="mobile"
                  error={errors.mobile}
                  type="number"
                />
                <ErrorMessage>{errors?.mobile?.message}</ErrorMessage>
              </TextWrapper>
            </InputWrapper>

            <Button type="submit" label="Continue" variant="contained" />
          </LoginFormWrapper>
        </DriverLoginContainer>
      </DriverMainWrapper>
    </>
  )
}

export default DriverLogin
