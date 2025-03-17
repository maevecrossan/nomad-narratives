import React, { useRef, useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/TripPostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";

import { useHistory } from "react-router";
import axios from "axios";
import { axiosReq } from "../../api/axiosDefaults";

function PostCreateForm() {
    const [errors, setErrors] = useState({});

    const [tripPostData, setTripPostData] = useState({
        title: "",
        content: "",
        image: "",
        country: "",
        city: "",
    });

    const { title, content, image, country, city } = tripPostData;

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const imageInput = useRef(null);
    const history = useHistory();

    const handleChange = (event) => {
        setTripPostData({
            ...tripPostData,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        // Fetch all countries when the component mounts
        axios
            .get("http://localhost:8000/api/countries/") // CHANGE FOR DEPLOYMENT
            .then((response) => {
                setCountries(response.data.results);
            })
            .catch((error) => {
                console.error("Error fetching countries", error);
            });
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            // Fetch cities when a country is selected
            axios
                .get(
                    `http://localhost:8000/api/cities/by-country?country=${selectedCountry}`
                ) // CHANGE FOR DEPLOYMENT
                .then((response) => {
                    setCities(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching cities", error);
                });
        }
    }, [selectedCountry]);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setTripPostData({
                ...tripPostData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", imageInput.current.files[0]);
        formData.append("country", country);
        formData.append("city", city);

        try {
            const { data } = await axiosReq.post("/posts/", formData);
            history.push(`/posts/${data.id}`); // Correct string interpolation
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div className="text-center">
            {/* Add your form fields here */}
            <Form.Group>
                <Form.Label>Title:</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Your Content:</Form.Label>
                <Form.Control
                    as="textarea"
                    name="content"
                    rows={10}
                    value={content}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="countrySelect">
                <Form.Label>Select Country</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedCountry || ""}
                    onChange={handleCountryChange}
                >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="citySelect">
                <Form.Label>Select City</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedCity || ""}
                    onChange={handleCityChange}
                    disabled={!selectedCountry}
                >
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Traveller Number:</Form.Label>
                <Form.Control
                    type="number"
                    name="traveller_number"
                    value={tripPostData.traveller_number || ""}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="relevantForSelect">
                <Form.Label>Relevant For:</Form.Label>
                <Form.Control
                    as="select"
                    name="relevant_for"
                    value={tripPostData.relevant_for || ""}
                    onChange={handleChange}
                >
                    <option value="">Select a group</option>
                    <option value="all">All Genders & Orientations</option>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="nonbinary">Non-Binary</option>
                    <option value="lgbtq">LGBTQ+ Travelers</option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Duration:</Form.Label>
                <Row>
                    <Col>
                        <Form.Control
                            type="number"
                            name="duration_value"
                            value={tripPostData.duration_value || ""}
                            onChange={handleChange}
                            placeholder="Enter number"
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            as="select"
                            name="duration_unit"
                            value={tripPostData.duration_unit || ""}
                            onChange={handleChange}
                        >
                            <option value="days">Day(s)</option>
                            <option value="weeks">Week(s)</option>
                            <option value="months">Month(s)</option>
                            <option value="years">Year(s)</option>
                        </Form.Control>
                    </Col>
                </Row>
            </Form.Group>

            <Button
                className={`${btnStyles.Button} ${btnStyles.Brown}`}
                onClick={() => {}}
            >
                cancel
            </Button>
            <Button
                className={`${btnStyles.Button} ${btnStyles.Brown}`}
                type="submit"
            >
                create
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={5} lg={4}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            {image ? (
                                <>
                                    <figure>
                                        <Image
                                            className={appStyles.Image}
                                            src={image}
                                            rounded
                                        />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} ${btnStyles.Brown} btn`}
                                            htmlFor="image-upload"
                                        >
                                            Change image
                                        </Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label
                                    className="d-flex justify-content-center"
                                    htmlFor="image-upload"
                                >
                                    <Asset
                                        src={Upload}
                                        message="Click or tap here to upload an image."
                                    />
                                </Form.Label>
                            )}

                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                style={{ display: "none" }}
                                ref={imageInput}
                            />
                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={7} lg={8} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>
                        {textFields}
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default PostCreateForm;
