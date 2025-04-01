import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/TripPostFeed.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import TripPost from "./TripPost";
import Asset from "../../components/Asset";
import NotFound from "../../assets/not-found.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useRedirect } from "../../hooks/useRedirect";

function TripPostFeed({ message, filter = "" }) {
    useRedirect("loggedOut");

    const [tripPosts, setTripPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchTripPosts = async () => {
            try {
                const { data } = await axiosReq.get(
                    `/posts/?${filter}search=${query}`
                );
                setTripPosts(data);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchTripPosts();
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, pathname]);

    const renderPageDescription = () => {
        if (pathname === "/my-feed") {
            return <p>Posts from users you follow.</p>;
        }
        if (pathname === "/liked") {
            return <p>Posts you've liked.</p>;
        }
        return <p>Explore posts from all users.</p>;
    };

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />

                <i className={`fas fa-search ${styles.SearchIcon}`} />
                <Form.Label className="d-none">Search</Form.Label>
                <Form
                    className={styles.SearchBar}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <Form.Control
                        aria-label="Search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="text"
                        className="mr-sm-2"
                        placeholder="Search posts"
                    />
                </Form>

                {/* Render description below search bar */}
                {renderPageDescription()}
                
                {hasLoaded ? (
                    <>
                        {tripPosts.results.length ? (
                            <InfiniteScroll
                                children={tripPosts.results.map((tripPost) => (
                                    <TripPost
                                        key={tripPost.id}
                                        {...tripPost}
                                        setTripPosts={setTripPosts}
                                    />
                                ))}
                                dataLength={tripPosts.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!tripPosts.next}
                                next={() =>
                                    fetchMoreData(tripPosts, setTripPosts)
                                }
                            />
                        ) : (
                            <Container
                                className={`${appStyles.Content} d-flex flex-column justify-content-center align-items-center`}
                            >
                                <Asset src={NotFound} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container
                        className={`${appStyles.Content} d-flex justify-content-center align-items-center`}
                    >
                        <Asset spinner />
                    </Container>
                )}
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default TripPostFeed;
