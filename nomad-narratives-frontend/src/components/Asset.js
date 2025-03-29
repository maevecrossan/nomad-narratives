import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styles from "../styles/Asset.module.css";

const Asset = ({ spinner, src, message }) => {
    return (
        <>
            {spinner && <Spinner animation="grow" variant="light" />}

            {src && <img src={src} alt={message} className={styles.Image} />}

            {message && (
                <span className={`${styles.Message} mt-4`}>{message}</span>
            )}
        </>
    );
};

export default Asset;
