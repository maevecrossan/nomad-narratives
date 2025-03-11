import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../styles/WelcomePage.module.css'

const WelcomePage = () => {
    return (
        <Container fluid>
            <Row className={styles.Row}>
                <Col className={styles.Hero}>
                    <h1> 
                        Welcome to <span>Nomad Narratives</span>
                    </h1>
                </Col>
            </Row>

            <Row className={styles.Row}>
                <Col className={styles.ImageCol}> 
                    <img className={styles.ImageCol} src='https://res.cloudinary.com/dimeyes2b/image/upload/v1741679079/home-image-1_qcmr5e.jpg' alt='Waves crashing again rough, black volcanic rocks.'></img>
                </Col>
                
                <Col className={styles.TextCol}> 
                    <h2>About Us</h2> 
                    <p>Welcome to Nomad Narratives – a travel blog where every journey has a story. Whether you’re chasing sunsets in Bali, backpacking through Europe, or discovering hidden gems in your own backyard, this is the place to share and explore real travel experiences.</p>
                    <p>Browse stories by destination, topic, or traveller, and immerse yourself in stunning visuals from around the world. Join our community, share your adventures, and get inspired for your next trip!</p>
                    <p>Where will your next story take you? 🌍✈️</p>
                </Col>
            </Row>
            
            <Row className={styles.Row}>
                <Col className={styles.TextCol}> 
                    <h2>Community Guidelines</h2>
                </Col>
            </Row>
        </Container>
    );
}

export default WelcomePage;