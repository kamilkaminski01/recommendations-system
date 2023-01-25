import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import CheckToken from "../functions/CheckToken";
import { AccountCircle } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { blue } from "@mui/material/colors";

function NavbarComponent() {
  // check jwt token
  const token = CheckToken();
  console.log(token);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        {token ? (
          <Navbar.Brand href="/mainPage">Recommenders</Navbar.Brand>
        ) : (
          <Navbar.Brand href="/">Recommenders</Navbar.Brand>
        )}

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {token ? (
              <>
                <NavDropdown title="User" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/shop/rewards">Shop</NavDropdown.Item>
                  <NavDropdown.Item href="/advertisements">Offers</NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user_id");
                    }}
                    href="/">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/shop/rewards">Shop</Nav.Link>
                <Nav.Link href="/advertisements">Offers</Nav.Link>
              </>
            ) : (
              <></>
            )}
            <Nav.Link href="/aboutus">About us </Nav.Link>
          </Nav>
          <Nav>
            {token ? (
              <>
                <IconButton
                  onClick={() => window.location.replace("/profilePage")}
                  aria-label="profile">
                  <AccountCircle sx={{ fontSize: 30, color: blue[50] }} />
                </IconButton>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
