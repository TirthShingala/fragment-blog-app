import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import AuthContext from "../../store/Auth-context";
import React, { useContext } from "react";
import IsLogin from "./IsLogin";
import NotLogin from "./NotLogin";
import { Link } from "react-router-dom";

function Header(props) {
  const ctx = useContext(AuthContext);

  return (
    <Navbar
      collapseOnSelect
      expand='sm'
      bg='dark'
      variant='dark'
      className='shadow'>
      <Container>
        <NavbarBrand>
          <Link
            to='/'
            className='text-light'
            style={{ textDecoration: "none" }}>
            &lt;/&gt; Fragment
          </Link>
        </NavbarBrand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse
          className='justify-content-end'
          id='responsive-navbar-nav'>
          {ctx.isLoggedIn ? <IsLogin /> : <NotLogin />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
