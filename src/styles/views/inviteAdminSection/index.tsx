import styled from 'styled-components'
import { InputWrapper } from 'styles/views/signin'
import { theme } from 'styles/theme'

export const InviteAdminMainSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 35px;
  max-width: 652px;
  @media (max-width: 1068px) {
    gap: 20px;
  }
`
export const InviteHeading = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const InviteFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`
export const InviteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 511px;
  overflow-y: auto;
`
export const NameInputWrap = styled(InputWrapper)`
  width: 145px;
  min-height: 109px;
  .name {
    width: 145px;
  }
`
export const InputWrap = styled(InputWrapper)`
  gap: 0px;
  min-height: 109px;

  .email {
    width: 247px;
  }
  .phone {
    width: 190px;
  }
`
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 70px;
  .error {
    width: 100%;
    max-width: 247px;
  }
`
export const Label = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${theme.PRIMARYBLACKCOLOR};
  padding-bottom: 4px;
`
export const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 13px;
  svg {
    cursor: pointer;
  }
`
export const ButtonWrapper = styled.div`
  button {
    flex-direction: row-reverse;
    gap: 6px;
    width: max-content;
    height: max-content;
  }
`
export const SendButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  button {
    flex-direction: row-reverse;
    gap: 6px;
    width: 190px;
  }
`
