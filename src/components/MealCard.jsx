import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error';


export default function MealCard({mealID}) {
    const { data, error } = useSWR(mealID ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}` : null);

    if(error){
        return <Error statusCode={404} />
    }

    if (!data || !data.meals || !data.meals[0]) { 
        return null;
    }

    const meal = data.meals[0];

    return (
        <>
            <Card>
                <Card.Img
                    variant="top"
                    src={meal.strMealThumb ? meal.strMealThumb : 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} />
                <Card.Title style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginLeft: '10px', marginTop: '10px',}}>{meal.strMeal || 'N/A'}</Card.Title>
                <Card.Text style={{ marginLeft: '10px',}}>
                    Category: {meal.strCategory || 'N/A'}<br />
                    Area: {meal.strArea || 'N/A'}<br />
                </Card.Text>
                <Link href={`/meal/${meal.idMeal}`} passHref>
                    <Button style={{ backgroundColor: '#343a40', marginLeft: '10px', marginBottom: '10px',}} variant="primary">View Recipe</Button>
                </Link>
            </Card>
        </>
    );
}