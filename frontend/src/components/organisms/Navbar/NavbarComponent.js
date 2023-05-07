import { useContext } from "react";
import { AuthContext } from "providers/AuthContextProvider";
import { PATHS } from "utils/consts";
import { Container, Nav, Navbar } from "react-bootstrap";
import { AccountCircle } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { blue } from "@mui/material/colors";

function NavbarComponent() {
  const { isLogged, logout } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href={PATHS.home}>Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={PATHS.about}>About</Nav.Link>
            {isLogged && (
              <>
                <Nav.Link href={PATHS.rewardShop}>Shop</Nav.Link>
                <Nav.Link href={PATHS.advertisements}>Advertisements</Nav.Link>
                <Nav.Link href={PATHS.ranking}>Ranking</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {isLogged ? (
              <>
                <IconButton
                  onClick={() => window.location.replace(PATHS.profile)}
                  aria-label="profile">
                  <AccountCircle sx={{ fontSize: 30, color: blue[50] }} />
                </IconButton>
              </>
            ) : (
              <>
                <Nav.Link href={PATHS.login}>Login</Nav.Link>
                <Nav.Link href={PATHS.register}>Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
