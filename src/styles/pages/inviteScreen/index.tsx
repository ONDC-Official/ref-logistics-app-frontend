import styled from 'styled-components'

export const InviteMainContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`
export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 65px;
  width: 60%;
  padding: 46px 56px 0 20px;
  @media (max-width: 1068px) {
    width: 100%;
    padding: 26px;
    align-items: center;
  }
`
export const AdminRightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 65px;
  width: 60%;
  padding: 46px 56px 20px 20px;
  @media (max-width: 1068px) {
    width: 100%;
    gap: 12px;
    padding: 15px;
  }
`
export const EmailRightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  padding: 46px 56px 0 0;
  @media (max-width: 1068px) {
    width: 100%;
    gap: 15px;
    padding: 10px;
  }
`
export const ButtonSection = styled.div`
  display: flex;
  align-self: flex-end;
  button {
    width: 92px;
    height: 36px;
    gap: 8px;
    text-transform: uppercase;
  }
`
