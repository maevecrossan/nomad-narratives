import React from 'react';
import styles from "../../styles/TripPost.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

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
            image_alt_text,
            comments_count,
            likes_count,
            likes_id,
            continent,
            country,
            city,
            traveller_number,
            relevant_for,
            duration_value,
            duration_unit,
            TripPostPage,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/likes/", { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                return post.id === id
                    ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
                    : post;
                }),
            }));
        } catch (err) {
            console.log(err);
            }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setPosts((prevPosts) => ({
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

    

    return <Card className={styles.TripPost}>
        <Card.Body>
            <Media className="align-items-center justify-content-between">
                <Link to={`/profiles/${profile_id}`}>
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

        <Link to={`/posts/${id}`}>
            <Card.Img src={image} alt={title}/>
        </Link>

        <Card.Body>
            {content && <Card.Text>{content}</Card.Text>}

            <div className={styles.PostBar}>
                {is_owner ? (
                    <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>You can't like your own post!</Tooltip>}
                    >
                        <i className="far fa-heart" />
                    </OverlayTrigger>
                ) : likes_id ? (
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