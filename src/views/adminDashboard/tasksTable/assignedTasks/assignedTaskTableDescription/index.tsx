import {
  MainWrapper,
  Wrapper,
  Heading,
  DetailWrapper,
  DetailContainer,
  Title,
  Content,
} from 'styles/views/adminDashboard/tableDescription'

const AssignedTasksDetails = () => (
  <MainWrapper>
    <Wrapper>
      <Heading>Driver Details</Heading>
      <DetailWrapper>
        <DetailContainer>
          <Title>Name</Title>
          <Content>David John </Content>
        </DetailContainer>
        <DetailContainer>
          <Title>Location</Title>
          <Content>Los angeles, CA </Content>
        </DetailContainer>
        <DetailContainer>
          <Title>Mobile Number</Title>
          <Content>+91 827 9382 938 </Content>
        </DetailContainer>
        <DetailContainer>
          <Title>Email</Title>
          <Content>david.john@gmail.com </Content>
        </DetailContainer>
        <DetailContainer>
          <Title>Registered vehicle</Title>
          <Content>HR - 26 - RH 2347 </Content>
        </DetailContainer>
      </DetailWrapper>
    </Wrapper>
  </MainWrapper>
)

export default AssignedTasksDetails
