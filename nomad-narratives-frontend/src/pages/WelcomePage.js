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
                <Col> About Us Graphic </Col>
                <Col> About Us Statement </Col>
            </Row>
            
            <Row className={styles.Row}>
                <Col> Guidelines Header </Col>
            </Row>
            <Row className={styles.Row}>
                <Col> Guidelines info </Col>
            </Row>
        </Container>
    );
}

export default WelcomePage;