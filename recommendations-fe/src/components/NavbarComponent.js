import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavbarComponent() {
   //check jwt token
 const token = localStorage.getItem("token");

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        {token?
         <Navbar.Brand href="/mainPage">Recommenders</Navbar.Brand>
        :
        <Navbar.Brand href="home">Recommenders</Navbar.Brand>
        }
       
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          {token?
            <></>
            :
            <Nav.Link href="/shop">Shop</Nav.Link>
          }
            
            <Nav.Link href="/aboutus">About us </Nav.Link>
            <NavDropdown title="User" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/shope">Shop</NavDropdown.Item>
              <NavDropdown.Item href="/offers">Offers</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {token?
   
             <Nav.Link href="/singout">Logout</Nav.Link>
            :
            <Nav.Link href="/singin">Login</Nav.Link>
            }
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;