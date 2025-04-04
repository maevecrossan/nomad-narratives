import React, { useState, useEffect } from "react";
import styles from "../../styles/TripPost.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import axios from "axios";
import { axiosRes } from "../../api/axiosDefaults";
import { OptionsDropdown } from "../../components/OptionsDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const TripPost = ( props ) => {
    const {
        id,
        owner,
        updated_at,
        profile_id,
        profile_image,
        title,
        content,
        image,
        comments_count,
        likes_count,
        like_id,
        details,
        setTripPosts,
        isTripPostPage,
    } = props;

    const [showModal, setShowModal] = useState(false);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();
    const isSinglePostPage = isTripPostPage || false;

    const handleEdit = () => {
        history.push(`/posts/${id}/edit`);
    };

    const handleDeleteClick = async () => {
        setShowModal(true);
    };
    const handleConfirmDelete = async () => {
        try {
            await axiosRes.delete(`/posts/${id}/`);
            setShowModal(false);
            history.goBack();
        } catch (err) {
            // console.log(err);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const countryId = details?.country;
    const cityId = details?.city;

    const [countries, setCountries] = useState([]);
    const [cityName, setCityName] = useState("");

    // Truncate content to show only a portion in the feed
    const truncateContent = (content, maxLength = 500) => {
        if (!content) return "";
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + "...";
    };

    const truncatedContent = truncateContent(content);

    useEffect(() => {
        // Fetch all countries
        axios
            .get(`${API_URL}/api/countries/`)
            .then((response) => {
                setCountries(response.data);
            })
            .catch((error) => {
                console.error("Error fetching countries:", error);
                setCountries([]);
            });

        // Fetch city if available
        if (countryId && cityId) {
            axios
                .get(`${API_URL}/api/cities/${countryId}/`)
                .then((response) => {
                    const city = response.data.find((c) => c.id === cityId);
                    setCityName(city ? city.name : "Unknown City");
                })
                .catch((error) => {
                    console.error("Error fetching city:", error);
                    setCityName("Unknown City");
                });
        }
    }, [countryId, cityId]);

    const countryName =
        countries.find((c) => c.id === countryId)?.name || "Unknown Country";

        const handleLike = async () => {
            const { setTripPost, setTripPosts } = props; // Destructure inside the function
            try {
                const { data } = await axiosRes.post("/likes/", { post: id });
        
                if (setTripPosts) {
                    setTripPosts((prevPosts) => {
                        const updatedPosts = {
                            ...prevPosts,
                            results: prevPosts.results.map((post) =>
                                post.id === id
                                    ? {
                                          ...post,
                                          likes_count: post.likes_count + 1,
                                          like_id: data.id,
                                      }
                                    : post
                            ),
                        };
                        return updatedPosts;
                    });
                } else if (setTripPost) {
                    props.setTripPost((prevPost) => ({
                        results: [
                            {
                                ...prevPost.results[0],
                                likes_count: prevPost.results[0].likes_count + 1,
                                like_id: data.id,
                            },
                        ],
                    }));
                }
            } catch (err) {
                // console.log("Error occurred during like request:", err);
            }
        };
        

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);

            if (setTripPosts) {
                setTripPosts((prevPosts) => ({
                    ...prevPosts,
                    results: prevPosts.results.map((post) =>
                        post.id === id
                            ? {
                                  ...post,
                                  likes_count: post.likes_count - 1,
                                  like_id: null,
                              }
                            : post
                    ),
                }));
            } else if (props.setTripPost) {
                props.setTripPost((prevPost) => ({
                    results: [
                        {
                            ...prevPost.results[0],
                            likes_count: prevPost.results[0].likes_count - 1,
                            like_id: null,
                        },
                    ],
                }));
            }
        } catch (err) {
            // console.log(err);
        }
    };

    // Function to convert content into JSX elements with line breaks
    const renderContentWithBreaks = (content) => {
        if (!content) return null; // Return null if content is undefined or empty
        return content.split("\n").map((str, index) => (
            <span key={index}>
                {str}
                <br />
            </span>
        ));
    };

    return (
        <Card className={styles.TripPost}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link
                        to={`/profiles/${profile_id}`}
                        className={styles.Username}
                    >
                        <Avatar src={profile_image} height={55} />
                        {owner}
                    </Link>
                    <div className="d-flex align-items-center">
                        <span>{updated_at}</span>
                        {is_owner && isSinglePostPage && (
                            <OptionsDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDeleteClick}
                            />
                        )}
                    </div>
                </Media>
            </Card.Body>
            <Card.Body>
                {title && (
                    <Card.Title
                        className={`${appStyles.DmSerifFont} ${styles.TripPostTitle} text-center`}
                    >
                        {title}
                    </Card.Title>
                )}
            </Card.Body>

            <Card.Body>
                <div className="text-center">
                    <p>
                        <strong>
                            <i className="fa-solid fa-location-dot"></i>
                        </strong>{" "}
                        {cityName ? `${cityName}, ` : ""}
                        {countryName}
                    </p>
                </div>
            </Card.Body>

            <Link to={`/posts/${id}`}>
                <Card.Img
                    className={styles.TripPostImage}
                    src={image}
                    alt={title}
                />
            </Link>

            <Card.Body>
                <div className="align-items-center">
                    <div>
                        <strong>Traveller Number:</strong>{" "}
                        {details?.traveller_number}
                    </div>

                    <div>
                        <strong>Relevant for:</strong> {details?.relevant_for}
                    </div>

                    <div>
                        <strong>Duration:</strong> {details?.duration_display}
                    </div>
                </div>
            </Card.Body>

            <Card.Body>
                {/* Show truncated content in the feed */}
                {!isSinglePostPage && (
                    <>
                        <Card.Text className={appStyles.TextLeft}>
                            {renderContentWithBreaks(truncatedContent)}{" "}
                            {/* Render truncated content with line breaks */}
                        </Card.Text>
                        <div className="d-flex justify-content-end">
                            <Link
                                to={`/posts/${id}`}
                                className={styles.ReadMore}
                            >
                                Read More
                            </Link>
                        </div>
                    </>
                )}
                {/* Show full content on the post page */}
                {isSinglePostPage && (
                    <Card.Text className={appStyles.TextLeft}>
                        {renderContentWithBreaks(content)}
                    </Card.Text>
                )}{" "}
                {/* Render full content with line breaks */}
                <div className={styles.PostBar}>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>You can't like your own post!</Tooltip>
                            }
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleUnlike}>
                            <i className={`fas fa-heart ${styles.Heart}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <i
                                className={`far fa-heart ${styles.HeartOutline}`}
                            />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to like posts!</Tooltip>}
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <Link
                        to={`/posts/${id}`}
                        aria-label="Link to comments for this post."
                    >
                        <i className="fa-solid fa-comments" />
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>

            {/* Delete Confirmation Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this post? This action
                    cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};

export default TripPost;
