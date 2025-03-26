import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/ContactForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import axios from "axios";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        sender_name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");

    const { sender_name, email, message } = formData;

    // Handle input changes
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post("contact/", formData);
            setStatus("Message sent successfully!");
            setFormData({ 
                sender_name: "", 
                email: "", 
                message: "" });
        } catch (err) {
            setErrors(err.response?.data || {});
            setStatus(""); // Clear success status if there's an error
        }
    };

    return (
        <Container
            className={`d-flex flex-column align-items-center justify-content-center ${styles.ContactBgImage}`}
        >
            <Row>
                <Col>
                    <h1 className={`${styles.Header}`}>Contact Us</h1>
                    <p className={`${styles.InfoText} mb-4`}>
                        See a bug? Have a question or suggestion? Get in touch with us below!
                    </p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        {/* Sender Name */}
                        <Form.Group controlId="sender_name">
                            <Form.Label className="d-none">Name</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="text"
                                placeholder="Your Name"
                                name="sender_name"
                                value={sender_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.sender_name?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        {/* Email */}
                        <Form.Group controlId="email">
                            <Form.Label className="d-none">Email</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="email"
                                placeholder="Your Email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.email?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        {/* Message */}
                        <Form.Group controlId="message">
                            <Form.Label className="d-none">Message</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                as="textarea"
                                placeholder="Your Message"
                                name="message"
                                value={message}
                                onChange={handleChange}
                                rows={4}
                            />
                        </Form.Group>
                        {errors.message?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        {/* Submit Button */}
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                            type="submit"
                        >
                            Send Message
                        </Button>

                        {/* Non-field errors */}
                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert key={idx} variant="warning" className="mt-3">
                                {message}
                            </Alert>
                        ))}
                    </Form>
                </Col>
            </Row>

            {/* Status Message */}
            {status && (
                <Row>
                    <Col>
                        <Alert variant="success">{status}</Alert>
                    </Col>
                </Row>
            )}

            {/* Link back to welcome page */}
            <Row>
                <Col>
                    <Link className={styles.Link} to="/">
                        Go back to home
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactForm;
