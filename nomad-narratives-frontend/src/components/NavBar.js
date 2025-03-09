import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../assets/nn-logo-transparent.png'
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom/cjs/react-router-dom';

// NavBar for Logged In User
const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} expand="md" fixed='top'>
            <NavLink 
                exact
                to="/">
                <Navbar.Brand>
                    <img src={logo} 
                    alt="Logo" 
                    className={styles.navbarLogo}
                />
                </Navbar.Brand>
            </NavLink>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto text-center">
                
                {/* Logged In State */}
                <NavLink 
                    exact
                    to="/myfeed" 
                    className={styles.NavLink} 
                    activeClassName={styles.Active}
                    >
                    <i className='fas fa-home'></i>
                    My Feed
                </NavLink>

                <NavLink 
                    exact
                    to="/myprofile" 
                    className={styles.NavLink} 
                    activeClassName={styles.Active}
                    >
                    <i className="fa-regular fa-circle-user"></i>
                    My Profile
                </NavLink>

                {/* Explore Dropdown */}
                {/* <NavDropdown title={
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
                </NavDropdown> */}

                {/* Help Dropdown */}
                    {/* <NavDropdown title={
                        <>
                            <i className="fas fa-question"></i> Help
                        </>
                        } id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">About Us</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Community Guidelines</NavDropdown.Item>
                    </NavDropdown> */}

                <NavLink 
                    exact 
                    to="/logout" 
                    className={styles.NavLink} 
                    activeClassName={styles.Active}
                    >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    Log Out
                </NavLink>
                
                {/* Logged Out State */}
                <NavLink 
                    exact 
                    to="/aboutus" 
                    className={styles.NavLink} 
                    activeClassName={styles.Active}
                    >
                    <i className="fa-solid fa-info"></i>
                    About Us
                </NavLink>

                <NavLink 
                    exact 
                    to="/communityguidelines" 
                    className={styles.NavLink} 
                    activeClassName={styles.Active}
                    >
                    <i className="fa-regular fa-file-lines"></i>
                    Community Guidelines
                </NavLink>

                <NavLink 
                    exact 
                    to="/signin" 
                    className={styles.NavLink} 
                    activeClassName={styles.Active}
                    >
                    <i className="fa-solid fa-sign-in-alt"></i>
                    Sign In
                </NavLink>

                <NavLink 
                    exact 
                    to="/signup" 
                    className={styles.NavLink} 
                    activeClassName={styles.Active}
                    >
                    <i className="fa-solid fa-user-plus"></i>
                    Sign up
                </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar