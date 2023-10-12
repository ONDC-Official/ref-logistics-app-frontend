// import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// import { Radio } from 'antd'
import usePost from 'hooks/usePost'
import APIS from 'constants/api'
import { PIN_ACTION_SCHEMA } from 'validations/agentDetailsValidation'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import { IHubActionModalProps } from 'interfaces/views'

import CloseIcon from 'assets/svg/CloseIcon'
import { ErrorMessage, TextWrapper } from 'styles/views/signin'

import {
  ModalContainer,
  HeadingContainer,
  HeadingWrapper,
  FormWrapper,
  ActionFormContainer,
  //   RadioWrapper,
  Label,
  ActionButtonWrapper,
} from 'styles/views/successfulModal'
import { InputWrapper } from 'styles/views/inviteAgentScreen/agentDetailSection'

const AddPinModal = ({ showModal, id, singleHubDetail, getHubDetails }: IHubActionModalProps) => {
  //   const [updateValue, setUpdateValue] = useState('')

  const pin = singleHubDetail?.data?.serviceablePincode

  const { mutateAsync } = usePost()
  const {
    handleSubmit,
    control,
    formState: { errors },
    // setValue,
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(PIN_ACTION_SCHEMA),
  })

  const submitData = async (data: any) => {
    const { pincode } = data
    const res = await mutateAsync({
      url: `${APIS.UPDATE_HUB}/${id}`,
      //   ...singleHubDetail,
      payload: {
        serviceablePincode: [...pin, pincode],
      },
    })
    showModal(false)
    if (res) {
      getHubDetails()
    }
  }

  return (
    <ModalContainer>
      <HeadingContainer>
        <HeadingWrapper>Add Pincode</HeadingWrapper>
        <CloseIcon onClick={() => showModal(false)} />
      </HeadingContainer>
      <FormWrapper onSubmit={handleSubmit(submitData)}>
        <ActionFormContainer>
          <InputWrapper error={errors.pincode}>
            <Label>Pincode</Label>
            <TextWrapper>
              <TextInput placeholder="Enter Pincode" control={control} name="pincode" type="number" maxLength={6} />
              <ErrorMessage>{errors?.pincode?.message}</ErrorMessage>
            </TextWrapper>
          </InputWrapper>
        </ActionFormContainer>
        <ActionButtonWrapper>
          <Button label="Cancel" variant="contained" className="cancel" onClick={() => showModal(false)} />
          <Button label="Submit" variant="contained" type="submit" />
        </ActionButtonWrapper>
      </FormWrapper>
    </ModalContainer>
  )
}

export default AddPinModal
