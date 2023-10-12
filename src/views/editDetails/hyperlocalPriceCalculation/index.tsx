import { useContext, useEffect, useState } from 'react'
import { Switch } from 'antd'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import usePost from 'hooks/usePost'
import APIS from 'constants/api'
import { DashboardRoute } from 'constants/routes'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import { HYPERLOCAL_PRICE_CALCULATION_SCHEMA } from 'validations/priceCalculationValidation'
import {
  MainWrapper,
  HeadingWrapper,
  MainHeading,
  SubHeading,
  FormWrapper,
  PriceSettingsWrapper,
  InputWrapper,
  // ChargesInputWrapper,
} from 'styles/views/editDetails'
import { ChargeLabel, ErrorMessage, Label } from 'styles/views/signin'
import { EditButtonWrapper } from 'styles/views/dashboard'
import useGet from 'hooks/useGet'
import { SwitchStatusWrapper, SwitchWrapper } from 'styles/views/driverFlowHome'
import { AppContext } from 'context/payloadContext'

interface DashboardDetails {
  admins: {
    onlineDriversCount: number
  }
}

const HyperlocalPriceCalculation = () => {
  const { sse } = useContext(AppContext)
  const { mutateAsync } = usePost()

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(HYPERLOCAL_PRICE_CALCULATION_SCHEMA),
    defaultValues: {
      basePrice: '',
      additional_charges: '',
      cgst_sgst: '',
    },
  })

  const { refetch: getDashboard, data: dashboardDetails } = useGet('get-dashboard', `${APIS.USERS_DASHBOARD}`)

  useEffect(() => {
    getDashboard()
  }, [sse])

  const totalOnlineDriver = dashboardDetails?.admins.onlineDriversCount || 0

  const [switchState, setSwitchState] = useState(totalOnlineDriver > 0)

  const { refetch: fetchHyperLocalPrice, data: hyperLocalPrice } = useGet(
    'get-hyperLocalPrice',
    `${APIS.GET_PRICE_CALCULATION}`,
  )

  const hyperPrice = hyperLocalPrice?.data[0]?.hyper_local
  const hyperid = hyperLocalPrice?.data[0]?._id

  useEffect(() => {
    setValue('basePrice', hyperPrice?.basePrice)
    setValue('additional_charges', hyperPrice?.additional_charges)
    setValue('cgst_sgst', hyperPrice?.cgst_sgst)
  }, [hyperLocalPrice])

  useEffect(() => {
    fetchHyperLocalPrice()
  }, [fetchHyperLocalPrice])

  const submitData = async (data: any) => {
    const payload = {
      hyper_local: {
        basePrice: data?.basePrice,
        additional_charges: data?.additional_charges,
        cgst_sgst: data?.cgst_sgst,
      },
    }

    try {
      // const res =
      await mutateAsync({
        url: `${APIS.UPDATE_PRICE_CALCULATION}/${hyperid}`,
        payload: payload,
      })
    } catch (err) {
      err
    }
  }
  const router = useHistory()

  const onHandleClick = () => {
    router.push(`${DashboardRoute.path}`)
  }

  const handleChange = async () => {
    const newSwitchState = !switchState

    await mutateAsync({
      url: `${APIS.UPDATE_AGENT_TOGGLE_STATUS}`,
      payload: {
        status: newSwitchState,
      },
    })

    if (!newSwitchState) {
      dashboardDetails.admins.onlineDriversCount = 0
    }

    // Update the switch state
    setSwitchState(newSwitchState)
  }

  return (
    <MainWrapper>
      <SwitchStatusWrapper>
        <Label>Mark All Drivers</Label>
        <SwitchWrapper>
          <Switch checked={switchState} onChange={handleChange} />
          {switchState ? <span>Online</span> : <span>Offline</span>}
        </SwitchWrapper>
      </SwitchStatusWrapper>
      <HeadingWrapper>
        <MainHeading>Price Calculations for Hyperlocal</MainHeading>
        <SubHeading>Automated pricing computation for accurate cost estimation.</SubHeading>
      </HeadingWrapper>
      <FormWrapper onSubmit={handleSubmit(submitData)}>
        <PriceSettingsWrapper>
          <InputWrapper error={errors.basePrice}>
            <Label>Base Price*</Label>
            <TextInput
              type="number"
              placeholder="Enter Base Price"
              control={control}
              name="basePrice"
              error={errors.basePrice}
              // maxLength={2}
              className="price"
            />

            <ErrorMessage>{errors?.basePrice?.message}</ErrorMessage>
          </InputWrapper>
          <InputWrapper error={errors.additional_charges}>
            <Label>Additional Charges (Price per kilometer) *</Label>
            <TextInput
              type="number"
              placeholder="Enter additional charges"
              control={control}
              name="additional_charges"
              error={errors.additional_charges}
              // maxLength={2}
              className="price"
            />
            <ErrorMessage>{errors?.additional_charges?.message}</ErrorMessage>
          </InputWrapper>
          <InputWrapper error={errors.cgst_sgst}>
            <ChargeLabel>CGST & SGST (%) *</ChargeLabel>
            <TextInput
              type="number"
              placeholder="Enter CGST & SGST"
              control={control}
              name="cgst_sgst"
              error={errors.cgst_sgst}
              // maxLength={2}
              className="price"
            />
            <ErrorMessage>{errors?.cgst_sgst?.message}</ErrorMessage>
          </InputWrapper>
        </PriceSettingsWrapper>
        <EditButtonWrapper>
          <Button label="Cancel" variant="contained" className="cancel" onClick={onHandleClick} />
          <Button label="Save" type="submit" variant="contained" />
        </EditButtonWrapper>
      </FormWrapper>
    </MainWrapper>
  )
}

export default HyperlocalPriceCalculation
