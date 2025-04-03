import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const UserPasswordForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const currentUser = useCurrentUser();

    const [userData, setUserData] = useState({
        new_password1: "",
        new_password2: "",
    });
    const { new_password1, new_password2 } = userData;

    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        if (currentUser?.profile_id?.toString() !== id) {
            // redirect user if they are not the owner of this profile
            history.push("/");
        }
    }, [currentUser, history, id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.post("/dj-rest-auth/password/change/", userData);
            setShowModal(true);
        } catch (err) {
            // console.log(err);
            setErrors(err.response?.data);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        history.push(`/profiles/${id}`); // Redirect to profile page after modal is closed
    };

    return (
        <Row>
            <Col className="py-2 mx-auto text-center" md={6}>
                <Container className={appStyles.Content}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>New password</Form.Label>
                            <Form.Control
                                placeholder="new password"
                                type="password"
                                value={new_password1}
                                onChange={handleChange}
                                name="new_password1"
                            />
                        </Form.Group>
                        {errors?.new_password1?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Form.Group>
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                placeholder="confirm new password"
                                type="password"
                                value={new_password2}
                                onChange={handleChange}
                                name="new_password2"
                            />
                        </Form.Group>
                        {errors?.new_password2?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Brown}`}
                            onClick={() => history.goBack()}
                        >
                            cancel
                        </Button>
                        <Button
                            type="submit"
                            className={`${btnStyles.Button} ${btnStyles.Brown}`}
                        >
                            save
                        </Button>
                    </Form>
                </Container>
            </Col>

            {/* Success Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Password Changed</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your password has been successfully changed.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleCloseModal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </Row>
    );
};

export default UserPasswordForm;
