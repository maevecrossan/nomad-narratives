import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";

const SignUpForm = () => {
	return (
		<Container
		className={`${styles.SignUpForm} d-flex flex-column align-items-center justify-content-center ${styles["bg-image"]}`}
		>
		<Row>
			<Col>
				<h1 className={`${styles.Header}`}>Sign Up</h1>
			</Col>
		</Row>

		<Row>
			<Col>
				<Form>
					<Form.Group controlId="username">
					<Form.Label className="d-none">username</Form.Label>
					<Form.Control
						className={styles.Input}
						type="text"
						placeholder="Username"
						name="username"
					/>
					</Form.Group>

					<Form.Group controlId="password1">
					<Form.Label className="d-none">Password</Form.Label>
					<Form.Control
						className={styles.Input}
						type="password"
						placeholder="Password"
						name="password1"
					/>
					</Form.Group>

					<Form.Group controlId="password2">
					<Form.Label className="d-none">Confirm password</Form.Label>
					<Form.Control
						className={styles.Input}
						type="password"
						placeholder="Confirm password"
						name="password2"
					/>
					</Form.Group>

					<Button
					className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
					type="submit"
					>
						Sign up
					</Button>
				</Form>
			</Col>
		</Row>

		<Row>
			<Col>
				<Link className={styles.Link} to="/signin">
					Already have an account? Sign in here.
				</Link>
			</Col>
		</Row>

		</Container>
	);
};

export default SignUpForm;
