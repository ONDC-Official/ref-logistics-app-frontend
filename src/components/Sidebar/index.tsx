import { NavLink } from 'react-router-dom'
import MENU from 'constants/menu'
import ROLES from 'constants/role'
import { Container, Wrapper, BasicLinksContainer, DataWrapper, NavItems } from 'styles/components/Sidebar'

const Sidebar = () => (
  <Container>
    <Wrapper>
      <BasicLinksContainer>
        {MENU[ROLES.ADMIN].map((item, index) => (
          <DataWrapper key={index}>
            <NavLink className="title" to={`${item.link}`}>
              <NavItems>{item?.title}</NavItems>
            </NavLink>
          </DataWrapper>
        ))}
      </BasicLinksContainer>
    </Wrapper>
  </Container>
)

export default Sidebar
