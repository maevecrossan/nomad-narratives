import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import TripPost from "./TripPost";
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useRedirect } from "../../hooks/useRedirect";

function TripPostPage() {
    useRedirect('loggedOut');
    const { id } = useParams();
    const [tripPost, setTripPost] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: tripPost }, { data: comments }] =
                    await Promise.all([
                        axiosReq.get(`/posts/${id}`),
                        axiosReq.get(`/comments/?post=${id}`),
                    ]);
                setTripPost({ results: [tripPost] });
                setComments(comments);
            } catch (err) {
                console.log(err);
            }
        };
        handleMount();
    }, [id]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile/>
                <TripPost
                    {...tripPost.results[0]}
                    setTripPost={setTripPost}
                    TripPostPage
                />
                <Container className={appStyles.Content}>
                    Comments
                    {currentUser ? (
                        <CommentCreateForm
                            profile_id={currentUser.profile_id}
                            profileImage={profile_image}
                            tripPost={id}
                            setTripPost={setTripPost}
                            setComments={setComments}
                        />
                    ) : comments.results.length ? (
                        "Comments"
                    ) : null}
                    {comments.results.length ? (
                        <InfiniteScroll
                            children={comments.results.map((comment) => (
                                <Comment
                                    key={comment.id}
                                    {...comment}
                                    setTripPost={setTripPost}
                                    setComments={setComments}
                                />
                            ))}
                            dataLength={comments.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!comments.next}
                            next={() => fetchMoreData(comments, setComments)}
                        />
                    ) : currentUser ? (
                        <span>No comments yet, be the first to comment!</span>
                    ) : (
                        <span>No comments... yet</span>
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default TripPostPage;
