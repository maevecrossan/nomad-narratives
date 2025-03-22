import styles from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import WelcomePage from "./pages/WelcomePage";
import SignInForm from "./pages/auth/SignInForm";
import TripPostCreateForm from "./pages/posts/TripPostCreateForm";
import TripPostPage from "./pages/posts/TripPostPage";
import TripPostFeed from "./pages/posts/TripPostFeed";
import { useCurrentUser } from "./contexts/CurrentUserContext";

function App() {
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || "";

    return (
        <div className={styles.App}>
            <NavBar />
            <Container className={styles.Main}>
                <Switch>
                    <Route exact path="/" render={() => <WelcomePage />} />

                    <Route
                    // TripPostFeed but with no filters. Renamed to 'explore' for better UX.
                        exact
                        path="/explore"
                        render={() => (
                            <TripPostFeed
                                message="No results found. Please try another search term."
                            />
                        )}
                    />

                    <Route
                        exact
                        path="/my-feed"
                        render={() => (
                            <TripPostFeed
                                message="No results found. Please try another search term or follow a user."
                                filter={`owner__followed__owner__profile=${profile_id}&`}
                            />
                        )}
                    />

                    <Route
                        exact
                        path="/liked"
                        render={() => (
                            <TripPostFeed
                                message="No results found. Please try another search term or like a post."
                                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                            />
                        )}
                    />

                    <Route
                        exact
                        path="/profiles"
                        render={() => <h1>My Profile</h1>}
                    />

                    {/* FUTURE DEVELOPMENT: Explore Dropdown */}
                    {/* <Route 
						exact 
						path="/by-region" 
						render={() => <h1>Region</h1>} />

					<Route 
						exact 
						path="/by-country" 
						render={() => <h1>Country</h1>} />
					<Route 
						exact 
						path="/by-city" 
						render={() => <h1>City</h1>} />
					<Route 
						exact 
						path="/by-target-audience" 
						render={() => <h1>Target Audience</h1>} />
					<Route 
						exact 
						path="/by-duration" 
						render={() => <h1>Duration</h1>} /> */}

                    <Route
                        exact
                        path="/about-us"
                        render={() => <h1>About Us</h1>}
                    />

                    <Route
                        exact
                        path="/community-guidelines"
                        render={() => <h1>Community Guidelines</h1>}
                    />

                    <Route
                        exact
                        path="/sign-in"
                        render={() => <SignInForm />}
                    />

                    <Route
                        exact
                        path="/sign-up"
                        render={() => <SignUpForm />}
                    />

                    <Route
                        exact
                        path="/posts/create"
                        render={() => <TripPostCreateForm />}
                    />

                    <Route
                        exact
                        path="/posts/:id"
                        render={() => <TripPostPage />}
                    />
                </Switch>
            </Container>
        </div>
    );
}

export default App;
