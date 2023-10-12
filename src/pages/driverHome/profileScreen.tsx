import { useState } from 'react'
import Button from 'components/Button'
import Modal from 'components/Modal'
import DriverLayout from 'components/Layouts/driverLayout'
import MyProfileSection from 'views/driverFlowHome/myProfileSection'
import LogoutConfirmaionModal from 'views/logoutConfirmaionModal'
import LogoutIcon from 'assets/svg/LogoutIcon'
import { ProfileScreenWrapper, ButtonSection } from 'styles/views/driverFlowHome'

const ProfileScreen = () => {
  const [successModal, setSuccessModal] = useState(false)

  return (
    <DriverLayout>
      <ProfileScreenWrapper>
        <MyProfileSection />
        <ButtonSection>
          <Button label="Logout" variant="contained" onClick={() => setSuccessModal(true)}>
            <LogoutIcon />
          </Button>
        </ButtonSection>
      </ProfileScreenWrapper>
      <Modal isOpen={successModal}>
        <LogoutConfirmaionModal showModal={(value: boolean) => setSuccessModal(value)} />
      </Modal>
    </DriverLayout>
  )
}

export default ProfileScreen
