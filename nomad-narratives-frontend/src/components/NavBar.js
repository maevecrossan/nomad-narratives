import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../assets/nn-logo-transparent.png'
import './NavBar.css';

// NavBar for Logged In User
const NavBar = () => {
    return (
        <Navbar bg="light" expand="md" fixed='top'>
            <Navbar.Brand href="#home">
                <img src={logo} alt="Logo" className="img-fluid navbar-logo"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                
                {/* Logged In State */}
                <Nav.Link>My Feed</Nav.Link>
                <Nav.Link>My Profile</Nav.Link>

                {/* Explore Dropdown */}
                <NavDropdown title="Explore" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Region</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Country</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">City</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.4">Target Audience</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.5">Duration</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link>Log Out</Nav.Link>

                {/* Help Dropdown */}
                <NavDropdown title="Help" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">About Us</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Community Guidelines</NavDropdown.Item>
                </NavDropdown>
                
                {/* Logged Out State */}
                <Nav.Link href="#link">About Us</Nav.Link>
                <Nav.Link href="#link">Community Guidelines</Nav.Link>
                <Nav.Link>Sign In</Nav.Link>
                <Nav.Link>Sign up</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar