import { Container } from 'react-bootstrap';
import MainNav from './MainNav';


export default function Layout(props) {
    return (
        <>
            <MainNav />
            <br />
            <Container>
                {props.children}
            </Container>
            <br />
            <footer>
                <p style={{ fontSize: '0.8rem', textAlign: 'right', margin: 0 }}>
                    Recipe data powered by <a href="https://www.themealdb.com/" target="_blank" rel="noopener noreferrer">TheMealDB</a>.
                </p>
            </footer>
        </>
    )
}