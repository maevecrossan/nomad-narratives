import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import {Route, Switch} from 'react-router-dom';
import './api/axiosDefaults';

function App() {
return (
	<div className={styles.App}>
		< NavBar />
		<Container className={styles.Main}>
			<Switch>
				<Route 
					exact 
					path="/welcome" 
					render={() => <h1>Welcome</h1>} />

				<Route 
					exact 
					path="/my-feed" 
					render={() => <h1>My Feed</h1>} />

				<Route 
					exact 
					path="/my-profile" 
					render={() => <h1>My Profile</h1>} />

				<Route 
					exact 
					path="/explore" 
					render={() => <h1>Explore</h1>} />

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
					path="/log-out" 
					render={() => <h1>Log Out</h1>} />
				
				<Route 
					exact 
					path="/about-us" 
					render={() => <h1>About Us</h1>} />
				
				<Route 
					exact 
					path="/community-guidelines" 
					render={() => <h1>Community Guidelines</h1>} />

				<Route 
					exact 
					path="/sign-in" render={() => <h1>Sign In</h1>} />

				<Route 
					exact 
					path="/sign-up" 
					render={() => <h1>Sign Up</h1>} />
			</Switch>
		</Container>
	</div>
);
}

export default App;