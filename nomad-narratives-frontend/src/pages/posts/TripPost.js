import React from 'react';
import styles from "../../styles/TripPost.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from "react-bootstrap";
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
            duration_unit
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

    return <Card className={styles.TripPost}>
        <Card.Body>
            <Media className="align-items-center justify-content-between">
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} height={55}/>
                    {owner}
                </Link>
            </Media>
        </Card.Body>
    </Card>
}

export default TripPost