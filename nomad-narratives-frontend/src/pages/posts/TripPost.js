import React, { useState, useEffect } from "react";
import styles from "../../styles/TripPost.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import axios from "axios";
import { axiosRes } from "../../api/axiosDefaults";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const TripPost = (props) => {

    const {
            id,
            owner,
            created_at,
            updated_at,
            profile_id,
            profile_image,
            title,
            content,
            image,
            comments_count,
            likes_count,
            like_id,
            TripPostPage,
            setTripPost,
            details,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner
    const countryId = details?.country;
    const cityId = details?.city;

    const [countries, setCountries] = useState([]);
    const [cityName, setCityName] = useState("");

    // Truncate content to show only a portion in the feed
    const truncateContent = (content, maxLength = 300) => {
        if (!content) return "";
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + "...";
    };

    const truncatedContent = truncateContent(content);


    useEffect(() => {
        // Fetch all countries
        axios.get(`${API_URL}/api/countries/`)
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                console.error("Error fetching countries:", error);
                setCountries([]);
            });

        // Fetch city if available
        if (countryId && cityId) {
            axios.get(`${API_URL}/api/cities/${countryId}/`)
                .then(response => {
                    const city = response.data.find(c => c.id === cityId);
                    setCityName(city ? city.name : "Unknown City");
                })
                .catch(error => {
                    console.error("Error fetching city:", error);
                    setCityName("Unknown City");
                });
        }
    }, [countryId, cityId]);


    const countryName = countries.find(c => c.id === countryId)?.name || "Unknown Country";

    const handleLike = async () => {
        let isMounted = true;

        try {
            const { data } = await axiosRes.post("/likes/", { post: id });
            if (isMounted) { // Only update state if still mounted
                setTripPost((prevPosts) => ({
                    ...prevPosts,
                    results: prevPosts.results.map((post) => 
                        post.id === id ? { ...post, likes_count: post.likes_count + 1, like_id: data.id } : post
                    ),
                }));
            }
        } catch (err) {
            console.log(err);
        }
        return () => { isMounted = false; };
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setTripPost((prevPosts) => ({
            ...prevPosts,
            results: prevPosts.results.map((post) => {
                return post.id === id
                ? { ...post, likes_count: post.likes_count - 1, like_id: null }
                : post;
            }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    // Function to convert content into JSX elements with line breaks
    const renderContentWithBreaks = (content) => {
        return content.split("\n").map((str, index) => (
            <span key={index}>
                {str}
                <br />
            </span>
        ));
    };    

    return <Card className={styles.TripPost}>
        <Card.Body>
            <Media className="align-items-center justify-content-between">
                <Link 
                    to={`/profiles/${profile_id}`}
                    className={styles.Username}
                    >
                    <Avatar src={profile_image} height={55}/>
                    {owner}
                </Link>
                <div className="d-flex align-items-center">
                    <span>{updated_at}</span>
                    {is_owner && TripPostPage && "..."}
                </div>
            </Media>
        </Card.Body>
        <Card.Body>
            {title && <Card.Title className="text-center">{title}</Card.Title>}
        </Card.Body>
        
        <Card.Body>
            <div className="text-center">
                <p>
                    <strong>Location:</strong> {cityName ? `${cityName}, ` : ""}
                    {countryName}
                </p>
            </div>
        </Card.Body>

        <Link to={`/posts/${id}`}>
            <Card.Img className={styles.TripPostImage} src={image} alt={title}/>
        </Link>

        <Card.Body>
            <div className="d-flex align-items-center justify-content-around">
                <p>
                    <strong>Traveller Number:</strong> {details?.traveller_number}
                </p>

                <p>
                    <strong>Relevant for:</strong> {details?.relevant_for}
                </p>

                <p>
                    <strong>Duration:</strong> {details?.duration_display}
                </p>
            </div>
        </Card.Body>

        <Card.Body>
            {/* Show truncated content in the feed */}
            {!TripPostPage && (
                    <>
                        <Card.Text>{truncatedContent}</Card.Text>
                        <Link to={`/posts/${id}`} className={styles.ReadMore}>
                            Read More
                        </Link>
                    </>
                )}

            {/* Show full content on the post page */}
            {TripPostPage && <Card.Text>{content}</Card.Text>}

            <div className={styles.PostBar}>
                {is_owner ? (
                    <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>You can't like your own post!</Tooltip>}
                    >
                        <i className="far fa-heart" />
                    </OverlayTrigger>
                ) : like_id ? (
                    <span onClick={handleUnlike}>
                        <i className={`fas fa-heart ${styles.Heart}`} />
                    </span>
                ) : currentUser ? (
                    <span onClick={handleLike}>
                        <i className={`far fa-heart ${styles.HeartOutline}`} />
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
                <Link to={`/posts/${id}`}>
                    <i className="fa-solid fa-comments" />
                </Link>
                {comments_count}
            </div>
        </Card.Body>
    </Card>
}

export default TripPost;