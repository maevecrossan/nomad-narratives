import styles from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";

import NavBar from "./components/NavBar";
import { useCurrentUser } from "./contexts/CurrentUserContext";

import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";

import WelcomePage from "./pages/WelcomePage";

import TripPostPage from "./pages/posts/TripPostPage";
import TripPostFeed from "./pages/posts/TripPostFeed";
import TripPostEditForm from "./pages/posts/TripPostEditForm";
import TripPostCreateForm from "./pages/posts/TripPostCreateForm";

import UserProfilePage from "./pages/profiles//UserProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import ContactForm from "./pages/contact/ContactForm";
import PageNotFound from './components/PageNotFound';

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
                        exact
                        path="/profiles/:id/edit/username"
                        render={() => <UsernameForm />}
                    />
                    <Route
                        exact
                        path="/profiles/:id/edit/password"
                        render={() => <UserPasswordForm />}
                    />
                    <Route
                        exact
                        path="/profiles/:id/edit"
                        render={() => <ProfileEditForm />}
                    />

                    <Route
                        // TripPostFeed but with no filters. Renamed to 'explore' for better UX.
                        exact
                        path="/explore"
                        render={() => (
                            <TripPostFeed message="No results found. Please try another search term." />
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
                        path="/profiles/:id"
                        render={() => <UserProfilePage />}
                    />

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

                    <Route
                        exact
                        path="/posts/:id/edit"
                        render={() => <TripPostEditForm />}
                    />

                    <Route
                        exact
                        path="/contact"
                        render={() => <ContactForm />}
                    />

                    <Route 
                        path="*"
                        render={() => <PageNotFound />} />
                </Switch>
            </Container>
        </div>
    );
}

export default App;
