import { useRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MealCardDetail from '@/src/components/MealCardDetail';

export default function MealById() {
    const router = useRouter();
    const { mealID } = router.query;

    return (
        <Row>
            <Col>
                <MealCardDetail mealID={mealID} />
            </Col>
        </Row>
    );
}