import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import {Route, Switch} from 'react-router-dom'

function App() {
return (
	<div className={styles.App}>
		< NavBar />
		<Container className={styles.Main}>
			<Switch>
				<Route exact path="/welcome" render={() => <h1>Welcome</h1>} />
				<Route exact path="/myfeed" render={() => <h1>My Feed</h1>} />
				<Route exact path="/myprofile" render={() => <h1>My Profile</h1>} />
				<Route exact path="/logout" render={() => <h1>Log Out</h1>} />
				<Route exact path="/aboutus" render={() => <h1>About Us</h1>} />
				<Route exact path="/communityguidelines" render={() => <h1>Community Guidelines</h1>} />
				<Route exact path="/signin" render={() => <h1>Sign In</h1>} />
				<Route exact path="/signup" render={() => <h1>Sign Up</h1>} />
			</Switch>
		</Container>
	</div>
);
}

export default App;