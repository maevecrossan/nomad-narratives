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
                About Us Statement 
                </Col>
            </Row>
            
            <Row className={styles.Row}>
                <Col className={styles.ImageCol}> 
                    <img className={styles.ImageCol} src='https://res.cloudinary.com/dimeyes2b/image/upload/v1741679510/126A7896_by84oj.jpg' alt='A korean temple as seenthrough orange and yellow autumn leaves.'></img> 
                </Col>
                <Col className={styles.ImageCol}> 
                    <img className={styles.ImageCol} src='https://res.cloudinary.com/dimeyes2b/image/upload/v1741679624/126A0948_fb0ij6.jpg' alt='A picnic setup in front of the ocean.'></img> 
                </Col>
                <Col className={styles.ImageCol}> 
                    <img className={styles.ImageCol} src='https://res.cloudinary.com/dimeyes2b/image/upload/v1741679620/126A2776_avm2j4.jpg' alt='A yellow front door in Hobbiton.'></img> 
                </Col>
            </Row>
            <Row className={styles.Row}>
                <Col className={styles.TextCol}> 
                Guidelines info 
                </Col>
            </Row>
        </Container>
    );
}

export default WelcomePage;