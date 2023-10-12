import { useHistory, useLocation } from 'react-router-dom'
import usePost from 'hooks/usePost'
import Button from 'components/Button'
import APIS from 'constants/api'
import { LoginRoute, ProfileRoutes, DriverLoginRoutes } from 'constants/routes'
import CloseIcon from 'assets/svg/CloseIcon'
import LogoutIcon from 'assets/svg/LogoutIcon'
import { ILogoutModalProps } from 'interfaces/views'
import {
  DeleteModalContainer,
  CloseBtn,
  ContentContainer,
  ContentWrapper,
  HeadingWrapper,
  Description,
  ButtonWrap,
  LogoutIconWrap,
} from 'styles/views/successfulModal'

const LogoutConfirmaionModal = ({ showModal }: ILogoutModalProps) => {
  const { mutateAsync } = usePost()
  const router = useHistory()
  const location = useLocation()

  const logout = async () => {
    const res = await mutateAsync({
      url: APIS.LOGOUT,
    })
    if (res) {
      localStorage.clear()
      if (location.pathname === `${ProfileRoutes.path}`) {
        router.push(`${DriverLoginRoutes.path}`)
      } else {
        router.push(`${LoginRoute.path}`)
      }
    }
  }

  return (
    <DeleteModalContainer>
      <CloseBtn onClick={() => showModal(false)}>
        <CloseIcon />
      </CloseBtn>
      <ContentContainer>
        <LogoutIconWrap>
          <LogoutIcon />
        </LogoutIconWrap>

        <ContentWrapper>
          <HeadingWrapper>Logout</HeadingWrapper>
          <Description>Are you sure you want to logout?</Description>
        </ContentWrapper>
        <ButtonWrap>
          <Button label="Cancel" variant="contained" onClick={() => showModal(false)} className="cancel" />
          <Button label="Logout" variant="contained" onClick={() => logout()} type="submit" />
        </ButtonWrap>
      </ContentContainer>
    </DeleteModalContainer>
  )
}

export default LogoutConfirmaionModal
