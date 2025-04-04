import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/UserProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
    useProfileData,
    useSetProfileData,
} from "../../contexts/ProfileDataContext";
import InfiniteScroll from "react-infinite-scroll-component";
import TripPost from "../posts/TripPost";
import { Button, Image } from "react-bootstrap";
import { fetchMoreData } from "../../utils/utils";
import NotFound from "../../assets/not-found.png";
import { useRedirect } from "../../hooks/useRedirect";

import { UserProfileEditDropdown } from "../../components/OptionsDropdown";

function UserProfilePage() {
    useRedirect("loggedOut");
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const { id } = useParams();

    const { setProfileData, handleFollow, handleUnfollow } =
        useSetProfileData();
    const { profilePage } = useProfileData();

    const [profile] = profilePage.results;
    const is_owner = currentUser?.username === profile?.owner;
    const [profilePosts, setProfilePosts] = useState({ results: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: profilePage }, { data: profilePosts }] =
                    await Promise.all([
                        axiosReq.get(`/profiles/${id}/`),
                        axiosReq.get(`/posts/?owner__profile=${id}`),
                    ]);
                setProfileData((prevState) => ({
                    ...prevState,
                    profilePage: { results: [profilePage] },
                }));
                setProfilePosts(profilePosts);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err);
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            {profile?.is_owner && <UserProfileEditDropdown id={profile?.id} />}
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image
                        className={styles.ProfileImage}
                        src={profile?.image}
                        roundedCircle
                        aria-label="User avatar"
                        alt="User avatar"
                    />
                </Col>
                <Col lg={6}>
                    <h3
                        className={`${styles.ProfilePageUsername} ${appStyles.DmSerifFont} m-2`}
                    >
                        {profile?.owner}
                    </h3>
                    <Row
                        className={`${styles.UserStatsContainer} justify-content-center no-gutters`}
                    >
                        <Col xs={3} className="my-2">
                            <div>{profile?.posts_count ?? 0}</div>
                            <div>posts</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>{profile?.followers_count ?? 0}</div>
                            <div>followers</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>{profile?.following_count ?? 0}</div>
                            <div>following</div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className="text-lg-right">
                    {currentUser &&
                        !is_owner &&
                        (profile?.following_id ? (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.BrownOutline}`}
                                onClick={() => handleUnfollow(profile)}
                            >
                                unfollow
                            </Button>
                        ) : (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Brown}`}
                                onClick={() => handleFollow(profile)}
                            >
                                follow
                            </Button>
                        ))}
                </Col>
                <Col className="p-3">
                    <strong>
                        <em>{profile?.content}</em>
                    </strong>
                </Col>
            </Row>
        </>
    );

    const mainProfilePosts = (
        <>
            <hr />
            <p className="text-center">{profile?.owner}'s posts</p>
            <hr />
            {profilePosts.results.length ? (
                <InfiniteScroll
                    children={profilePosts.results.map((post) => (
                        <TripPost
                            key={post.id}
                            {...post}
                            setPosts={setProfilePosts}
                        />
                    ))}
                    dataLength={profilePosts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profilePosts.next}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                />
            ) : (
                <Container className="d-flex flex-column justify-content-center align-items-center">
                    <Asset
                        src={NotFound}
                        message={
                            is_owner
                                ? "You have no posts. Try creating one to see it here!"
                                : `Nothing to see here! ${profile?.owner} hasn't posted yet.`
                        }
                    />
                </Container>
            )}
        </>
    );

    return (
        <Row>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />
                <Container
                    className={`${appStyles.Content} ${styles.profileContainer}`}
                >
                    {hasLoaded ? (
                        <>
                            {mainProfile}
                            {mainProfilePosts}
                        </>
                    ) : (
                        <Container
                            className={`${appStyles.Content} d-flex justify-content-center align-items-center`}
                        >
                            <Asset spinner />
                        </Container>
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
