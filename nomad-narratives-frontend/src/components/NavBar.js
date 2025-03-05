import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

// NavBar for Logged In User
const NavBar = () => {
    return (
        <Navbar bg="light" expand="md">
            <Navbar.Brand href="#home">Nomad Narratives</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#home">My Feed</Nav.Link>
                {/* <Nav.Link href="#home">Saved Posts</Nav.Link> */}
                <NavDropdown title="Inspiration" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#link">My Profile</Nav.Link>
                <Nav.Link href="#link">About Us</Nav.Link>
                <Nav.Link href="#link">Community Guidelines</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar