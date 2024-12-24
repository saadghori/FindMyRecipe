import { Container, Row, Col } from 'react-bootstrap'; 
import Slider from '@/src/components/Slider';  
import SearchBar from '@/src/components/SearchBar';

export default function Home() { 
  return ( 
    <Container fluid="true" className="p-0">
      <Row className="m-0">
        <Col md={12} className="p-0">
          <div
            style={{
              height: '80vh',
              width: '100%',
              backgroundImage: 'url(/images/food.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <h2
              style={{
                textAlign: 'left',
                marginBottom: '20px',
                maxWidth: '500px', 
                width: '100%',
                color: '#343a40',
              }}
            >
              Try a new recipe today!
            </h2>
            <div style={{ maxWidth: '500px', width: '100%' }}>
              <SearchBar placeholder="Search recipes..." />
            </div>
          </div>
        </Col>
      </Row>
      <br/><br/>
      <Slider />
    </Container> 
  ); 
}
