import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logout from '../functions/Logout';
import CheckToken from '../functions/CheckToken';

function NavbarComponent() {
   //check jwt token
 const token = CheckToken();
  console.log(token);
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
            <>
              <Nav.Link href="/shop">Shop</Nav.Link>
              <Nav.Link href="/advertisements">Offers</Nav.Link>
            </>
          }
            
      
            <NavDropdown title="User" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/shop/rewards">Shop</NavDropdown.Item>
              <NavDropdown.Item href="/advertisements">Offers</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/aboutus">About us </Nav.Link>
          </Nav>
          <Nav>
            {token?
   
           
           <></> // Tutaj dodac wylogowywanie 
            :
            <Nav.Link href="/login">Login</Nav.Link>
            }
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;