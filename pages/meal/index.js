import Error from 'next/error';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import MealCard from '@/src/components/MealCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';

const PER_PAGE = 12;

export default function Meal() {
    const [mealList, setMealList] = useState(null);
    const [page, setPage] = useState(1);
    const router = useRouter();
    const { s } = router.query; // Get search term from query
    const finalQuery = s?.trim() ? `s=${s}` : null;

    const { data, error } = useSWR(finalQuery ? `https://www.themealdb.com/api/json/v1/1/search.php?${finalQuery}` : null);

    useEffect(() => {
        if (data) {
            if (data.meals) {
                const results = [];
                const mealsPerPage = PER_PAGE;
                for (let i = 0; i < data.meals.length; i += mealsPerPage) {
                    const chunk = data.meals.slice(i, i + mealsPerPage);
                    results.push(chunk);
                }
                setMealList(results);
            } else {
                setMealList([]); // Handle no results case
            }
            setPage(1);
        }
    }, [data]);

    const previousPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const nextPage = () => {
        if (mealList && page < mealList.length) setPage((prev) => prev + 1);
    };

    if (error) {
        return <Error statusCode={404} />;
    }

    if (mealList === null) {
        return <Card><h4>Loading...</h4></Card>;
    }

    return (
        <>
            {mealList.length > 0 ? (
                <Row className="gy-4">
                    {mealList[page - 1].map((meal) => (
                        <Col lg={3} key={meal.idMeal}>
                            <MealCard mealID={meal.idMeal} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <Card>
                    <h4>Nothing Here</h4>
                    <p>Try searching for something else.</p>
                </Card>
            )}
            <br/><br/>

            {mealList.length > 1 && (
                <Row>
                    <Col>
                        <Pagination>
                            <Pagination.Prev onClick={previousPage} disabled={page === 1} />
                            <Pagination.Item>{page}</Pagination.Item>
                            <Pagination.Next onClick={nextPage} disabled={page === mealList.length} />
                        </Pagination>
                    </Col>
                </Row>
            )}
        </>
    );
}
