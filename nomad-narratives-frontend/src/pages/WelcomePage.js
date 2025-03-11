import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../styles/WelcomePage.module.css'

// Add slogan below greeting
// Add min-widths
// Hide image on mobile

const WelcomePage = () => {
    return (
        <Container fluid>
            <Row className={styles.Row}>
                <Col className={styles.Hero}>
                    <h1 className={styles.WelcomeH1}> 
                        Welcome to <span>Nomad Narratives</span>
                    </h1>
                </Col>
            </Row>

            <Row className={styles.Row}>
                <Col className={styles.ImageCol}> 
                    <img className={styles.ImageCol} src='https://res.cloudinary.com/dimeyes2b/image/upload/v1741679079/home-image-1_qcmr5e.jpg' alt='Waves crashing again rough, black volcanic rocks.'></img>
                </Col>
                
                <Col className={styles.TextCol}> 
                    <h2 className={styles.SubSectionTitle}>About Us</h2> 
                    <p>Welcome to Nomad Narratives – a travel blog where every journey has a story. Whether you’re chasing sunsets in Bali, backpacking through Europe, or discovering hidden gems in your own backyard, this is the place to share and explore real travel experiences.</p>
                    <p>Browse stories by destination, topic, or traveller, and immerse yourself in stunning visuals from around the world. Join our community, share your adventures, and get inspired for your next trip!</p>
                    <p>Where will your next story take you? 🌍✈️</p>
                </Col>
            </Row>
            
            <Row className={styles.Row}>
                <Col className={styles.TextCol}> 
                    <h2 className={styles.SubSectionTitle}>Community Guidelines</h2>
                    <p>Welcome to Nomad Narratives! We're thrilled to have you as part of our community of travelers, storytellers, and adventure-seekers. To ensure this space remains welcoming, inspiring, and respectful for all, please follow these guidelines:</p>

                    <p>
                        <strong>
                            1. Be Respectful & Kind
                        </strong>
                    </p>
                    <p>
                        Everyone’s journey is unique. Treat fellow travelers with respect, even if you have different opinions or experiences. No hate speech, discrimination, or harassment of any kind will be tolerated.
                    </p>

                    <p>
                        <strong>
                            2. Share Honest & Authentic Stories
                        </strong>
                    </p>
                    <p>
                        We value genuine travel experiences. Share your stories truthfully and avoid misinformation, exaggerated claims, or misleading content.
                    </p>

                    <p>
                        <strong>
                            3. Give Credit Where It's Due
                        </strong>
                    </p>
                    <p>
                        If you include photos, quotes, or recommendations from others, be sure to give proper credit. Plagiarism or unauthorized use of content is not allowed.
                    </p>
                    
                    <p>
                        <strong>
                            4. Keep It Safe & Responsible
                        </strong>
                    </p>
                    <p>
                        Avoid sharing dangerous or reckless travel behaviors that could put others at risk. Be mindful of local cultures, customs, and environments when sharing your experiences.
                    </p>
                    
                    <p>
                        <strong>
                            5. No Spam or Self-Promotion
                        </strong>
                    </p>
                    <p>
                        We love hearing about your travels, but excessive self-promotion, ads, or irrelevant content will be removed. If you want to collaborate or promote something, please reach out to us directly.
                    </p>
                    
                    <p>
                        <strong>
                            6. Protect Privacy
                        </strong>
                    </p>
                    <p>
                        Don’t share personal or sensitive information—yours or others'. Respect people’s privacy when posting about your experiences.
                    </p>
                    
                    <p>
                        <strong>
                            7. Report Issues
                        </strong>
                    </p>
                    <p>
                        If you see content that violates these guidelines, please report it. We’re committed to maintaining a positive and supportive space for all travelers.
                    </p>

                    <p>
                        By being a user of Nomad Narratives, you agree to uphold these guidelines and contribute to a vibrant, respectful, and inspiring travel community. Let’s explore the world together—one story at a time! 🌍✨
                    </p>

                </Col>
            </Row>
        </Container>
    );
}

export default WelcomePage;