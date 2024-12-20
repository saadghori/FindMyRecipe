import { useAtom } from 'jotai';
import { favouritesAtom } from "@/store";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import MealCard from '@/src/components/MealCard';


export default function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null;

    return (
        <>
        {favouritesList && (
            <Row className="gy-4">
                {favouritesList.length > 0 ? (
                    favouritesList.map((currentMealID) => (
                        <Col lg={3} key={currentMealID}>
                            <MealCard mealID={currentMealID} />
                        </Col>
                    ))
                ) : (
                    <Card>
                        <h4>Nothing Here</h4>
                        <p>Try adding some new recipes to the list.</p>
                    </Card>
                )}
            </Row>
        )}
        
        </>
    );
}