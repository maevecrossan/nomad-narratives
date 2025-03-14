import React, {useState} from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import axios from 'axios';

const SignInForm = () => {
	const [signInData, setSignInData] = useState({
            username: '',
            password: '',
        });
    
    const { username, password} = signInData;

    const [errors, setErrors] = useState({});
    
    const history = useHistory();

    const handleChange = (event) => {
		setSignInData({
			...signInData,
			[event.target.name]: event.target.value,
		})
	}

    const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post("/dj-rest-auth/login/", signInData);
			history.push("/my-feed");
		} catch (err) {
			setErrors(err.response?.data);
		}
	};

	return (
        <Container
		className={`${styles.SignUpForm} d-flex flex-column align-items-center justify-content-center ${styles["si-bg-image"]}`}
		>
		<Row>
			<Col>
				<h1 className={`${styles.Header}`}>Sign In</h1>
			</Col>
		</Row>

		<Row>
			<Col>
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="username">
					<Form.Label className="d-none">username</Form.Label>
					<Form.Control
						className={styles.Input}
						type="text"
						placeholder="Username"
						name="username"
						value={username}
						onChange={handleChange}
					/>
					</Form.Group>
					{errors.username?.map((message, idx) => (
						<Alert variant="warning" key={idx}>
							{message}
						</Alert>
					))}

					<Form.Group controlId="password">
					<Form.Label className="d-none">Password</Form.Label>
					<Form.Control
						className={styles.Input}
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={handleChange}
					/>
					</Form.Group>
					{errors.password?.map((message, idx) => (
						<Alert variant="warning" key={idx}>
							{message}
						</Alert>
					))}

					<Button
					className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
					type="submit"
					>
						Sign in
					</Button>
					{errors.non_field_errors?.map((message, idx) => (
						<Alert key={idx} variant="warning" className="mt-3">
							{message}
						</Alert>
					))}

				</Form>
			</Col>
		</Row>

		<Row>
			<Col>
				<Link className={styles.Link} to="/sign-up">
					Don't have an account? Sign up here!
				</Link>
			</Col>
		</Row>

		</Container>
	);
};

export default SignInForm;