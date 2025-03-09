import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../assets/nn-logo-transparent.png'
import styles from '../styles/NavBar.module.css'

// NavBar for Logged In User
const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} expand="md" fixed='top'>
            <Navbar.Brand href="#home">
                <img src={logo} alt="Logo" className={styles.navbarLogo}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto text-center">
                
                {/* Logged In State */}
                <Nav.Link>
                    <i className='fas fa-home'></i>
                    My Feed
                </Nav.Link>
                <Nav.Link>
                    <i class="fa-regular fa-circle-user"></i>
                    My Profile
                </Nav.Link>

                {/* Explore Dropdown */}
                <NavDropdown title={
                    <>
                        <i className="fas fa-compass me-2"></i> Explore
                    </>
                    } id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Region</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Country</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">City</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.4">Target Audience</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.5">Duration</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>

                {/* Help Dropdown */}
                <NavDropdown title={
                    <>
                        <i className="fas fa-question"></i> Help
                    </>
                    } id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">About Us</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Community Guidelines</NavDropdown.Item>
                </NavDropdown>

                <Nav.Link>
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    Log Out
                </Nav.Link>
                
                {/* Logged Out State */}
                <Nav.Link href="#link">
                    <i class="fa-solid fa-info"></i>
                    About Us
                </Nav.Link>
                <Nav.Link href="#link">
                    <i class="fa-regular fa-file-lines"></i>
                    Community Guidelines</Nav.Link>
                <Nav.Link>
                    <i class="fa-solid fa-sign-in-alt"></i>
                    Sign In
                </Nav.Link>
                <Nav.Link>
                    <i class="fa-solid fa-user-plus"></i>
                    Sign up
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar