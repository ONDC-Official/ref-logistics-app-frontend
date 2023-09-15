import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Radio } from 'antd'
import usePost from 'hooks/usePost'
import APIS from 'constants/api'
import { ACTION_SCHEMA } from 'validations/driverDetails'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import CloseIcon from 'assets/svg/CloseIcon'
import { ErrorMessage, TextWrapper } from 'styles/views/signin'

import {
  ModalContainer,
  HeadingContainer,
  HeadingWrapper,
  FormWrapper,
  ActionFormContainer,
  RadioWrapper,
  Label,
  ActionButtonWrapper,
} from 'styles/views/successfulModal'
import { InputWrapper } from 'styles/views/inviteAgentScreen/agentDetailSection'

export interface IIssueModal {
  shortDescription?: string
  longDescription?: string
  actionTriggered?: string
  refundAmount?: string
}
export interface IModalProps {
  showModal(value: boolean): void
  id?: string
  getIssues: () => void
}

const ActionModal = ({ showModal, id, getIssues }: IModalProps) => {
  const [updateValue, setUpdateValue] = useState('')

  const { mutateAsync } = usePost()
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(ACTION_SCHEMA),
  })

  const submitData = async (data: IIssueModal) => {
    const payload = {
      action_triggered: data?.actionTriggered,
      short_desc: data?.shortDescription,
      refundAmount: data?.refundAmount,
      long_desc: data?.longDescription,
    }

    const res = await mutateAsync({
      url: `${APIS.UPDATE_ISSUE}/${id}`,
      payload: payload,
    })
    showModal(false)
    if (res) {
      getIssues()
    }
  }

  return (
    <ModalContainer>
      <HeadingContainer>
        <HeadingWrapper>Take Action</HeadingWrapper>
        <CloseIcon onClick={() => showModal(false)} />
      </HeadingContainer>
      <FormWrapper onSubmit={handleSubmit(submitData)}>
        <ActionFormContainer>
          <RadioWrapper>
            <Controller
              name="actionTriggered"
              control={control}
              render={({ field }) => (
                <Radio.Group
                  onChange={(e) => {
                    field.onChange(e.target.value)
                    setUpdateValue(e.target.value)
                    setValue('shortDescription', '')
                    setValue('longDescription', '')
                    setValue('refundAmount', '')
                  }}
                  value={field.value}
                >
                  <Radio value="NO-ACTION">No Action</Radio>
                  <Radio value="CANCEL">Cancel</Radio>
                  <Radio value="REFUND">Refund</Radio>
                </Radio.Group>
              )}
            />
          </RadioWrapper>
          <InputWrapper error={false}>
            <Label>Short Description*</Label>
            <TextWrapper>
              <TextInput placeholder="Enter Description" control={control} name="shortDescription" />
              <ErrorMessage>{errors?.shortDescription?.message}</ErrorMessage>
            </TextWrapper>
          </InputWrapper>
          {updateValue !== 'REFUND' ? (
            <>
              <InputWrapper error={false}>
                <Label>Long Description</Label>
                <TextWrapper>
                  <TextInput placeholder="Enter Description" control={control} name="longDescription" />
                  <ErrorMessage>{errors?.longDescription?.message}</ErrorMessage>
                </TextWrapper>
              </InputWrapper>
            </>
          ) : (
            <>
              <InputWrapper error={false}>
                <Label>Refund Amount</Label>
                <TextWrapper>
                  <TextInput placeholder="Enter Amount" control={control} name="refundAmount" />
                  <ErrorMessage>{errors?.refundAmount?.message}</ErrorMessage>
                </TextWrapper>
              </InputWrapper>
            </>
          )}
        </ActionFormContainer>
        <ActionButtonWrapper>
          <Button label="Cancel" variant="contained" className="cancel" onClick={() => showModal(false)} />
          <Button label="Submit" variant="contained" type="submit" />
        </ActionButtonWrapper>
      </FormWrapper>
    </ModalContainer>
  )
}

export default ActionModal
