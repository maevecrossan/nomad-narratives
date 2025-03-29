import NotFound from '../../src/assets/not-found.png';
import styles from '../../src/styles/PageNotFound.module.css';
import Asset from './Asset';

const PageNotFound = () => {
    return (
        <div className={styles.NotFoundGraphic}>
            <Asset src={NotFound} message="Sorry, the page you're looking for doesn't exist." />
        </div>
    );
}

export default PageNotFound;