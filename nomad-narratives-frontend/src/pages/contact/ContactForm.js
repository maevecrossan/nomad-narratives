import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import styles from "../../styles/ContactForm.module.css";
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

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("contact/", formData);
            setStatus("Message sent successfully!");
            setFormData({ 
                sender_name: "", 
                email: "", 
                message: "" });
        } catch (err) {
            setErrors(err.response?.data || {});
            setStatus("");
        }
    };

    return (
        <Container
            className={`d-flex flex-column align-items-center justify-content-center text-align-center ${styles.ContactBgImage}`}
        >
            <Row>
                <Col>
                    <h1 className={`${styles.Header}`}>
                        <strong>
                            Contact Us
                        </strong>
                    </h1>
                    <p className={`${styles.InfoText} mb-4`}>
                        See a bug? Have a question or suggestion? Get in touch with us below!
                    </p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId="sender_name">
                            <Form.Label className="d-none">Your name</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="text"
                                placeholder="Name"
                                name="sender_name"
                                value={sender_name}
                                onChange={handleChange}
                                aria-label="Enter your name"
                                required
                            />
                        </Form.Group>
                        {errors.sender_name?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group controlId="email">
                            <Form.Label  className="d-none">Your email</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                aria-label="Enter your email"
                                required
                            />
                        </Form.Group>
                        {errors.email?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group controlId="message">
                            <Form.Label className="d-none">Your message</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                as="textarea"
                                placeholder="Message"
                                name="message"
                                value={message}
                                onChange={handleChange}
                                rows={4}
                                aria-label="Enter your name"
                                required
                            />
                        </Form.Group>
                        {errors.message?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                            type="submit"
                        >
                            Send Message
                        </Button>

                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert key={idx} variant="warning" className="mt-3">
                                {message}
                            </Alert>
                        ))}
                    </Form>
                </Col>
            </Row>

            {status && (
                <Row>
                    <Col>
                        <Alert variant="success">{status}</Alert>
                    </Col>
                </Row>
            )}

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
