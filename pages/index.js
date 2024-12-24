import { useEffect, useState } from 'react'; 
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap'; 
import Slider from '@/src/components/Slider';  

export default function Home() { 
  const [randomMeal, setRandomMeal] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchRandomMeal = async () => { 
      try { 
        console.log("Fetching random meal...");
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php'); 
        const data = await response.json(); 

        console.log("API Response:", data);
        
        // Check if we received the meal data
        if (data && data.meals && data.meals[0]) { 
          setRandomMeal(data.meals[0]);
          console.log("Random Meal Set:", data.meals[0]);
        } else { 
          console.error("No meal data found"); 
        } 
      } catch (error) { 
        console.error("Error fetching data:", error); 
      } finally { 
        setLoading(false); 
      } 
    }; 

    fetchRandomMeal(); 
  }, []); 

  return ( 
    <Container>
      <Row className="mt-5">
        <Col md={12} className="text-center">
          <h2>Hungry? Look up the recipes of your favourite meals!</h2>
        </Col>
      </Row>
      <br/><br/>
      <Slider />
    </Container> 
  ); 
}
