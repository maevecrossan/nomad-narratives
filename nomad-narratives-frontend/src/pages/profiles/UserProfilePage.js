import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/UserProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useParams } from "react-router";
import { axiosReq } from "axios";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
    useProfileData,
    useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Image } from "react-bootstrap";

function UserProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const { id } = useParams();
    const setProfileData = useSetProfileData();
    const { profilePage } = useProfileData();
    const [profile] = profilePage.results;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: profilePage }] = await Promise.all([
                    axiosReq.get(`/profiles/${id}/`),
                ]);
                setProfileData((prevState) => ({
                    ...prevState,
                    profilePage: { results: [profilePage] },
                }));
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image
                        className={styles.ProfileImage}
                        src={profile?.image}
                    />
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">Profile username</h3>
                    <p>Profile stats</p>
                </Col>
                <Col lg={3} className="text-lg-right">
                    <p>Follow button</p>
                </Col>
                <Col className="p-3">Profile content</Col>
            </Row>
        </>
    );

    const mainProfilePosts = (
        <>
            <hr />
            <p className="text-center">Profile owner's posts</p>
            <hr />
        </>
    );

    return (
        <Row>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />
                <Container className={appStyles.Content}>
                    {hasLoaded ? (
                        <>
                            {mainProfile}
                            {mainProfilePosts}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default UserProfilePage;
