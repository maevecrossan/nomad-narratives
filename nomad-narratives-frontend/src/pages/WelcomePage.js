import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const WelcomePage = () => {
    return (
        <Container fluid>
            <Row>
                <Col> Greeting / hero </Col>
            </Row>

            <Row>
                <Col> About Us Graphic </Col>
                <Col> About Us Statement </Col>
            </Row>
            
            <Row>
                <Col> Guidelines Header </Col>
            </Row>
            <Row>
                <Col> Guidelines info </Col>
            </Row>
        </Container>

    );
}

export default WelcomePage;