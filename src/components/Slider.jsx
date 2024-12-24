import React, { useEffect, useState } from 'react';
import { Carousel, Form } from 'react-bootstrap';
import Link from 'next/link';

export default function Slider() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('Canadian'); // Default to Canadian
  const [recipes, setRecipes] = useState([]);

  // Fetch the list of countries on component mount
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((response) => response.json())
      .then((data) => setCountries(data.meals))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  // Fetch recipes when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCountry}`)
        .then((response) => response.json())
        .then((data) => setRecipes(data.meals.slice(0, 5))) // Limit to 5 recipes
        .catch((error) => console.error('Error fetching recipes:', error));
    }
  }, [selectedCountry]);

  return (
    <div>
      {/* Dynamic title */}
      <h3>Featured recipes:</h3>

      {/* Dropdown to select country */}
      <Form.Group controlId="countrySelect">
        <Form.Select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map((country) => (
            <option key={country.strArea} value={country.strArea}>
              {country.strArea}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Carousel to display recipes */}
      {recipes.length > 0 && (
        <Carousel className="mt-4">
          {recipes.map((recipe) => (
            <Carousel.Item key={recipe.idMeal}>
              {/* Container div to apply dark overlay */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '200px',
                  overflow: 'hidden',
                }}
              >
                <img
                  className="d-block"
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                  }}
                />
                {/* Dark background applied to the whole image */}
                <div
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    color: 'white',
                    padding: '20px',
                    textAlign: 'center',
                  }}
                >
                  <Link href={`/meal/${recipe.idMeal}`} passHref>
                    <p style={{ color: 'white', textDecoration: 'none' }}>
                      {recipe.strMeal}
                    </p>
                  </Link>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
}
