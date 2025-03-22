import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/TripPostFeed.module.css";
import { useLocation } from "react-router";
import { axiosReq } from '../../api/axiosDefaults';
import TripPost from './TripPost';

function TripPostFeed({message, filter=""}) {
    const [tripPosts, setTripPosts] = useState({results: [] })
    const [hasLoaded, setHasLoaded] = useState(false);
    const {pathname} = useLocation();

    useEffect(() => {
        const fetchTripPosts = async () => {
          try {
            const { data } = await axiosReq.get(`/posts/?${filter}`);
            setTripPosts(data);
            setHasLoaded(true);
          } catch (err) {
            console.log(err);
          }
        };

        setHasLoaded(false);
        fetchTripPosts();
      }, [filter, pathname]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>Popular profiles mobile</p>
                {hasLoaded ? (
                    <>
                        {tripPosts.results.length ? (
                            tripPosts.results.map(tripPost => (
                                <TripPost key={tripPost.id} {...tripPost} setTripPosts={setTripPosts} />
                            ))
                        ) : (
                            console.log('show no results asset')
                        )}
                    </>
                ) : (
                    console.log('show loading spinner')
                )}
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <p>Popular profiles for desktop</p>
            </Col>
        </Row>
    );
}

export default TripPostFeed;