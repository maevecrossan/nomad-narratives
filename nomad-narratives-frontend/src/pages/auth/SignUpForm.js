import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import axios from 'axios';
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
	useRedirect('loggedIn');
	const [signUpData, setSignUpData] = useState({
		username: '',
		password1: '',
		password2: '',
	});
	const { username, password1, password2 } = signUpData;

	const [errors, setErrors] = useState({});

	const history = useHistory();

	const handleChange = (event) => {
		setSignUpData({
			...signUpData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post("/dj-rest-auth/registration/", signUpData);
			history.push("/sign-in");
		} catch (err) {
			setErrors(err.response?.data);
		}
	};

	const [isChecked, setIsChecked] = useState(false);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	return (
		<Container
		className={`d-flex flex-column align-items-center justify-content-center ${styles.SignUpBgImage}`}
		>
		<Row>
			<Col>
				<h1 className={`${styles.Header}`}>Sign Up</h1>
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
						aria-label="Enter your username"
						required
					/>
					</Form.Group>
					{errors.username?.map((message, idx) => (
						<Alert variant="warning" key={idx}>
							{message}
						</Alert>
					))}

					<Form.Group controlId="password1">
					<Form.Label className="d-none">Password</Form.Label>
					<Form.Control
						className={styles.Input}
						type="password"
						placeholder="Password"
						name="password1"
						value={password1}
						onChange={handleChange}
						aria-label="Enter your password"
						required
					/>
					</Form.Group>
					{errors.password1?.map((message, idx) => (
						<Alert variant="warning" key={idx}>
							{message}
						</Alert>
					))}

					<Form.Group controlId="password2">
					<Form.Label className="d-none">Confirm password</Form.Label>
					<Form.Control
						className={styles.Input}
						type="password"
						placeholder="Confirm password"
						name="password2"
						value={password2}
						onChange={handleChange}
						aria-label="Enter your password again"
						required
					/>
					</Form.Group>
					{errors.password2?.map((message, idx) => (
						<Alert variant="warning" key={idx}>
							{message}
						</Alert>
					))}

					<Form.Group  className={styles.Link} controlId="formCheckbox">
						<Form.Check 
							type="checkbox" 
							label="I have read and agree to adhere to the community guidelines."
							checked={isChecked}
							onChange={handleCheckboxChange}
							aria-label="Check the box to agree to adhere to the community guidelines"
							required
						/>
						<div className="d-flex justify-content-center">
							<Link className={styles.InlineLink} to="/welcome#community-guidelines">
								<strong>
									Read our community guidelines
								</strong>	
							</Link>
						</div>
					</Form.Group>

					<Button
					className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
					type="submit"
					disabled={!isChecked}
					>
						Sign up
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
				<Link className={styles.Link} to="/sign-in">
					Already have an account? <span className={styles.InlineLink}>Sign in here.</span>
				</Link>
			</Col>
		</Row>

		</Container>
	);
};

export default SignUpForm;
