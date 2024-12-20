import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState, useEffect } from 'react'
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

export default function MealCardDetail({ mealID }) {
    console.log("MealCardDetail - mealID:", mealID);
    const { data, error } = useSWR(mealID ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}` : null);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(()=>{
        setShowAdded(favouritesList?.includes(mealID))
       }, [favouritesList])
    
    const favouritesClicked = async () => {
        if (showAdded) {
            setFavouritesList(await removeFromFavourites(mealID));
        } else {
            setFavouritesList(await addToFavourites(mealID));
        }
    };

    if (error) {
        console.error("Error fetching meal details:", error);
        return <Error statusCode={404} />;
    }

    if (!data) {
        console.log("No data received yet");
        return null;
    }

    console.log("Meal Data:", data);
    const meal = data.meals?.[0];

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient !== '') {
            ingredients.push(`${ingredient} - ${measure}`);
        }
    }
    
    return (
        <Card>
            {meal?.strMealThumb && (
                <Card.Img
                    variant="top"
                    src={meal.strMealThumb}
                    alt={meal.strMeal || 'Meal Image'}
                    className="img-fluid mx-auto d-block"
                    style={{ maxWidth: '450px', height: 'auto' }}
                />
            )}
            <Card.Body>
                <Card.Title>{meal?.strMeal || 'N/A'}</Card.Title>
                <Card.Text>
                    <strong>Category:</strong> {meal?.strCategory || 'N/A'}<br />
                    <strong>Area:</strong> {meal?.strArea || 'N/A'}<br />
                    <strong>Tags:</strong> {meal?.strTags || 'N/A'}<br />
                    <strong>Instructions:</strong> {meal?.strInstructions || 'N/A'}<br />
                    <br />
                    
                    <strong>Ingredients:</strong>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <br />
    
                    {meal?.strYoutube && (
                        <div>
                            <strong>YouTube Video:</strong>
                            <iframe
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${meal.strYoutube.split('=')[1]}`}
                                title="YouTube video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                    <br/><br/>

                    <Button variant={showAdded ? 'primary' : 'outline-primary'} onClick={favouritesClicked}>
                        {showAdded ? "+ Favourite (added)" : "+ Favourite"}
                    </Button>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
