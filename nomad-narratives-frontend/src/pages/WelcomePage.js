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