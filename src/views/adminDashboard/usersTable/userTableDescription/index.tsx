import {
  MainWrapper,
  Wrapper,
  Heading,
  DetailWrapper,
  DetailContainer,
  Title,
  Content,
} from 'styles/views/adminDashboard/tableDescription'

const DriverDetails = ({ users }: any) => (
  <MainWrapper>
    <Wrapper>
      <Heading>Driver Details</Heading>
      <DetailWrapper>
        <DetailContainer>
          <Title>No of Tasks</Title>
          <Content>{users?.totalTasks} </Content>
        </DetailContainer>

        <DetailContainer>
          <Title>Completed Tasks</Title>
          <Content>{users?.completedTasksCount} </Content>
        </DetailContainer>
        <DetailContainer>
          <Title>In Progress</Title>
          <Content>{users?.tasksInProgressCount} </Content>
        </DetailContainer>
      </DetailWrapper>
    </Wrapper>
  </MainWrapper>
)

export default DriverDetails
