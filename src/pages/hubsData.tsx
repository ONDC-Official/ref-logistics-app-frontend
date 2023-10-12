import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AdminPrivateLayout from 'components/Layouts/adminPrivateLayout'
import useGet from 'hooks/useGet'
import APIS from 'constants/api'
import Modal from 'components/Modal'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import AddHubsModal from 'views/addHubsModal'
import HubsData from 'views/adminDashboard/hubsTable'
import InviteIcon from 'assets/svg/InviteIcon'
import SearchIcon from 'assets/svg/SearchIcon'

import {
  HeadingWrapper,
  MainContainer,
  MainHeading,
  ActivityWrapper,
  AdminButtonWrapper,
  SearchWrapper,
  InputWrapper,
} from 'styles/views/dashboard'

const HubsDetails = () => {
  const [searchedText, setSearchedText] = useState('')
  const [adminModal, setAdminModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const { refetch: getHubs, data: hubsDetails } = useGet(
    'get-hub',
    `${APIS.HUBS_LIST}?skip=${currentPage}&search=${searchedText}&limit=${pageSize}`,
  )

  useEffect(() => {
    getHubs()
  }, [pageSize, currentPage, getHubs, searchedText])

  const addAdmin = () => {
    setAdminModal(true)
  }

  const { control } = useForm()
  const handleInputChange = (e: any) => {
    // console.log('e', e)
    setCurrentPage(0)
    setSearchedText(e.target.value)
  }

  return (
    <AdminPrivateLayout>
      <MainContainer>
        <HeadingWrapper>
          <MainHeading>Hubs</MainHeading>
          <AdminButtonWrapper>
            <Button type="submit" label="Add Hubs" variant="outline" onClick={addAdmin}>
              <InviteIcon />
            </Button>
          </AdminButtonWrapper>
        </HeadingWrapper>
        <ActivityWrapper>
          <SearchWrapper>
            <InputWrapper>
              <TextInput
                placeholder="Search "
                prefix={<SearchIcon />}
                control={control}
                name={'search'}
                handleInputChange={handleInputChange}
              />
            </InputWrapper>
          </SearchWrapper>
          <HubsData
            hubsDetails={hubsDetails?.data}
            getHubs={getHubs}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            totalCount={hubsDetails?.data?.hubCount}
            searchedText={searchedText}
          />
        </ActivityWrapper>
      </MainContainer>
      <Modal isOpen={adminModal}>
        <AddHubsModal showModal={(value: boolean) => setAdminModal(value)} />
      </Modal>
    </AdminPrivateLayout>
  )
}

export default HubsDetails
