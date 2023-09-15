import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import APIS from 'constants/api'
import { InviteEmailRoute } from 'constants/routes'
import usePost from 'hooks/usePost'
import { AGENTDETAILSVALIDATION_SCHEMA } from 'validations/agentDetailsValidation'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import { inviteData } from 'views/inviteAdminSection/data'
import PlusIcon from 'assets/svg/PlusIcon'
import CrossIcon from 'assets/svg/CrossIcon'
import { IAdminsData, IFormValues } from 'interfaces/views'
import { ErrorMessage } from 'styles/views/signin'
import {
  InviteAdminMainSection,
  InviteHeading,
  InviteFormWrapper,
  BoxContainer,
  NameInputWrap,
  InputWrap,
  TextWrapper,
  Label,
  ButtonWrapper,
  SendButtonWrapper,
} from 'styles/views/inviteAdminSection'

const InviteAdminSection = () => {
  const [inviteList, setInviteList] = useState(inviteData)
  const router = useHistory()
  const { mutateAsync } = usePost()

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors: formErrors },
  } = useForm<IFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(AGENTDETAILSVALIDATION_SCHEMA),
  })

  const { fields, append, remove } = useFieldArray<IFormValues>({
    control,
    name: 'admins',
  })

  useEffect(() => {
    if (inviteList.length != 0) {
      append({ name: '', mobile: '', email: '' })
    }
  }, [inviteList])

  const submitData = async (payload: IAdminsData) => {
    const res = await mutateAsync({
      url: APIS.INVITE_ADMIN,
      payload: payload,
    })
    if (res) {
      reset()
      append({ name: '', mobile: '', email: '' })
      router.push(`${InviteEmailRoute.path}`)
    }
  }

  const handleAddMore = () => {
    setInviteList([...inviteList, { id: inviteList.length + 1 }])
  }

  const handleRemove = (id: number) => {
    remove(id)
  }

  return (
    <InviteAdminMainSection>
      <InviteHeading>Invite Admins</InviteHeading>
      <InviteFormWrapper onSubmit={handleSubmit(submitData)}>
        {fields.map((invite: any, index: number) => (
          <BoxContainer key={invite.id}>
            <NameInputWrap error>
              <Label>Name*</Label>
              <TextWrapper>
                <TextInput
                  error={formErrors?.admins?.[index]?.name}
                  type="text"
                  placeholder="Enter Name"
                  control={control}
                  name={`admins.${index}.name` as const} // Use a unique name for each input
                  className="name"
                />
                {formErrors.admins && formErrors.admins[index] ? (
                  <ErrorMessage>{formErrors?.admins?.[index]?.name?.message}</ErrorMessage>
                ) : (
                  <ErrorMessage />
                )}
              </TextWrapper>
            </NameInputWrap>
            <InputWrap error>
              <Label>Mobile Number*</Label>
              <TextWrapper>
                <TextInput
                  error={formErrors?.admins?.[index]?.mobile}
                  type="number"
                  placeholder="Enter Mobile Number"
                  control={control}
                  name={`admins.${index}.mobile` as const}
                  className="phone"
                />
                {formErrors.admins && formErrors.admins[index] ? (
                  <ErrorMessage>{formErrors?.admins?.[index]?.mobile?.message}</ErrorMessage>
                ) : (
                  <ErrorMessage />
                )}
              </TextWrapper>
            </InputWrap>
            <InputWrap error>
              <Label>Email*</Label>
              <TextWrapper>
                <TextInput
                  error={formErrors?.admins?.[index]?.email}
                  type="text"
                  placeholder="Enter Email"
                  control={control}
                  name={`admins.${index}.email` as const}
                  className="email"
                />

                {formErrors.admins && formErrors.admins[index] ? (
                  <ErrorMessage className="error">{formErrors?.admins?.[index]?.email?.message}</ErrorMessage>
                ) : (
                  <ErrorMessage />
                )}
              </TextWrapper>
            </InputWrap>
            {index !== 0 && <CrossIcon onClick={() => handleRemove(index)} />}
          </BoxContainer>
        ))}
        {fields.length !== 5 && (
          <ButtonWrapper>
            <Button type="button" label="Add More" variant="text" onClick={handleAddMore}>
              <PlusIcon />
            </Button>
          </ButtonWrapper>
        )}
        <SendButtonWrapper>
          <Button type="submit" label="Send Invite" variant="contained" />
        </SendButtonWrapper>
      </InviteFormWrapper>
    </InviteAdminMainSection>
  )
}

export default InviteAdminSection
