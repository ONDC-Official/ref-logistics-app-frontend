import { IItemInfo } from 'interfaces/views'
import {
  MainWrapper,
  Wrapper,
  Heading,
  DetailWrapper,
  DetailContainer,
  Title,
  AddressTitle,
  Content,
  AddressContent,
} from 'styles/views/adminDashboard/tableDescription'

const ItemDetails = ({ record }: IItemInfo) => {
  const { name, building, city, state, area_code } = record?.fulfillments[0]?.start?.location?.address
  const { phone } = record?.fulfillments[0]?.start?.contact

  return (
    <MainWrapper>
      <Wrapper>
        <Heading>Item Details</Heading>
        <DetailWrapper>
          <DetailContainer>
            <Title>Item Name</Title>
          </DetailContainer>
          <DetailContainer>
            <AddressTitle>Pickup Location</AddressTitle>
          </DetailContainer>
          <DetailContainer>
            <Title>Mobile Number</Title>
          </DetailContainer>
        </DetailWrapper>

        {record?.linked_order?.items.map((item: { descriptor: { name: string } }) => (
          <DetailWrapper key={item?.descriptor?.name}>
            <DetailContainer>
              <Content>{item?.descriptor?.name}</Content>
            </DetailContainer>
            <DetailContainer>
              <AddressContent>
                {name}, {building}, {city}, {state} ,{area_code}
              </AddressContent>
            </DetailContainer>
            <DetailContainer>{<Content>{phone}</Content>}</DetailContainer>
          </DetailWrapper>
        ))}
      </Wrapper>
    </MainWrapper>
  )
}

export default ItemDetails
