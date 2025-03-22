import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../assets/nn-logo-brown-transparent.png'
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';


const NavBar = () => {

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const {expanded, setExpanded, ref} = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axios.post('dj-rest-auth/logout/');
            setCurrentUser(null);
        } catch(err) {
            console.log(err)
        }
    }

    const newPostIcon = (
        <NavLink 
        exact 
        to="/posts/create" 
        className={styles.NavLink} 
        activeClassName={styles.Active}
        >
            <i className="fa-solid fa-plus-square"></i>
            New Post
        </NavLink>
    )
    
    const loggedInIcons = <>  
            <NavLink 
                exact
                to="/explore" 
                className={styles.NavLink} 
                activeClassName={styles.Active}
                >
                <i className='fa-solid fa-map'></i>
                    Explore
            </NavLink>
            
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
                to="/liked" 
                className={styles.NavLink} 
                activeClassName={styles.Active}
                >
                <i className="fa-solid fa-heart"></i>
                    My Likes
            </NavLink>

            <NavLink 
                exact
                to={`/profiles/${currentUser?.profile_id}`} 
                className={styles.NavLink}
                >
                <Avatar 
                    src={currentUser?.profile_image} 
                    height={40} 
                    />
                    {currentUser?.username}'s Profile
            </NavLink>

            <NavLink 
                exact 
                to="/" 
                className={styles.NavLink} 
                activeClassName={styles.Active}
                onClick={handleSignOut}
                >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    Sign Out
            </NavLink>
        </>
    
    const loggedOutIcons = <>
        <NavLink 
            exact
            to="/" 
            className={styles.NavLink} 
            activeClassName={styles.Active}
            >
            <i className='fas fa-home'></i>
                Welcome
        </NavLink>

        <NavLink 
            exact 
            to="/#about-us" 
            className={styles.NavLink} 
            // activeClassName={styles.Active}
            >
            <i className="fa-solid fa-info"></i>
                About Us
        </NavLink>

        <NavLink 
            exact 
            to="/#community-guidelines" 
            className={styles.NavLink} 
            // activeClassName={styles.Active}
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
        <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed='top'>
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

            <Navbar.Toggle 
                ref={ref}
                onClick={() => setExpanded(!expanded)} 
                aria-controls="basic-navbar-nav" 
            />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {currentUser ? loggedInIcons : loggedOutIcons}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar