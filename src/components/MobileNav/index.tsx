import { NavLink } from 'react-router-dom'
import MENU from 'constants/menu'
import ROLES from 'constants/role'
import { MobileNavbarWrapper, NavHeading, NavLinkWrapper } from 'styles/components/MobileNav'

const MobileNavbar = () => (
  <MobileNavbarWrapper>
    {MENU[ROLES.DRIVER].map((item, index) => (
      <NavLinkWrapper key={index}>
        <NavLink to={`${item.link}`}>
          {item.icon}
          <NavHeading>{item.title}</NavHeading>
        </NavLink>
      </NavLinkWrapper>
    ))}
  </MobileNavbarWrapper>
)

export default MobileNavbar
