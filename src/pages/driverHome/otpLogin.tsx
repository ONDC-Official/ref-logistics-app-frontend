import { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import usePost from 'hooks/usePost'
import { IDataProps, IItemProps } from 'interfaces'
import { HomeRoutes } from 'constants/routes'
import APIS from 'constants/api'
import { inputsFields } from 'pages/driverHome/inputData'
import { OTP_LOGIN_VALIDATION } from 'validations/driverDetails'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import OndcLogo from 'assets/images/ondc_logo.png'
import {
  DriverLoginContainer,
  OtpTextDetail,
  LoginText,
  LogInSubText,
  ErrorMessage,
  DriverMobileLogoWrapper,
} from 'styles/views/signin'
import {
  DriverMainWrapper,
  FormWrapper,
  OtpContainer,
  OtpWrapper,
  ButtonWrapper,
  ResendText,
  ExpiredOtp,
} from 'styles/views/driverFlowHome'

const OTPLogin = () => {
  const [countdown, setCountdown] = useState(59) // Set initial countdown time in seconds
  const [isActive, setIsActive] = useState(true)
  const router = useHistory()
  const location = useLocation<any>()
  const driverNumber = location?.state?.payload
  const { mutateAsync } = usePost()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(OTP_LOGIN_VALIDATION),
    defaultValues: {
      otp0: '',
      otp1: '',
      otp2: '',
      otp3: '',
    },
  })

  const submitData = async (data: IDataProps) => {
    // Concatenating the OTP values into a single string
    const new_data = { otp: data['otp0'] + data['otp1'] + data['otp2'] + data['otp3'] }
    const payload = {
      // Using the extracted driver number
      mobile: driverNumber?.mobile,
      otp: new_data?.otp,
    }
    const res = await mutateAsync({
      url: APIS.DRIVER_LOGIN_OTP,
      payload: payload,
    })

    if (res?.data?.token) {
      localStorage.setItem('accessToken', res.data.token)
      // Redirecting to the home page after successful login
      router.push(HomeRoutes.path)
      window.location.reload()
    }
  }

  useEffect(() => {
    let countdownTimer: string | number | NodeJS.Timeout | undefined

    if (isActive) {
      countdownTimer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 0) {
            return prevCountdown - 1
          } else {
            clearInterval(countdownTimer)
            setIsActive(false)
            return 0
          }
        })
      }, 1000)
    }

    return () => clearInterval(countdownTimer)
  }, [isActive])

  // Function to format the countdown in minutes and seconds
  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60)
    const seconds = countdown % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  // Function to handle the resend click event
  const handleResendClick = () => {
    if (!isActive) {
      setCountdown(59)
      setIsActive(true)
    }
  }

  useEffect(() => {
    const fields: NodeListOf<HTMLInputElement> = document.querySelectorAll('.field')

    // Setting The focus on the first OTP field
    fields[0].focus()

    fields?.forEach((field: HTMLInputElement | null, index: number) => {
      // aAdding EventListener Here
      field?.addEventListener('keydown', (e: any) => {
        // Check if the pressed key is a number key between(0-9)
        if (e?.key >= 0 && e?.key <= 9) {
          // Clearing the current OTP field
          fields[index].value = ''
          // Setting focus on the next OTP field after a slight delay of 10 milliseconds(The delay allows the browser to update the DOM before setting the focus, ensuring a smooth user experience)
          setTimeout(() => fields[index + 1]?.focus(), 10)
        } else if (e?.key === 'Backspace') {
          // Setting focus on the previous OTP field after a slight delay of 10 milliseconds
          setTimeout(() => fields[index - 1]?.focus(), 10)
        }
      })
    })
  }, [])

  return (
    <DriverMainWrapper>
      <DriverMobileLogoWrapper>
        <img src={OndcLogo} alt="ONDC" />
      </DriverMobileLogoWrapper>
      <DriverLoginContainer>
        <OtpTextDetail>
          <LoginText>Enter OTP</LoginText>
          <LogInSubText>Please enter the OTP sent on your mobile number.</LogInSubText>
        </OtpTextDetail>
        <FormWrapper onSubmit={handleSubmit(submitData)}>
          <OtpContainer>
            <OtpWrapper>
              {inputsFields?.map((item: IItemProps, index: number) => {
                return (
                  <TextInput
                    key={index}
                    type="number"
                    placeholder={item?.placeholder}
                    control={control}
                    name={item?.name}
                    className="field"
                  />
                )
              })}
            </OtpWrapper>
            {errors?.otp0 || errors?.otp1 || errors?.otp2 || errors?.otp3 ? (
              <ErrorMessage>{'Please enter OTP'}</ErrorMessage>
            ) : null}
          </OtpContainer>

          <ButtonWrapper>
            <Button label="Login" variant="contained" type="submit" />
            <ResendText>
              {isActive ? (
                <span>
                  Resend OTP In <span>{formatCountdown()}</span>
                </span>
              ) : (
                <ExpiredOtp>
                  OTP has been expired <span onClick={handleResendClick}>Resend</span>
                </ExpiredOtp>
              )}
            </ResendText>
          </ButtonWrapper>
        </FormWrapper>
      </DriverLoginContainer>
    </DriverMainWrapper>
  )
}

export default OTPLogin
