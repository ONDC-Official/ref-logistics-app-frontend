import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AdminPrivateLayout from 'components/Layouts/adminPrivateLayout'
import TextInput from 'components/TextInput'
import useGet from 'hooks/useGet'
import APIS from 'constants/api'
import IssuesData from 'views/adminDashboard/issuesTable'
import SearchIcon from 'assets/svg/SearchIcon'
import {
  HeadingWrapper,
  MainContainer,
  MainHeading,
  ActivityWrapper,
  SearchWrapper,
  InputWrapper,
} from 'styles/views/dashboard'

const IssuesDetails = () => {
  const [searchedText, setSearchedText] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const { refetch: getIssues, data: issueDetails } = useGet(
    'get-issues',
    `${APIS.ISSUE_LIST}?skip=${currentPage}&search=${searchedText}&limit=${pageSize}`,
  )
  const { refetch: getDashboard, data: dashboardDetails } = useGet('get-dashboard', `${APIS.USERS_DASHBOARD}`)

  useEffect(() => {
    getDashboard()
  }, [getDashboard])

  useEffect(() => {
    getIssues()
  }, [getIssues, pageSize, currentPage, searchedText])

  const { control } = useForm()
  const handleInputChange = (e: any) => {
    setCurrentPage(0)
    setSearchedText(e.target.value)
  }

  return (
    <AdminPrivateLayout>
      <MainContainer>
        <HeadingWrapper>
          <MainHeading>Issues</MainHeading>
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
          <IssuesData
            scroll={430}
            searchedText={searchedText}
            issueDetails={issueDetails?.data?.issueList}
            getIssues={getIssues}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            totalCount={dashboardDetails?.admins?.totalIssueCount}
          />
        </ActivityWrapper>
      </MainContainer>
    </AdminPrivateLayout>
  )
}

export default IssuesDetails
