import React, { useState } from 'react';
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import logo from '../assets/nn-logo-brown-transparent.png';
import styles from '../styles/NavBar.module.css';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { removeTokenTimestamp } from '../utils/utils';


const NavBar = () => {

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const {expanded, setExpanded, ref} = useClickOutsideToggle();

    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

    const handleSignOutClick = () => {
        setShowModal(true);
        };

    const handleConfirmSignOut = async () => {
        try {
            await axios.post('dj-rest-auth/logout/');
            removeTokenTimestamp();
            setCurrentUser(null);
            setShowModal(false);
            history.push('/');
        } catch (err) {
            console.error('Error during sign-out:', err);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        };

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
                <i class="fa-solid fa-bars"></i>
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
                to="#" 
                className={styles.NavLink}
                onClick={handleSignOutClick}
                >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    Sign Out
            </NavLink>

            <NavLink 
                exact
                to="/" 
                className={styles.NavLink} 
                activeClassName={styles.Active}
                aria-label="Welcome Page"
                > 
                {/* Homepage */}
                <i className='fas fa-home'></i>
            </NavLink>

            <NavLink 
                exact 
                to="/contact" 
                className={styles.NavLink}
                aria-label="Contact form"

                >
                {/* Contact form */}
                <i class="fa-solid fa-circle-question"></i>
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
            >
            <i className="fa-solid fa-info"></i>
                About Us
        </NavLink>

        <NavLink 
            exact 
            to="/#community-guidelines" 
            className={styles.NavLink}
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

        <NavLink 
                exact 
                to="/contact" 
                className={styles.NavLink}
                >
                <i class="fa-solid fa-circle-question"></i>
                Contact Us
            </NavLink>
    </>

    return (
        <>
            <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
                <NavLink exact to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="Nomand Narratives Logo" className={styles.navbarLogo} />
                    </Navbar.Brand>
                </NavLink>

                {currentUser && <div className="d-none d-md-block">{newPostIcon}</div>}

                <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {currentUser && <div className="d-md-none">{newPostIcon}</div>}
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Sign Out</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to sign out?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmSignOut}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NavBar