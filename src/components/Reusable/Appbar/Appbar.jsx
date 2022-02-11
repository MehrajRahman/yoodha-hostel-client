import React from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap'

const Appbar = () => {
  return (
    <div>
        <Navbar bg="dark" expand={false}>
  <Container fluid>
   <div className='w-50 d-flex justify-content-between'>
   
    <Nav.Link className='text-right text-blue' href="#action1">Log In</Nav.Link>
    <Navbar.Brand className=' text-white' href="#">Yoodha Hostel</Navbar.Brand>
   </div>

    <Navbar.Toggle aria-controls="offcanvasNavbar" />
    <Navbar.Offcanvas
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="end"
      bg="dark"
    >
      <Offcanvas.Header  closeButton>
        <Offcanvas.Title id="offcanvasNavbarLabel">Yoodha Hostel</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body >
        <Nav  className="justify-content-end flex-grow-1 pe-3">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/serveFood">Serve Food</Nav.Link>

          <Nav.Link href="/food">Food</Nav.Link>
          <Nav.Link href="/student">Student</Nav.Link>
          {/* <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        {/* <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form> */}
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  </Container>
</Navbar>
    </div>
  )
}

export default Appbar