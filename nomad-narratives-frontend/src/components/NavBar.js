import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../assets/nn-logo-brown-transparent.png'
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';


const NavBar = () => {

    // const location = useLocation();

    // // Check if the current route matches any dropdown item
    // const isExploreActive = ["/region", "/country", "/city", "/target-audience", "/duration"].includes(location.pathname);

    const currentUser = useCurrentUser();

    const newPostIcon = (
        <NavLink 
        exact 
        to="/log-out" 
        className={styles.NavLink} 
        activeClassName={styles.Active}
        >
            <i className="fa-solid fa-plus-square"></i>
            New Post
        </NavLink>
    )
    
    const loggedInIcons = <> 
        {currentUser?.username} 
            <NavLink 
                exact
                to="/my-feed" 
                className={styles.NavLink} 
                activeClassName={styles.Active}
                >
                <i className='fas fa-house-user'></i>
                    My Feed
            </NavLink>

            <NavLink 
                exact
                to={`/profiles/${currentUser?.profile_id}`} 
                className={styles.NavLink}
                >
                <img src={currentUser?.profile_image}/>
                    My Profile
            </NavLink>

            {/* Future Development */}
            {/* <NavLink 
                exact
                to="/explore" 
                className={styles.NavLink} 
                activeClassName={styles.Active}
                >
                <i className="fa-regular fa-compass"></i>
                Explore
            </NavLink> */}
            <NavLink 
                exact 
                to="/log-out" 
                className={styles.NavLink} 
                activeClassName={styles.Active}
                onClick={() => {

                }}
                >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    Log Out
            </NavLink>

            <NavLink 
                exact 
                to="/liked" 
                className={styles.NavLink} 
                activeClassName={styles.Active}
                >
                <i className="fa-solid fa-heart"></i>
                    Likes
            </NavLink>
        </>
    
    const loggedOutIcons = <>
        <NavLink 
            exact
            to="/welcome#hero" 
            className={styles.NavLink} 
            activeClassName={styles.Active}
            >
            <i className='fas fa-home'></i>
                Welcome
        </NavLink>

        <NavLink 
            exact 
            to="/welcome#about-us" 
            className={styles.NavLink} 
            activeClassName={styles.Active}
            >
            <i className="fa-solid fa-info"></i>
                About Us
        </NavLink>

        <NavLink 
            exact 
            to="/welcome#community-guidelines" 
            className={styles.NavLink} 
            activeClassName={styles.Active}
            >
            <i className="fa-regular fa-file-lines"></i>
                Community Guidelines
        </NavLink>

        <NavLink 
            exact 
            to="/sign-in" 
            className={styles.NavLink} 
            activeClassName={styles.Active}
            >
            <i className="fa-solid fa-sign-in-alt"></i>
                Sign In
        </NavLink>

        <NavLink 
            exact 
            to="/sign-up" 
            className={styles.NavLink} 
            activeClassName={styles.Active}
            >
            <i className="fa-solid fa-user-plus"></i>
                Sign up
        </NavLink>
    </>

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

            {currentUser && newPostIcon}

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                
                {/* Logged In State */}
                

                {/* FUTURE DEVELOPMENT: Explore Dropdown */}
                {/* <NavDropdown 
                    title={
                        <span className={`${isExploreActive ? styles.Active : ""}`}>
                            <i className={`fas fa-compass me-2 ${isExploreActive ? styles.ActiveIcon : ""}`}></i>
                            Explore
                        </span>
                    }
                    id="basic-nav-dropdown"
                    className={`${styles.NavLink} ${isExploreActive ? styles.Active : styles.NavDropdown}`}
                    >
                    <NavDropdown.Item 
                        exact
                        as={NavLink} 
                        to="/by-region"
                        >
                        Region
                    </NavDropdown.Item>

                    <NavDropdown.Item 
                        exact
                        as={NavLink} 
                        to="/by-country"
                        >
                        Country
                    </NavDropdown.Item>

                    <NavDropdown.Item 
                        exact
                        as={NavLink} 
                        to="/by-city"
                        >
                        City
                    </NavDropdown.Item>

                    <NavDropdown.Item 
                        exact
                        as={NavLink} 
                        to="/by-target-audience">
                        Target Audience
                    </NavDropdown.Item>

                    <NavDropdown.Item 
                        exact
                        as={NavLink} 
                        to="/by-duration"
                        >
                        Duration
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item>Separated link</NavDropdown.Item>
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
                
                {currentUser ? loggedInIcons : loggedOutIcons}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar